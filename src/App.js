import { useState, useEffect } from 'react'
export default function App(){

    const [travels, setTravels] = useState([])
    const [completedTravels, setCompletedTravels] = useState([])
    const [newTravel, setNewTravel] = useState({
        title: '',
        country: '',
        season: '',
        duration: '',
        entry: '',
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
                entry: '',
                completed: true
            })
        } catch (error) {   
            console.error(error)
        }
    }
    //deleteTravels
    // const deleteTravel = async (id) => {
    //     try {
    //         const index = completedTravels.findIndex((travel) => travel._id === id)
    //         const completedTravelsCopy = [...completedTravels]
    //         const response = await fetch(`/api/travels/${id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         await response.json()
    //         completedTravelsCopy.splice(index, 1)
    //         setCompletedTravels(completedTravelsCopy)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    //moveToCompleted
    const moveToCompleted = async (id) => {
        try {
            const index = travels.findIndex((travel) => travel._id === id)
            const travelsCopy = [...travels]
            const subject = travelsCopy[index]
            subject.completed = true 
            const response = await fetch(`/api/travels/${id}`, {
                method: 'PUT',
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
        Add City:<input type="text" 
        value={newTravel.title} 
        onChange={(e) => {
            setNewTravel({...newTravel, title: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createTravel()
        }}
        />
        Add Country:<input type="text" 
        value={newTravel.country} 
        onChange={(e) => {
            setNewTravel({...newTravel, country: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createTravel()
        }}
        />
        Add Season:<input type="text" 
        value={newTravel.season} 
        onChange={(e) => {
            setNewTravel({...newTravel, season: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createTravel()
        }}
        />
        Add Duration:<input type="text" 
        value={newTravel.duration} 
        onChange={(e) => {
            setNewTravel({...newTravel, duration: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createTravel()
        }}
        />
        Add Entry:<input type="text" 
        value={newTravel.entry} 
        onChange={(e) => {
            setNewTravel({...newTravel, entry: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createTravel()
        }}
        />
        
        
        <h3>Travels</h3>
        {travels.map(travel => {
            return(
                <div key={travel._id}>{travel.title} {travel.country}<br />{travel.season}<br />{travel.duration}<br />{travel.entry}<br />
                    <button onClick={() => moveToCompleted(travel._id) }>Delete Travel</button>
                </div>
            )})
        }
        {/* <h3>Completed Travels</h3>
        {completedTravels.map(travel => {
            return(
                <div key={travel._id}>{travel.title}{travel.country}{travel.season}{travel.duration}{travel.entry} 
                    <button onClick={() => deleteTravel(travel._id) }>Delete</button>
                </div>
            )})
        } */}
    </>)
}