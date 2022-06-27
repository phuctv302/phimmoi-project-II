import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './AllMovie.scss'
import Sidebar from '../../../components/sidebar/Sidebar.js'
import Navbar from '../../../components/navbar/Navbar'
import { getAllMovie } from '../../../../redux/slice/movieSLice.js'
import Movie from '../../../components/movie/Movie'
import Pagination from './Pagination/Pagination'
import APIapp from '../../../../Client/APIS/APIapp'

const AllMovie = () => {
    const [allMovieLib, setAllMovieLib] = useState([])
    const [allMovie, setAllMovie] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 21,
        total: 0
    })
    const [filter, setFilter] = useState({
        page: 1,
        limit: 21,
        allMovie: allMovie
    })
    const[textInput, setTextInput] = useState("")
    const dispatch = useDispatch()
    useEffect(async () => {
        const allMovieLib = await dispatch(getAllMovie())
        setAllMovieLib(allMovieLib.payload.data.movies)
        setPagination({...pagination, total: (allMovieLib.payload.data.movies).length})
    }, [dispatch])

    useEffect(async () => {
        
        const allMovie = await APIapp.get(`movies?page=${filter.page}&limit=${filter.limit}`)
        setAllMovie(allMovie.data.data.movies)
    }, [filter])
    let renderMovies = "";

    useEffect(async()=>{
        const newFilter = allMovie.filter((value) => {
            return value.name.toLowerCase().includes(textInput.toLowerCase());
          });
          if (textInput ==='') {
            setAllMovie(allMovie);
          } else {
            setAllMovie(newFilter);
          }
      },[textInput]);


    renderMovies = allMovie.length != 0 ? (
        allMovie.map((movie) => (
            <Movie key = {movie._id} data = {movie} />
        ))
    ) : (
        <div className="error">
            <h3>Not found</h3>
        </div>
    )

    const handlePageChange=(newPage) => {
        setPagination({...pagination, page: newPage})
        setFilter({...filter, page: newPage})
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const searchMovie = e.target.value;
        setTextInput(searchMovie);
        setAllMovie(allMovieLib)
    };

    return (
        <div className="allMovie">
            <Navbar/>
            <div className="admin">
                <div className="side
                bar">
                    <Sidebar/>
                </div>
                <div className="content">
                    <input type="text" placeholder="search here" onChange={handleSearch}/>
                    <div className="moviePage">
                        {renderMovies}
                    </div>
                    {textInput ==='' ? <Pagination pagination={pagination} onPageChange={handlePageChange} className="pagination"/> : <></>}
                </div>
            </div>
        </div>
    )
}

export default AllMovie
