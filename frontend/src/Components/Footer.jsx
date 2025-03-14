import React from "react";
import { Typography, Container, Link } from '@mui/material';



const Footer = () => {
  if(location.pathname=="/article" ) return null;
  return (
    <div>
    <footer className="bg-gray-900 py-6 mt-10 text-white">
    <Container maxWidth="lg">
      <div className="flex flex-col items-center space-y-4">
        <Typography variant="h6" component="p" className="text-center">
          My News Aggregator
        </Typography>
        <div className="flex space-x-4">
          <Link href="/" color="inherit" className="text-white hover:text-gray-400">
            Home
          </Link>
          <Link href="/about" color="inherit" className="text-white hover:text-gray-400">
            About
          </Link>
          <Link href="/contact" color="inherit" className="text-white hover:text-gray-400">
            Contact
          </Link>
        </div>
        <Typography variant="body2" className="text-center mt-4">
          © {new Date().getFullYear()} My News Aggregator. All rights reserved.
        </Typography>
      </div>
    </Container>
  </footer>
    </div>
  );
};

export default Footer;
