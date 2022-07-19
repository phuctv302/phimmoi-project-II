import React, { useState, useEffect } from 'react'
import './Update.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router"
import APIapp from '../../../Client/APIS/APIapp'
import { useNavigate } from 'react-router-dom'

const Update = (props) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { selectedMovie } = useSelector((state) => state.movie)
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
    

    const handleChange = async (e) => {
        const selected = await APIapp.delete(`movies/${id}`)
        navigate('/movie/allmovie')
        console.log(selected)
    }    

    return (
        <>
                <div className="modal">
                    <div onClick={props.clickMethod} className="overlay"></div>
                    <div className="modal-content">
                        <div className="form">
                            <span>Delete movie</span>
                            <p>Do you want to delete?</p>
                        </div>
                        <div className="btn">
                            <button className="close-modal"  onClick={handleChange}>Delete</button>
                            <button className="close-modal close" onClick={props.clickMethod}>Close</button>
                        </div>
                    </div>
              </div>
        </>
    )
}

export default Update
