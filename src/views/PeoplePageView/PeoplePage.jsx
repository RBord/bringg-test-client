import {useState, useEffect} from "react";
import s from './PeoplePage.module.css'
import {v4} from 'uuid'
import * as swAPI from '../../services/swapi'

export default function PeoplePage(){
    const [peopleId, setPeopleId] = useState('')
    const [json, setJson] = useState({})
    const [encode, setEncode] = useState(false)

    useEffect(()=>{
        if(peopleId === '') return
        async function getPeopleById(){
            try {
                swAPI.fetchPeopleById(peopleId).then(setJson)
            } catch (error) {
                console.log(error.message)
            }
        }
        getPeopleById()
    },[peopleId])

  

    const entries = Object.entries(json)
    
    return (
        <>
        <form onSubmit={e => {
            e.preventDefault()
            setPeopleId(e.target.elements.peopleId.value)
            if(e.target.elements.encoding.checked === true){
                setEncode(true)
            } else if(e.target.elements.encoding.checked === false){
                setEncode(false)
            }
        }}>
            <input type='text' name='peopleId' placeholder='Enter number' className={s.input}/>
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