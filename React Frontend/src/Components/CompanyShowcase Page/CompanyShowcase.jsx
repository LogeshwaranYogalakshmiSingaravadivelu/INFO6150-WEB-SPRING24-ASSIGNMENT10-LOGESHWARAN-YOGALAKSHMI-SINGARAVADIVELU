import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import fg from "../../../public/"

export default function DataCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/user/getImage")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) =>
        console.error("There was an error fetching the data:", error)
      );
  }, []); 
  const navigate = useNavigate();

  useEffect(() => {
    const sessionData = localStorage.getItem('session');
    if (!sessionData) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Box sx={{ paddingTop: 10, display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
      {data.map((item) => (
        <Card key={item._id} sx={{ minWidth: 275 }}>
          <CardMedia
            component="img"
            height="140"
            image={`/upload/user/${item.image}`}
            alt="Image"
          />
        </Card>
      ))}
    </Box>
  );
}
