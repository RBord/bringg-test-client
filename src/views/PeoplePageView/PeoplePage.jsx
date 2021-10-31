import {useState, useEffect} from "react";
import s from './PeoplePage.module.css'
import {v4} from 'uuid'
import * as swAPI from '../../services/swapi'
import Spinner from "../../components/Loader/Loader";




export default function PeoplePage(){
    const [peopleId, setPeopleId] = useState('')
    const [json, setJson] = useState({})
    const [needEncode, setNeedEncode] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(peopleId === '') return 
        setLoading(true)
        async function getPeopleById(){
            try {
                await swAPI.fetchPeopleById(peopleId, needEncode).then(setJson)
                setLoading(false)
                
            } catch (error) {
                console.log(error)
            }
        }
        getPeopleById()
    },[peopleId, needEncode])

    const entries = Object.entries(json)


    return (
        <div>
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
        {peopleId === '' && (
            <div>
                <p>Please input value from 1 to 83 for find character</p>
            </div>
        )}
        {loading  &&  <Spinner/>}
        {json && !loading && peopleId && (
            <ul>
                {entries.map(([k, value]) =>{
                    
                    return (
                        <li key={v4()}><b>{k}</b>: {value}</li>
                    )
                })}
            </ul>)
        }
        </div>
    )
}