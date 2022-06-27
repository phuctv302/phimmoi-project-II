import React, { useState, useEffect } from 'react'
import './Modal.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedMovieAd, updateMovie } from '../../../redux/slice/movieSLice'
import { useParams } from "react-router"
import APIapp from '../../../Client/APIS/APIapp'
import { getCategory } from '../../../redux/slice/categorySlice.js'

const Modal = (props) => {
    const { id } = useParams()
    const { selectedMovie } = useSelector((state) => state.movie)
    const dispatch = useDispatch()

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState([])
    const [file, setFile] = useState(null)
    useEffect(async () => {
        const category = await dispatch(getCategory())
        setCategories(category.payload.data.categories)
        console.log('', categories)
    }, [dispatch])
    

    const handleChange = async (e) => {
        const selected = await APIapp.post(`categories/${category}/movie/${id}`)
        window.location.reload()
    }    

    return (
        <>
                <div className="modal">
                    <div onClick={props.clickMethod} className="overlay"></div>
                    <div className="modal-content">
                        <span className="inform">Thông tin người nhận</span>
                        <div className="form">
                            <select type="text" onChange={(e) => setCategory(e.target.value)}>
                                    {categories.map((cate) => (
                                        <option value={cate._id}>{cate.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="btn">
                            <button className="close-modal"  onClick={handleChange}>Update</button>
                            <button className="close-modal close" onClick={props.clickMethod}>Close</button>
                        </div>
                    </div>
              </div>
        </>
    )
}

export default Modal
