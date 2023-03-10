import { useState, useEffect } from 'react'
import './styles.css'
import Toggle from './components/Toggle'

export default function App(){

    const [travels, setTravels] = useState([])
    const [completedTravels, setCompletedTravels] = useState([])
    const [newTravel, setNewTravel] = useState({
        title: '',
        country: '',
        season: '',
        duration: '',
        year: '',
        pic: '',
        completed: true
    })

    //createTravels
    const createTravel = async () => {
        const body = {...newTravel}
        try {
            const response = await fetch('/api/travels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const createdTravel = await response.json()
            const travelsCopy = [createdTravel,...travels]
            setTravels(travelsCopy)
            setNewTravel({
                title: '',
                country: '',
                season: '',
                duration: '',
                year: '',
                pic: '',
                completed: true
            })
        } catch (error) {   
            console.error(error)
        }
    }

    //moveToCompleted
    const moveToCompleted = async (id) => {
        try {
            const index = travels.findIndex((travel) => travel._id === id)
            const travelsCopy = [...travels]
            const subject = travelsCopy[index]
            subject.completed = true 
            const response = await fetch(`/api/travels/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            })
            const updatedTravel = await response.json()
            const completedTDsCopy = [updatedTravel, ...completedTravels]
            setCompletedTravels(completedTDsCopy)
            travelsCopy.splice(index, 1)
            setTravels(travelsCopy)
        } catch (error) {
            console.error(error)
        }
    }
    //getTravels
    const getTravels = async () => {
        try{
            const response = await fetch('/api/travels')
            const foundTravels = await response.json()
            setTravels(foundTravels.reverse())
            const responseTwo = await fetch('/api/travels/completed')
            const foundCompletedTravels = await responseTwo.json()
            setCompletedTravels(foundCompletedTravels.reverse())
        } catch(error){
            console.error(error)
        }
    }
    useEffect(() => {
        getTravels()
    }, [])
    return(<>
        <input id="input" type="text" placeholder='City' 
        value={newTravel.title} 
        onChange={(e) => {
            setNewTravel({...newTravel, title: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createTravel()
        }}
        /><br />
        <input id="input" type="text" placeholder='Country'
        value={newTravel.country} 
        onChange={(e) => {
            setNewTravel({...newTravel, country: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createTravel()
        }}
        /><br />
        <input id="input" type="text" placeholder='Season'
        value={newTravel.season} 
        onChange={(e) => {
            setNewTravel({...newTravel, season: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createTravel()
        }}
        /><br />
        <input id="input" type="text" placeholder='Duration'
        value={newTravel.duration} 
        onChange={(e) => {
            setNewTravel({...newTravel, duration: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createTravel()
        }}
        /><br />
        <input id="input" type="text" placeholder='Year'
        value={newTravel.year} 
        onChange={(e) => {
            setNewTravel({...newTravel, year: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createTravel()
        }}
        /><br />
        <input id="input" type="text" alt="pic" placeholder='Picture (Optional)'
        value={newTravel.pic} 
        onChange={(e) => {
            setNewTravel({...newTravel, pic: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createTravel()
        }}
        />
    
        <h3 id="travelh3">Travels</h3>
        {/* <Toggle/> */}
        <div id="table">
        {travels.map (travel => {
            return(
                <div id="travel" key={travel._id}>
                    <div className="info">City: {travel.title}</div>
                    <div className="info">Country: {travel.country}</div>
                    <div className="info">Season: {travel.season}</div>
                    <div className="info">Duration: {travel.duration}</div>
                    <div className="info">Year: {travel.year}</div>
                    <img id="pic"src={`${travel.pic}`} alt=""></img>
                    <div id="borrar"onClick={() => moveToCompleted(travel._id) }>Delete</div>
                </div>
                
            )})
        }
        </div>
    </>)
}