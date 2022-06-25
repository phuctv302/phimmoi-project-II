import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { Notifications, ArrowDropDown, Search } from "@material-ui/icons";
import CatType from "./catType/CatType";
import { createGlobalStyle } from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { fetchAsyncSearch } from "../../../../redux/slice/movieSLice";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, logout } from "../../../../redux/slice/authSlice";
import { Scrollbars } from 'react-custom-scrollbars';
import APIapp from '../../../APIS/APIapp.js'

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [search, setSearch] = useState("");
  const [isNotification, setIsNotification] = useState(false);
  const [numNotifications, setNumNotifications] = useState(0)
  const [textInput, setTextInput] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const[notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.user)
  // console.log(user);
  const movie = useSelector(state => state.movie)
  const listmovies= movie.recentlyMovie ;

  // category options
  const handleOnClicked = () => {
    setIsClicked(!isClicked);
    if(isNotification) setIsNotification(!isNotification);
  };

  // navigate
  const handleSearch = () => {
    setFilterData([]);
    navigate("/homeSearch", { state: { text: textInput, data: filterData } });
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

  const handleSignin = () =>{
    navigate("/login")
  }

  const handleSignup = () =>{
    navigate("/signup")
  }


  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <Link to ="/" className="home" style={{textDecoration: "none"}}>
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
          <p onClick={handleOnClicked}>Category</p>
          <div className="category">
            <div className={isClicked ? "catType clicked" : "catType"}>
              <CatType />
            </div>
          </div>
          <button className="signin" onClick={handleSignin}>Signin</button>
          <button className="signup" onClick={handleSignup}>Signup</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
