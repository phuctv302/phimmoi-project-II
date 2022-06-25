
import React, { useEffect, useState } from 'react'
import './Home.scss'
import Navbar from '../../commonComponent/navbar/Navbar'
import List from '../../commonComponent/movieList/list/List'
import { useDispatch, useSelector } from 'react-redux'
import { getRecentlyMovie, RecentlyMovie } from '../../../redux/slice/movieSLice.js'
import { fetchAsyncUser } from '../../../redux/slice/userSlice.js'
import { getUserProfile } from '../../../redux/slice/userAction'
import { getCategory, getCategorySuccess } from '../../../redux/slice/categorySlice'
import APIapp from '../../../Client/APIS/APIapp.js'

const Home = () => {
    const [events, setEvent] = useState([])
    const dispatch = useDispatch();
    useEffect(async () => {
        await dispatch(fetchAsyncUser());
        await dispatch(getUserProfile())
        const recentlyMovies = await dispatch(getRecentlyMovie())
        dispatch(RecentlyMovie(recentlyMovies.payload.data.movies))
        const categories = await dispatch(getCategory())
        dispatch(getCategorySuccess(categories.payload.data.categories))
    }, [dispatch])

    const { recentlyMovie } = useSelector((state) => state.movie)

    return (
        <div className="home">
            <Navbar />
            <List title="Sách mới nhất" data = {recentlyMovie} />
            
        </div>
    )
}

export default Home
