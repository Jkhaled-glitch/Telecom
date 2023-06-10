import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
// import Header from './components/Header.jsx';
import Articles from "./components/Articles.jsx";
import NouveauMarché from "./components/NouveauMarché.jsx";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
// import Component from './components/myComponent.js'
import Attachement from "./components/Attachement.jsx";
import Attachements from "./components/Attachements.jsx";
import OrdreService from "./components/OrdreDeService.jsx";
import PvReceptionProvisoire from "./components/PVReception.jsx";
import ChoosePage from "./components/ChoosePage.jsx";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

import NotFound from "./components/notFound.jsx";

import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext)
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/SignIn" />;
  };
  RequireAuth.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <BrowserRouter>                                                                                   
      <Routes>
        
      <Route path="/">
            <Route
                    index
                    element={
                      <RequireAuth>
                        <ChoosePage />
                      </RequireAuth>
                    }
                  />

            <Route 
                  path="NouveauMarché" 
                  element={
                    <RequireAuth>
                      <NouveauMarché />
                    </RequireAuth>
                  } 
            />
             <Route 
                  path="Attachement" 
                  element={
                    <RequireAuth>
                      <Attachement />
                    </RequireAuth>
                  } 
            />
            <Route 
                  path="Attachements" 
                  element={
                    <RequireAuth>
                      <Attachements />
                    </RequireAuth>
                  } 
            />
            <Route 
                  path="OrdreService" 
                  element={
                    <RequireAuth>
                      <OrdreService />
                    </RequireAuth>
                  } 
            />
            <Route 
                  path="PVReception" 
                  element={
                    <RequireAuth>
                      <PvReceptionProvisoire />
                    </RequireAuth>
                  } 
            />
            <Route 
                  path="Articles" 
                  element={
                    <RequireAuth>
                      <Articles />
                    </RequireAuth>
                  } 
            />

            <Route path="SignIn" element={<SignIn />} />
            
            <Route path="SignUp" element={<SignUp />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      

        

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;




