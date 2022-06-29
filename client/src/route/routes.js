import React from 'react'
import Home from '../Client/pages/homepage/Home.jsx'
import Login from '../login/Login.jsx'
import SignUp from '../signUp/SignUp.jsx'
import ForgotPass from '../forgotPass/ForgotPass.jsx'
import ResetPass from '../resetPassword/ResetPass.jsx'
import Search from '../Client/pages/Search/Search'
import Profile from '../Client/pages/Profile/Profile.jsx'
import Category from '../Client/commonComponent/category/Category'
import AddMovie from '../Admin/pages/Movie/addNewMovie/AddMovie.jsx'
import AllMovie from '../Admin/pages/Movie/allMovie/AllMovie.jsx'
import ReadMovie from '../Admin/pages/Movie/readMovie/ReadMovie.jsx'
import AllCategories from '../Admin/pages/category/allCategory/allCategory.jsx'
import MovieofCategory from '../Admin/pages/category/movieofCategory/MovieofCategory.jsx'
import Intro from '../Client/pages/intro/Intro.js'
import HomeSearch from '../Client/pages/intro/Search/Search.jsx'
import UserMovieDetail from '../Client/pages/homepage/userMovieDetail/MovieDetail.jsx'
import HomeMovieDetail from '../Client/pages/intro/homeMovieDetail/MovieDetail.jsx'
import HomeCategory from '../Client/pages/intro/category/Category.js'

const routes = [
  {
    path: "/",
    element: <Intro />,
  },
  {
    path: "/homeSearch",
    element: <HomeSearch/>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot",
    element: <ForgotPass />,
  },
  {
    path: "/reset-password/:id",
    element: <ResetPass />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/userHome",
    element: <Home />,
  },
  {
    path: "/movie/:id",
    element: <HomeMovieDetail />,
  },
  {
    path: "/userHome/movie/:id",
    element: <UserMovieDetail/>
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/categories/:id",
    element: <Category />,
  },
  {
    path: "/homecategories/:id",
    element:<HomeCategory/>
  },
  {
    path: "/adminHome",
    element: <AllMovie />,
  },
  {
    path: "/movie/allmovie",
    element: <AllMovie />,
  },
  {
    path: "/movie/newMovie",
    element: <AddMovie />,
  },
  {
    path: "/movie/allmovie/:id",
    element: <ReadMovie />,
  },
  {
    path: '/category/allCategory',
    element: <AllCategories/>
  },
  {
      path: '/category/allCategory/:id',
      element: <MovieofCategory/>
  }
];

export default routes;
