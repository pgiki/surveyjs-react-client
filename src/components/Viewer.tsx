import React, { useEffect, useRef } from 'react'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { load } from '../redux/results'
import { Model } from 'survey-core'
import 'tabulator-tables/dist/css/tabulator.css'
import 'survey-analytics/survey.analytics.tabulator.css'
const SurveyAnalyticsTabulator = require('survey-analytics/survey.analytics.tabulator')

const Viewer = (params: { id: string }): React.ReactElement => {
    const visContainerRef = useRef<HTMLDivElement>(null);
    const dispatch = useReduxDispatch();
    const survey = useReduxSelector(state => state.surveys.selectedSurvey)

    useEffect(() => {
        (async () => {
            const resultsAction = await dispatch(load(survey.postId as string))
            const data = resultsAction.payload
            if (data.length > 0 && visContainerRef.current) {
                var model = new Model(survey.json);
                visContainerRef.current.innerHTML = '';
                var surveyAnalyticsTabulator = new SurveyAnalyticsTabulator.Tabulator(
                    model,
                    // (item.data|| item) is left like this for handling database connector which requires result entries
                    // to have and id and other metadata
                    data.map((item: any) => typeof (item.data|| item) === 'string' ? JSON.parse((item.data|| item)) : (item.data|| item))
                  );
                surveyAnalyticsTabulator.render(visContainerRef.current);
            }
        })()
    }, [dispatch, params.id, survey.json, survey.postId])    

    return (<>
            <div className='sjs-results-content' ref={visContainerRef}>
                <div className='sjs-results-placeholder'>
                    <span>This survey doesn't have any answers yet</span>
                </div>
            </div>
    </>)
}

export default Viewer