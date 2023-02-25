import { lazy, Suspense, useEffect } from 'react';

//import './Css/App.css';
import { Routes, Route } from 'react-router-dom'

/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



import Index from "./jsx";


function App() {
  return (
    
    <Index /> 
  );
}

export default App;
