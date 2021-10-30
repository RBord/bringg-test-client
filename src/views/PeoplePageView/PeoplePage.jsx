import {useState, useEffect} from "react";
import s from './PeoplePage.module.css'
import {v4} from 'uuid'
import * as swAPI from '../../services/swapi'

export default function PeoplePage(){
    const [peopleId, setPeopleId] = useState('')
    const [json, setJson] = useState({})
    const [needEncode, setNeedEncode] = useState('')

    useEffect(()=>{
        if(peopleId === '') return
        async function getPeopleById(){
            try {
                swAPI.fetchPeopleById(peopleId, needEncode).then(setJson)
                
            } catch (error) {
                console.log(error)
            }
        }
        getPeopleById()
    },[peopleId, needEncode])

    const entries = Object.entries(json)


    return (
        <>
        <form onSubmit={e => {
            e.preventDefault()
            setPeopleId(e.target.elements.peopleId.value)
            if(e.target.elements.encoding.checked === true){
                setNeedEncode('?encoding=ewot')
            } else {
                setNeedEncode('')
            }
            
        }}>
            <input type='text' name='peopleId' placeholder='Enter number' className={s.input}/>
            <button type='submit' className={s.button}>
                Search
            </button>
            <input type="checkbox" id='encoding' name='encoding'/>
            <label htmlFor='encoding'>Encoding to Ewok</label>
        </form>
        <hr/>

        {json && (
            <ul>
                {entries.map(([k, value]) =>{
                    
                    return (
                        <li key={v4()}><b>{k}</b>: {value}</li>
                    )
                })}
            </ul>)
        }
        </>
    )
}