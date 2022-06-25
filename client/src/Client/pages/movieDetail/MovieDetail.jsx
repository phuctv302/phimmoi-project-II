import React, { useEffect, useState } from "react";
import "./MovieDetail.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedMovie, getMovieDetail, getCopyOnMovie, copyOnMovie, addMovieNotifications, removeMovieNotifications } from "../../../redux/slice/movieSLice";
import Navbar from "../../commonComponent/navbar/Navbar";
import DataTable from './Table/Table'
import * as FcIcons from 'react-icons/fc'
import * as IoIcons from 'react-icons/io'
import { Notifications, DoNotDisturbOffOutlined } from "@material-ui/icons"
import { ToastContainer, toast } from 'react-toastify';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedMovie, setSelectedMovie] = useState({})
  const [copies, setCopies] = useState([])
  
  //const { selectedMovie, copies } = useSelector((state) => state.movie);

  useEffect(async () => {
    const movie = await dispatch(getMovieDetail(id));
    const copies = await dispatch(getCopyOnMovie(id))
    dispatch(getSelectedMovie(movie.payload.data.movie))
    dispatch(copyOnMovie(copies.payload.data.movieCopies))
    movie ? setSelectedMovie(movie.payload.data.movie) : setSelectedMovie({})
    copies ? setCopies(copies.payload.data.movieCopies) : setCopies([])
  }, [dispatch, id]);

  console.log(selectedMovie)

  const handleTurnOnNotifications = async () => {
    const noti = await dispatch(addMovieNotifications(id))
    console.log('noti', noti.payload)
    noti.payload==="User has already registered this movie!" ? toast.error(noti.payload, {autoClose: 2000 }) : toast.success("success", {autoClose: 2000 });
  }
  const handleTurnOffNotifications = async () => {
    const noti = await dispatch(removeMovieNotifications(id));
    toast.success("cancel notification successfully !!", {autoClose: 2000 })
  }

  return (
    <div className="movieDetail">
      <Navbar />
      <div className="container">
        <div className="wrapper">
          <div className="left">
            <img src={(`http://127.0.0.1:8000/img/movies/${selectedMovie.image}`)} alt="" />
          </div>
          <div className="right">
            <div className="up">
              <div className="name">
                <span className="title">{selectedMovie.name}</span>
                {selectedMovie.isVIP ? <FcIcons.FcVip className="vip"/> : <></>}
                
                  {selectedMovie.available===0 ? <div className="btn"><button className="notification" onClick={handleTurnOnNotifications}><Notifications/></button> 
                  <button className="notification_off" onClick={handleTurnOffNotifications}><IoIcons.IoMdNotificationsOff className="icon"/></button></div>
                : <></>}
              </div>
              <div className="authorName">
                <span>Author: {selectedMovie.author}</span>
              </div>
              <div className="category">
                <span>Category: {selectedMovie.category ? selectedMovie.category.name : ""}</span>
              </div>
              <div className="quantity">
                <span>{selectedMovie.available} item(s) left</span>
              </div>
            </div>
            <div className="down">
              <p>{selectedMovie.description}</p>
            </div>
          </div>
        </div>
        <div className="table">
          <DataTable data={copies} vip = {selectedMovie.isVIP}/>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MovieDetail;
