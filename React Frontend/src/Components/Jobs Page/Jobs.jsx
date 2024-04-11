import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Link from "@mui/material/Link";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import fg from "../../../public/"

export default function DataCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/user/get/jobs")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) =>
        console.error("There was an error fetching the data:", error)
      );
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionData = localStorage.getItem("session");
    if (!sessionData) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        paddingTop: 10,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {data.map((item) => (
        <Card key={item.salary} sx={{ minWidth: 275 }}>
          <CardContent>
            {/* Display the title */}
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.title}
            </Typography>
            {/* Display the description or any other text */}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.salary}
            </Typography>
            {/* You can add more fields here if your items have more text data */}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
