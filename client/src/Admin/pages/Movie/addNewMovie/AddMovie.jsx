import React, { useState, useEffect } from 'react'
import './AddMovie.scss'
import Sidebar from '../../../components/sidebar/Sidebar.js'
import Navbar from '../../../components/navbar/Navbar'
import { getCategory } from '../../../../redux/slice/categorySlice.js'
import { createMovie, getAllMovie } from '../../../../redux/slice/movieSLice'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import APIapp from '../../../../Client/APIS/APIapp'

const AddMovie = () => {
    const dispatch = useDispatch()
    const [movie, setMovie] = useState({
        name: "",
        image: "",
        company: "",
        description: "",
        director: "",
        country: "",
        year: 0,
        videoUrl: ""
    })
    const [categories, setCategories] = useState([])
    const [movies, setMovies] = useState([])
    useEffect(async () => {
        const category = await dispatch(getCategory())
        setCategories(category.payload.data.categories)
        const movies = await dispatch(getAllMovie())
        setMovies(movies.payload.data.movies)
    }, [dispatch])
    
    
    const handleCreate = async (e) => {
        e.preventDefault()
        const newMovie = await dispatch(createMovie(movie));
        newMovie.payload.data != null ? toast.success("success", {autoClose: 2000 }) : toast.error(newMovie.payload.error.message, {autoClose: 4000 }) 
    }


    return (
        <div className="addMovie">
            <Navbar/>
            <div className="admin">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="content">
                    <div className="form">
                                <span>Add movie</span>
                                <input type="text" placeholder="Name" onChange={(e) => setMovie({...movie, name:e.target.value})}/>
                                <input type="text" placeholder="Image" onChange={(e) => setMovie({...movie, image:e.target.value})}/>
                                <input type="text" placeholder="Company" onChange={(e) => setMovie({...movie, company:e.target.value})}/>
                                <input type="text" placeholder="Description" onChange={(e) => setMovie({...movie, description:e.target.value})}/>
                                <input type="text" placeholder="Director" onChange={(e) => setMovie({...movie, director:e.target.value})}/>
                                <input type="text" placeholder="Country" onChange={(e) => setMovie({...movie, country:e.target.value})}/>
                                <input type="number" placeholder="Published year" onChange={(e) => setMovie({...movie, year:e.target.value})}/>
                                <input type="text" placeholder="VideoUrl" onChange={(e) => setMovie({...movie, videoUrl:e.target.value})}/>
                                <button onClick = {handleCreate}>create</button>
                    </div>
                    
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddMovie
