import React, { useState, useEffect } from "react";
import { Slide, Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checked, setChecked] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_560273712d33d2a388df314ffee7d0de9685e&q=top%20news"
        );
        const data = await response.json();
        
       
        if (data.results) {
          const validImages = data.results
            .filter((item) => item.image_url) 
            .map((item) => item.image_url); 

          setImages(validImages);
        } else {
          console.error("No results found");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleNext = () => {
    setChecked(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setChecked(true);
    }, 300);
  };

  const handlePrev = () => {
    setChecked(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setChecked(true);
    }, 300);
  };

  if (
    location.pathname === "/sign-in" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/article"
  )
    return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "450px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <Slide
              key={index}
              direction={currentIndex > index ? "left" : "right"}
              in={currentIndex === index && checked}
              timeout={500}
              mountOnEnter
              unmountOnExit
            >
              <Box
                component="img"
                src={image}
                alt={`carousel-img-${index}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </Slide>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              backgroundColor: "#f0f0f0",
            }}
          >
            No images available
          </Box>
        )}

        
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            zIndex: 1,
          }}
          disabled={images.length === 0}
        >
          <ArrowBack />
        </IconButton>

       
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            zIndex: 1,
          }}
          disabled={images.length === 0}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Carousel;
