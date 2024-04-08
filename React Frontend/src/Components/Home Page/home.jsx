import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ActionAreaCard() {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionData = localStorage.getItem('session');
    if (!sessionData) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://t3.ftcdn.net/jpg/02/10/87/80/360_F_210878007_vIRqeFVZAeODdJ4dAbw4J8O6kLKzxUfi.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Welcome To The Job Portal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Learn More In The Upcoming Pages
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}