import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { Notifications, ArrowDropDown, Search, Bookmark } from "@material-ui/icons";
import BookmarkIcon from "@material-ui/icons"
import CatType from "./catType/CatType";
import { createGlobalStyle } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { fetchAsyncSearch } from "../../../redux/slice/movieSLice";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, logout } from "../../../redux/slice/authSlice";
import { Scrollbars } from 'react-custom-scrollbars';
import APIapp from '../../APIS/APIapp.js'

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [search, setSearch] = useState("");
  const [isShelf, setIsShelf] = useState(false);
  const [numShelfs, setNumShelfs] = useState(0)
  const [textInput, setTextInput] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const[shelfs, setShelfs] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [img, setImg]=useState(null)


  const user = useSelector(state => state.user)
  // console.log(user);
  const movie = useSelector(state => state.movie)
  const listmovies= movie.recentlyMovie ;

  // category options
  const handleOnClicked = () => {
    setIsClicked(!isClicked);
    if(isShelf) setIsShelf(!isShelf);
  };
  // to profile page
  const handleProfile = () => {
    navigate("/profile");
  };

  const handleHome = () => {
    navigate("/userHome");
  };
  //shelfs
  const handleShelfClick = async () => {
    setIsShelf(!isShelf);
    if(isClicked) setIsClicked(!isClicked);
    try {
      const response = await APIapp.get("movies/shelf")
      console.log(response.data.data.movies)
      setShelfs(response.data.data.movies)
    } catch (err) {
        console.log(err.response.data.message)
    }
  }

  // navigate
  const handleSearch = () => {
    setFilterData([]);
    navigate("/search", { state: { text: textInput, data: filterData } });
  };
  // search


  const handleFilter = (e) => {
    e.preventDefault();
    const searchWord = e.target.value;
    setTextInput(searchWord);
    const newFilter = listmovies.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  const handleLogout = async (e) => {
    localStorage.removeItem("token");
    const isAuth = await dispatch(logoutUser());
    dispatch(logout());
    window.location.assign("/");
  };

  
  let renderShelfs = ""
  renderShelfs = shelfs!=null? (shelfs.map((shelf) => (
    <Link to={`/userHome/movie/${shelf.id}`} className="rendershelf">
      <img src={shelf.image} alt="" />
      <p>{shelf.name}</p>
    </Link>
  ))) : (
    <p>wait a minute</p>
  )

  const { numUnreadShelfs } = useSelector((state) => state.user.user)
  useEffect( () => {
    setNumShelfs(numUnreadShelfs)
  }, [numUnreadShelfs])
  

  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
        <Link to ="/userHome" className="home" style={{textDecoration: "none"}}>
          <div className="logo" >
            meFilm
          </div>
          </Link>
          <div className="search">
            <div className="searchInput">
              <input
                type="text"
                placeholder="Enter a movie name..."
                onChange={handleFilter}
              />
              <Search className="icon" onClick={handleSearch} />
            </div>
            {filterData.length !== 0 && (
              <div className="dataResult">
                {filterData.map((movie) => {
                  return (
                  <Link to={`/movie/${movie._id}`} style={{textDecoration:"none", color:"black"}} className="link">
                  <p className="result">{movie.name}</p>
                  </Link>)
                })}
              </div>
            )}
          </div>
        </div>
        <div className="right">
          <div className="category">
            <p onClick={handleOnClicked}>category</p>
            <div className={isClicked ? "catType clicked" : "catType"}>
              <CatType />
            </div>
          </div>
          <div className="shelf"onClick={handleShelfClick}>
            <Bookmark/>
            {numShelfs ? <span className="badge">{numShelfs}</span> : <></>}
            <div className={isShelf ? "shelfTable clicked" : "shelfTable"}>
              <Scrollbars className="scrollbar">
                    {renderShelfs}
              </Scrollbars>
            </div>
          </div>
          <div className="user">
            <img
              // src="https://i.pinimg.com/564x/01/37/28/01372823cc87dda1d08bc1529163e9e1.jpg"
              src={img == undefined ? "https://i.pinimg.com/564x/01/37/28/01372823cc87dda1d08bc1529163e9e1.jpg" : `http://127.0.0.1:8000/img/users/${img}`}
              alt=""
            />
            <div className="profile">
              <ArrowDropDown />
              <div className="options">
                <span onClick={handleLogout}>sign out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
