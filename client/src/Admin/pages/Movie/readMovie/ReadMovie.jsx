import React, { useEffect, useState } from 'react'
import './ReadMovie.scss'
import Sidebar from '../../../components/sidebar/Sidebar.js'
import Navbar from '../../../components/navbar/Navbar'
import { getMovieDetail, getCopyOnMovie, setSelectedMovieAd } from '../../../../redux/slice/movieSLice.js'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router"
import * as FiIcons from 'react-icons/fi'
import * as FcIcons from 'react-icons/fc'
import Modal from '../../../components/modal/Modal'
import APIapp from '../../../../Client/APIS/APIapp'

const ReadMovie = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const [categories, setCategories] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({
        actors: [], 
        categories: [],
        category_id: [],
        company: "",
        countries: [],
        country: [],
        createdAt: "",
        description: "",
        director: "",
        id: "",
        image: "",
        name: "",
        updatedAt: "",
        videoUrl:"",
        year: 0,
        __v: 0,
        _id: ""
    })
    useEffect(async () => {
        const movie = await dispatch(getMovieDetail(id))
        console.log('movie', movie)
        dispatch(setSelectedMovieAd(movie.payload.data.movie))
        setSelectedMovie(movie.payload.data.movie)
        setCategories(selectedMovie.categories)
    }, [dispatch, id, setSelectedMovie])

    const toggleModal = (event) => {
        event.preventDefault();
        setModal(!modal);
    };
    
    const Getname = (id) =>{
        const [name, setName]= useState("")
        const get = async() =>{
            const ret= await APIapp.get(`categories/${id}`)
            //console.log(ret.data.data.category.name)
            setName(ret.data.data.category.name) 
            console.log(name)
        }
        get()
        return name
    }

    return (
        <div className="readMovie">
            <Navbar/>
            <div className="admin">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="content">
                    <div className="up">
                        <div className="left">
                            <img src={selectedMovie.image} alt="" />
                        </div>
                        <div className="right">
                            <div className="name">
                                <span className="title">{selectedMovie.name}</span>
                            </div>
                            <span>Company: {selectedMovie.company}</span>
                            <span>Director: {selectedMovie.director}</span>
                            <div className="categories">
                                <span>Categories:  </span>
                                <span>{Getname(selectedMovie.categories[0])} </span>
                                <span>{Getname(selectedMovie.categories[1])} </span>
                                <span>{Getname(selectedMovie.categories[2])} </span>
                                <span>{Getname(selectedMovie.categories[3])} </span>
                            </div>
                            <span>Produced year: {selectedMovie.year}</span>
                            <span>Description: {selectedMovie.description}</span>
                        </div>
                        <FiIcons.FiEdit color="var(--purple)" className="edit" onClick={toggleModal}/>
                    </div>
                    <div>
                    <iframe width="100%" height="100%" src={selectedMovie.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    {modal && <Modal clickMethod = {toggleModal} />}
                </div>
            </div>
            
        </div>
    )
}

export default ReadMovie
