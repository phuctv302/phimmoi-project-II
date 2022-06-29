import React, { useState, useEffect } from 'react';
import './MovieDetail.scss';
import Navbar from '../../../commonComponent/navbar/Navbar';
import { useParams } from 'react-router-dom';
import APIapp from '../../../APIS/APIapp';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const UserMovieDetail = () => {
    const { id } = useParams();
    const [url, setUrl] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState({
        actors: [],
        categories: [],
        category_id: [],
        company: '',
        countries: [],
        country: [],
        createdAt: '',
        description: '',
        director: '',
        id: '',
        image: '',
        name: '',
        updatedAt: '',
        videoUrl: '',
        year: 0,
        __v: 0,
        _id: '',
    });

    useEffect(async () => {
        const res = await APIapp.get(`movies/${id}`);
        console.log(res);
        setUrl(res.data.data.movie.videoUrl);
        setSelectedMovie(res.data.data.movie);
        setCategories(res.data.data.movie.categories);
    }, [id]);

    const Getname = (id) => {
        const [name, setName] = useState('');
        const get = async () => {
            const ret = await APIapp.get(`categories/${id}`);
            //console.log(ret.data.data.category.name)
            setName(ret.data.data.category.name);
            console.log(name);
        };
        get();
        return name;
    };

    const handleAdd = async () => {
        try {
            const res = await APIapp.post(`movies/${id}/shelf`);
            console.log(res);
            if (res.data.status === 'success') {
                toast.success('Add to your shelf successfully', {autoClose: 2000});
            }
        } catch (err) {
            toast.error(err.response.data.message, {autoClose: 2000});
        }
    };

    const handleRemove = async () => {
        try {
            const res = await APIapp.delete(`movies/${id}/shelf`);
            console.log(res);
            if (res.data.status === 'success') {
                toast.success('Remove successfully', {autoClose: 2000});
            }
        } catch (err) {
			toast.error(err.response.data.message, {autoClose: 2000});
        }
    };

    return (
        <div className='home'>
            <Navbar />
            <div className='detail'>
                <div className='video'>
                    <iframe
                        width='100%'
                        height='100%'
                        src={selectedMovie.videoUrl}
                        title='YouTube video player'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowfullscreen
                    ></iframe>
                </div>
                <div className='infor'>
                    <div className='nameline'>
                        <p className='name'>{selectedMovie.name}</p>
                        <button className='add' onClick={handleAdd}>
                            Add to shelf
                        </button>
                        <button className='remove' onClick={handleRemove}>
                            Remove
                        </button>
                    </div>
                    <div className='categories'>
                        <p>Categories: </p>
                        <p>{Getname(selectedMovie.categories[0])}</p>
                        <p>{Getname(selectedMovie.categories[1])}</p>
                        <p>{Getname(selectedMovie.categories[2])}</p>
                        <p>{Getname(selectedMovie.categories[3])}</p>
                        <p>{Getname(selectedMovie.categories[4])}</p>
                    </div>
                    <p>Produced year: {selectedMovie.year}</p>
                    <p>Director: {selectedMovie.director}</p>
                    <p>Description:</p>
                    <span>{selectedMovie.description}</span>
                </div>
            </div>
        </div>
    );
};

export default UserMovieDetail;
