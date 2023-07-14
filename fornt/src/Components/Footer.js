import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom';

const Footer = () => {
  const [data, setData] = useState({});

  const fetchData = (url) => {
    axios
      .get(url)
      .then((response) => {
        // Handle successful response here
        setData(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData('https://matrixmaster.info/');
    fetchData('https://matrixmaster.info/our-program/');
  }, []);

  return (
    <div className="container_header">
      <div className="footer">
        <a href="https://matrixmaster.info/" target="_blank" rel="noopener noreferrer">
          Matrix Master Web Site
        </a>
        <a href="https://matrixmaster.info/our-program/" target="_blank" rel="noopener noreferrer">
          Program
        </a>
        <a href="tel:+31 6 87868789">+31 6 87868789</a>
        <a href="mailto:info@matrixmaster.info">info@matrixmaster.info</a>
        <Link to="/" />
      </div>
    </div>
  );
};

export default Footer;

