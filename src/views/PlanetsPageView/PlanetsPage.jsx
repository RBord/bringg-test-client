import {useState, useEffect} from "react";
import s from './PlanetsPage.module.css'
import {v4} from 'uuid'
import * as swAPI from '../../services/swapi'
import Spinner from "../../components/Loader/Loader";

export default function PlanetsPage(){
    const [planetsId, setPlanetsId] = useState('')
    const [json, setJson] = useState({})
    const [needEncode, setNeedEncode] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(planetsId === '') return
        setLoading(true)
        async function getPlanetsById(){
            try {
                await swAPI.fetchPlanetsById(planetsId, needEncode).then(setJson)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getPlanetsById()
    },[planetsId, needEncode])

    const entries = Object.entries(json)
    
    return (
        <>
        <form onSubmit={e => {
            e.preventDefault()
            setPlanetsId(e.target.elements.planetsId.value)
            if(e.target.elements.encoding.checked === true){
                setNeedEncode('?encoding=ewot')
            } else {
                setNeedEncode('')
            }
        }}>
            <input type='text' name='planetsId' placeholder='Enter number' className={s.input}/>
            <button type='submit' className={s.button}>
                Search
            </button>
            <input type="checkbox" id='encoding' name='encoding'/>
            <label htmlFor='encoding'>Encoding to Ewok</label>
        </form>
        <hr/>
        {loading && <Spinner/>}
        {!planetsId && (
            <div>
                <p>Please input value from 1 to 60 for find Planet</p>
            </div>
        )}
        {json && !loading && planetsId && (
            <ul>
                {entries.map(([key, value]) =>{
                    return (
                        <li key={v4()}><b>{key}</b>:  {value}</li>
                    )
                })}
            </ul>)
        }
        </>
    )
}