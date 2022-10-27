import {React, useContext} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { API_URL_Context } from "./API_Context";//import context
import Home from "./Views/Home";
import './App.css';

//Check if the  environment is production or development, set up the API URL accordingly
let apiContextValue = ''
if (process.env.NODE_ENV === 'development') {
    apiContextValue = process.env.REACT_APP_API_URL_DEV
}else if(process.env.NODE_ENV === 'production'){
    apiContextValue = process.env.REACT_APP_API_URL_PROD
}

function App() {
  return (
    <Router>
          <API_URL_Context.Provider value={apiContextValue}>{/* Addd a value to the imported context, then make it available to the components insice this provider */}
            <Routes>
              <Route path="/" element={<Home/>}/>{/*The "" path redirects to the component*/}
            </Routes>
          </API_URL_Context.Provider>
    </Router>
  );
}

export default App;