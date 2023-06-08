import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from './components/Header.jsx';
import Articles from "./components/Articles.jsx";
import NouveauMarché from "./components/NouveauMarché.jsx";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
// import Component from './components/myComponent.js'
import Attachement from "./components/Attachement.jsx";
import OrdreService from "./components/OrdreDeService.jsx";
import PvReceptionProvisoire from "./components/PVReception.jsx";
import ChoosePage from "./components/ChoosePage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChoosePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/NouveauMarché" element={<NouveauMarché />} />
        <Route path="/Attachement" element={<Attachement />} />
        <Route path="/OrdreService" element={<OrdreService />} />
        <Route path="/PVReception" element={<PvReceptionProvisoire />} />
        <Route path="/Articles" element={<Articles />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
