import React,{useEffect,useState} from 'react'
import './allCategory.scss'
import Sidebar from '../../../components/sidebar/Sidebar.js'
import Navbar from '../../../components/navbar/Navbar'
import APIapp from '../../../../Client/APIS/APIapp.js'
import * as IoIcons from 'react-icons/io5'
import Modal from './createModal/create.jsx'
import { Link } from 'react-router-dom'


const AllCategories = () => {
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [update, setUpdate] = useState(false)
    const [info, setInfo] = useState()
    useEffect(async () => {
        const res = await APIapp.get('categories')
        console.log(res.data)
        setData(res.data.data.categories);
    },[])
    console.log(data)
    const toggleCreate = (event) => {
        event.preventDefault();
        setModal(!modal);
    };
    const toggleUpdate = () =>{
        setUpdate(!update)
    }
    return (
        <div className='category'>
            <Navbar/>
            <div className="admin">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="content">
                    <div>
                        <h1>Categories</h1>
                        <button onClick={toggleCreate} className="createbtn">Create new categories</button>
                    </div>
                    <table className="table">
                        <thead className="tablehead">
                            <tr>
                                <th>Name</th>
                                <th className='action'>Action</th>
                            </tr>
                        </thead>
                        <tbody className="tablebody">
                            {data.map((categories) =>(
                                <tr key={categories._id } className="row-tb">
                                    <td>{categories.name}</td>
                                    <td>
                                        <Link to={`/category/allCategory/${categories._id}`} className="link">
                                            <IoIcons.IoInformationCircleOutline className="icon3"/>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {modal && <Modal clickMethod = {toggleCreate}/>}
                </div>
            </div>
        </div>
    )
}

export default AllCategories