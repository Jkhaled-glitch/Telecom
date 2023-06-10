import { useState,useContext } from "react";
import styles from "../styles/SignIn.module.css";
import Footer from "./Footer";
import axios from "axios";
import form3 from "../assets/formsimg3.png";

import {AuthContext} from "../context/AuthContext"

import { useNavigate } from "react-router-dom";
export default function SignIn() {

  const {dispatch} = useContext(AuthContext)
  const {currentUser} = useContext(AuthContext)
  
  const navigate = useNavigate()

  //redirection if user connected
    if(currentUser){
      navigate("/");
    }
    
  
  const [res, setRes] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setRes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (res.email === "" || res.password === "") {
      setMessage("Please fill in all the fields");
    } else {
      // Authentification
      const user = {
        email: res.email,
        password: res.password,
      };
  
      axios
        .post("http://localhost:4000/api/auth/login", user)
        .then((response) => {
          console.log("response.status: "+response.status)
          // Vérifier le statut de la réponse
          if (response.status === 200) {
            // Authentification réussie
            console.log("Login successful");
            console.log(response.data); // Utilisateur retourné par l'API
  
            const user = response.data;
  
            // Effectuer vos actions après la connexion réussie
            dispatch( { type: "LOGIN", payload: user } );
            navigate("/");
          } else{
            if (response.status === 404) {
              // Utilisateur non trouvé
              setMessage(response.data.message);
            } else{
              if (response.status === 401) {
                // Mot de passe incorrect
                setMessage(response.data.message);
              } else{
                if (response.status === 422) {
                  // Champ(s) manquant(s)
                  setMessage(response.data.message);
                } else {
                  if (response.status === 500) {
                    // Erreur interne du serveur
                    setMessage(response.data.message);
                  } 
                  else {
                    // Statut de réponse inattendu
                    setMessage("Unexpected error occurred");
                  }
                }
              }
            } 
          }
          
        })
        .catch((error) => {
          // Erreur lors de la requête
          console.error("Request error:", error);
  
          // Vérifier si une réponse d'erreur est renvoyée par l'API
          if (error.response) {
            setMessage(error.response.data.message);
          } else {
            // Erreur inconnue
            setMessage("Unknown error occurred");
          }
        });
    }
  
    // Effacer le message après 2 secondes
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  
  
  
  // Function to determine the CSS class for the message based on its content
  function getMessageClassName() {
    if (message.includes("Successfully")) {
      return styles["success-message"];
    } else if (message.includes("Incorrect")) {
      return styles["error-message"];
    }
    return styles["info-message"];
  }

  return (
    <>

      <div>
        <h2 style={{display:"flex",justifyContent:'center',marginTop:"30px"}}>Sign In</h2>
        <div className={styles.container}>
          <div className={styles["image-container"]}>
            <img src={form3} alt="Image" />
          </div>
          <div className={styles["form-container"]}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                className={styles["form--input"]}
                onChange={handleChange}
                name="email"
                value={res.email}
              />

              <input
                type="password"
                placeholder="Password"
                className={styles["form--input"]}
                onChange={handleChange}
                name="password"
                value={res.password}
              />

              <button className={styles["form--submit"]}>Sign In</button>
              <span>or</span>
              <SignUpLink />
            </form>
            
          </div>
        </div>
        <div className={styles["message-container"]}>
          {message && (
            <div className={`${styles.message} ${getMessageClassName()}`}>
              {message}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );

}






const SignUpLink = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate("/SignUp");
  };

  const linkStyles = {
    cursor: isHovered ? "pointer" : "default",
    color: isHovered ? "#1562a2" : "black",
  };

  return (
    <u
      style={linkStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      Sign Up
    </u>
  );
};



