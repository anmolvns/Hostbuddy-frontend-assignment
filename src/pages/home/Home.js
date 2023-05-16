import { useState } from 'react'
import './home.css'
import axios from 'axios'
import { useEffect } from 'react'

function Home() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [searchText, setSearchText] = useState("")
    const [data, setData] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const config = {
            "name": title,
            "description": description
        }

        const res = await axios.post(`http://localhost:8080/items`, config);
        
        setData((oldData)=> [...oldData, res.data])

        setTitle("")
        setDescription("")
    }

    useEffect(() => {

        const handleGetLists = async()=> {
            const res = await axios.get(`http://localhost:8080/items`);
            setData(res.data)
        }

        handleGetLists()
    
    }, [])
    
    const handleSearch = async (e) => {
        setSearchText(e.target.value)

        const res = await axios.get(`http://localhost:8080/items/search?query=${e.target.value}`)
        
        setData(res.data);
    }

  return (
    <div className='home'>
        <form className="form"  onSubmit={(e)=>handleSubmit(e)}>
            <div className="inputFields">
                <input type="text" placeholder='Name' value={title} onChange={(e)=> setTitle(e.target.value)} className="inputField" required />
                <textarea type="text" placeholder='Description' value={description} onChange={(e)=> setDescription(e.target.value) } className="inputField" required />
                <button type='submit' className="submit">Submit</button>
            </div>
        </form>
        <div className="lists">
            <div className="searchbar">
                <input type="text" placeholder='Search by name...' value={searchText} onChange={(e)=> handleSearch(e)} className="search" />
            </div>
            <div className="container">
                {
                    data.length > 0 ? data.map((item)=>(
                        <div key={item.id} className="list">
                            <div className="title">{item.name}</div>
                            <div className="description">{item.description}</div>
                        </div>    
                    )) : <div className="noData">No data available</div>
                }
            </div>
        </div>
    </div>
  )
}

export default Home