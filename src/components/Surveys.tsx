import React, { useEffect, useRef } from 'react'
import { create, load, remove } from '../redux/surveys'
import { AppDispatch, useReduxDispatch, useReduxSelector } from '../redux'
import { Link } from 'react-router-dom'
import './Surveys.css'

const Surveys = (): React.ReactElement => {
    const surveys = useReduxSelector(state => state.surveys.surveys)
    const dispatch = useReduxDispatch()
    const postStatus = useReduxSelector(state => state.surveys.status)
    //a hack to help reload surveys on focus of the screen
    const dispatchRef = useRef<AppDispatch>()

    useEffect(() => {
      if (postStatus === 'idle' || dispatchRef.current !== dispatch) {
        dispatch(load());
        dispatchRef.current = dispatch;
      }
    }, [postStatus, dispatch])    

    return (<>
        <table className='sjs-surveys-list'>
            {surveys.map(survey => 
                <tr key={survey.id} className='sjs-surveys-list__row'>
                    <td><span>{survey.name}</span></td>
                    <td>
                        <Link className='sjs-button' to={'run/' + survey.id}><span>Run</span></Link>
                        <Link className='sjs-button' to={'edit/' + survey.id}><span>Edit</span></Link>
                        <Link className='sjs-button' to={'results/' + survey.id}><span>Results</span></Link>
                        <span className='sjs-button sjs-remove-btn' onClick={() => dispatch(remove(survey.id))}>Remove</span>
                    </td>
                </tr>
            )}
        </table>
        <div className='sjs-surveys-list__footer'>
            <span className='sjs-button sjs-add-btn' title='increment' onClick={() => dispatch(create())}>Add Survey</span>                        
        </div>
    </>)
}

export default Surveys