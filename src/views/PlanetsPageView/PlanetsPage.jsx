import {useState, useEffect} from "react";
import s from './PlanetsPage.module.css'
import {v4} from 'uuid'
import * as swAPI from '../../services/swapi'

export default function PlanetsPage(){
    const [planetsId, setPlanetsId] = useState('')
    const [json, setJson] = useState({})
    const [encode, setEncode] = useState(false)

    useEffect(()=>{
        if(planetsId === '') return
        async function getPlanetsById(){
            try {
                swAPI.fetchPlanetsById(planetsId).then(setJson)
            } catch (error) {
                console.log(error.message)
            }
        }
        getPlanetsById()
    },[planetsId])

    const entries = Object.entries(json)
    
    return (
        <>
        <form onSubmit={e => {
            e.preventDefault()
            setPlanetsId(e.target.elements.planetsId.value)
            if(e.target.elements.encoding.checked === true){
                setEncode(true)
            } else if(e.target.elements.encoding.checked === false){
                setEncode(false)
            }
        }}>
            <input type='text' name='planetsId' placeholder='Enter number' className={s.input}/>
            <button type='submit' className={s.button}>
                Search
            </button>
            <input type="checkbox" id='encoding' name='encoding'/>
            <label htmlFor='encoding'>Encoding to Ewok lang</label>
        </form>
        <hr/>

        {json && (
            <ul>
                {entries.map(([key, value]) =>{
                    if(encode === true){
                        const valueEwok = value.toString().replace(/[aeiou]/gi,'i')
                        const valueNewEwok = valueEwok.toString().replace(/[bcdfghjklmnpqrstvwxyz]/gi,'b')
                        
                        return (
                            <li key={v4()}><b>{key}</b>:  {valueNewEwok}</li>
                        )
                    }
                    return (
                        <li key={v4()}><b>{key}</b>:  {value}</li>
                    )
                })}
            </ul>)
        }
        </>
    )
}