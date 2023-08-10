import { useParams } from 'react-router'
import { useReduxDispatch, useReduxSelector } from '../redux';
import Viewer from '../components/Viewer'
import { useEffect } from 'react';
import { get } from '../redux/surveys';

const Results = () => {
    const { id } = useParams();
    const dispatch = useReduxDispatch()
    const survey = useReduxSelector(state => state.surveys.selectedSurvey)

    useEffect(()=>{
        dispatch(get(id as string))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (<>
        <h1>{'\'' + survey?.name + '\' results'}</h1>
        <div className='sjs-results-container'>
            <Viewer id={id as string}/>
        </div>
    </>);
}

export default Results;