import React, { useEffect } from 'react'
import './List.scss'
import Movie from '../movie/Movie'
import { useSelector, useDispatch } from 'react-redux'

const List = (props) => {
    const { data } = props;
    const dispatch = useDispatch()
    
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 5,
    //     slidesToScroll: 3
    // };

    let renderMovies = "";

    renderMovies = data != null ? (
        data.map((movie) => (
            <Movie key = {movie._id} data = {movie} />
        ))
    ) : (
        <div className="error">
            <h3>{data.Error}</h3>
        </div>
    )

    return (
        <div className="list">
            <div className="container">
                <div className="wrap">
                    <div className="title">
                        {props.title}
                    </div>
                    <div className="movieList">

                        {renderMovies}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default List
