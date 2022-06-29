import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import APIapp from '../../Client/APIS/APIapp'

//admin
export const updateMovie = createAsyncThunk('user/updateMovie', async (id, movie) => {
    try {
        const response = await APIapp.patch(`movies/${id}`, movie)
        return response
    } catch (err) {
        return err.response.data.message
    }
})

export const createMovie = createAsyncThunk('user/createMovie', async (movie) => {
    try {
        const response = await APIapp.post(`movies`, movie)
        return response.data
    } catch (err) {
        return err.response.data
    }
})
//user
export const top5Movie = createAsyncThunk('user/top5Movie', async () => {
    try {
        const response = await APIapp.get('movieCopies/top-5-movies')
        return response.data.data.topMovies
    } catch (err) {
        return err.response.data.message
    }
})

export const getRecentlyMovie = createAsyncThunk('user/getRecentlyMovie', async () => {
    try {
        const response = await APIapp.get('movies?sort=-createdAt&limit=15')
        return response.data
    } catch (err) {
        return err.response.data.message
    }
})

export const getAllMovie = createAsyncThunk('user/getAllMovie', async () => {
    try {
        const response = await APIapp.get('movies')
        return response.data
    } catch (err) {
        return err.response.data.message
    }
})

export const getMovieDetail = createAsyncThunk('user/getMovieDetail', async (id) => {
    try {
        const response = await APIapp.get(`movies/${id}`)
        return response.data
    } catch (err) {
        return err.response.data.message
    }
})

export const addMovieNotifications = createAsyncThunk('user/addMovieNotifications', async (id) => {
    try {
        const response = await APIapp.patch(`movies/${id}/notification`)
        return response.data
    } catch (err) {
        return err.response.data.message
    }
})

export const removeMovieNotifications = createAsyncThunk('user/removeMovieNotifications', async (id) => {
    try {
        const response = await APIapp.delete(`movies/${id}/notification`)
        return response
    } catch (err) {
        return err.response.data
    }
})

const initialState = {
    topMovie: [],
    movies: [],
    selectedMovie: {},
    copies: [],
    selectedCopy: {},
    recentlyMovie:[],
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        getTop5: (state, { payload }) => {
            state.topMovie = payload;
        },
        RecentlyMovie: (state, { payload }) => {
            state.recentlyMovie = payload;
        },
        getSelectedMovie: (state, { payload }) => {
            state.selectedMovie = payload;
        },
        copyOnMovie: (state, { payload }) => {
            state.copies = payload;
        },
        setSelectedCopy: (state, { payload }) => {
            state.selectedCopy = payload;
        },
        setSelectedMovieAd: (state, { payload }) => {
            state.selectedMovie = payload;
        },
        removeCopyOnMovie: (state) => {
            state.copies = [];
        },
        removeSelectedMovie: (state) => {
            state.selectedMovie = {};
        },
    },
})

export const { getTop5, RecentlyMovie, getSelectedMovie, copyOnMovie, removeSelectedMovie, removeCopyOnMovie, setSelectedCopy, setSelectedMovieAd } = movieSlice.actions;
export const getCopies = (state) => state.movie.copies;
export default movieSlice.reducer;