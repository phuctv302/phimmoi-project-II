import React from "react";
import { useLocation } from "react-router-dom";
import Movie from "../movieList/movie/Movie";

import Navbar from "../navbar/Navbar";
import "./Search.scss";

const HomeSearch = () => {
  const location = useLocation();
  const searchWord = location.state.text;
  const resultMovies = location.state.data;
  // console.log("text", searchWord, "movies", resultMovies);
  return (
    <div className="home">
      <Navbar />
      <div className="container">
        <h1>Result for: {searchWord}</h1>
        <div className="listmovie">
          {resultMovies.map((movie) => {
            return (
              <Movie key={movie._id} data={movie}/>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
