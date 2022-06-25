import React, { useState, useEffect } from "react";
import styled from "styled-components";
import APIapp from "../../APIS/APIapp";
import Navbar from "../../commonComponent/navbar/Navbar";
import './History.scss';

const History = () => {
  const [movieOrdered, setmovieOrdered] = useState([]);
  useEffect(async () => {
    const response = await APIapp.get("/users/my-orders");
    setmovieOrdered(response.data.data.orders);
  }, []);

 
  console.log(movieOrdered);
  return (
    <div className="containerHistory">
      <Navbar />
      <div className="Wrapper">
        <thead className="Trhead">
          <th>Sách</th>
          <th>Tên sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Tình trạng</th>
        </thead>
        {movieOrdered.map((order) => (
          <tbody className="TrBody">
            <td>
              <img src={(`http://127.0.0.1:8000/img/movies/${order.movieCopy.movie.image}`)} />
            </td>
            <td>{order.movieCopy.name}({order.movieCopy.copyId})</td>
            <td>{order.createdAt.slice(0,10)}</td>
            <td>{(order.isReturned) ? (order.returnDate==undefined ? `DD-MM-YYY` : order.returnDate.slice(0,10)) : `DD-MM-YYY`}</td>
            <td> {(order.isReturned) ? `Đã trả`:`Đang mượn` }</td>
          </tbody>
        ))}
      </div>
    </div>
  );
};

export default History;
