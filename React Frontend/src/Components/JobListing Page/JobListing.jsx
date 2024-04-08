import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function DataCard() {
  const [data,setData] = useState([
    {
      id: 1,
      title: 'Full Stack Developer',
      description: 'Join our dynamic team to work on cutting-edge technologies. Develop and maintain sophisticated web applications for our diverse client base.',
      lastUpdated: 'Last updated 2 days ago',
      applyLink: 'https://example.com/apply/full-stack-developer',
    },
    {
      id: 2,
      title: 'Digital Marketing Specialist',
      description: 'Elevate our digital marketing strategies to promote our innovative products. Proficiency in SEO, SEM, and social media marketing is highly valued.',
      lastUpdated: 'Last updated 1 day ago',
      applyLink: 'https://example.com/apply/digital-marketing-specialist',
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      description: 'Shape engaging user experiences and create visually captivating designs. Work alongside cross-functional teams to turn ideas into reality.',
      lastUpdated: 'Last updated 4 hours ago',
      applyLink: 'https://example.com/apply/ux-ui-designer',
    },
    {
      id: 4,
      title: 'Data Scientist',
      description: 'Leverage advanced analytics and machine learning to uncover insights from vast data sets. Proficiency with Python and R is a must.',
      lastUpdated: 'Last updated 3 days ago',
      applyLink: 'https://example.com/apply/data-scientist',
    },
    {
      id: 5,
      title: 'Customer Support Representative',
      description: 'Deliver unparalleled customer service and support. Exceptional communication skills and a knack for solving problems are key.',
      lastUpdated: 'Last updated 6 hours ago',
      applyLink: 'https://example.com/apply/customer-support-representative',
    }
])
  const navigate = useNavigate();

  useEffect(() => {
    const sessionData = localStorage.getItem('session');
    if (!sessionData) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Box sx={{ paddingTop: 10, display: "flex", flexDirection: "column", gap: 2 }}>
      {data.map((item) => (
        <Card key={item.id} sx={{ minWidth: 275 }}>
          <CardContent>
            {/* Display the title */}
            <Typography variant="h5" component="div">
              {item.title}
            </Typography>
            {/* Display the description or any other text */}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.lastUpdated}
            </Typography>
            {/* You can add more fields here if your items have more text data */}
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Link
              href={item.applyLink}
              underline="none"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="small">Apply Now</Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
