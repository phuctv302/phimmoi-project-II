import React from "react";
import "./Movie.scss";
import { Link } from "react-router-dom";

const Movie = (props) => {
  const { data } = props;
  return (
    <div className="movie">
      <Link to={`/movie/${data._id}`} className="link">
        <div className="inner">
          <div className="top">
            <img src={(data.image)} alt="" />
          </div>
          <div className="bottom">
            <div className="info">
              <p>{data.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Movie;
