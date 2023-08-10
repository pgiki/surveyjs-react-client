import { useParams } from 'react-router'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { post } from '../redux/results'
import { Model, StylesManager } from 'survey-core'
import { Survey } from 'survey-react-ui'
import 'survey-core/defaultV2.css'
import { useEffect } from 'react'
import { get } from '../redux/surveys'

StylesManager.applyTheme("defaultV2")


const Run = () => {
    const { id } = useParams();
    const dispatch = useReduxDispatch()
    const survey = useReduxSelector(state => state.surveys.selectedSurvey)
    const model = new Model(survey.json)

    useEffect(()=>{
        dispatch(get(id as string))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    model
        .onComplete
        .add((sender: Model) => {
            dispatch(post({postId: survey.postId as string, surveyResult: sender.data, surveyResultText: JSON.stringify(sender.data)}))
        });    

    return (<>
        <Survey model={model}/>
    </>);
}

export default Run;