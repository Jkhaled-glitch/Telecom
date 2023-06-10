import { useState } from "react";
import styles from "../styles/SignUp.module.css"; // Import CSS module
import Footer from "./Footer";
import axios from "axios";
import form3 from "../assets/formsimg3.png";
import { useNavigate } from "react-router-dom";


export default function App() {
  const navigate = useNavigate()
  const [res, setRes] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
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

    if (res.email === "" || res.username === "" || res.password === "" || res.confirmPassword === "") {
      setMessage("Please fill in all the fields");
    } else if (res.password === res.confirmPassword) {

      const user = {
        name: res.username,
        email: res.email,
        password: res.password,
      };
      await axios
        .post(
          "http://localhost:4000/api/auth/register",
          user
        )
        .then((response) => {
          console.log(response.data);
        });
      setMessage("Successfully signed up");
      setTimeout(() => {
        navigate("/SignIn")
      }, 2000);
     

    } else {
      setMessage("Passwords do not match");
    }

    // Clear message after 2 seconds
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  // Function to determine the CSS class for the message based on its content
  function getMessageClassName() {
    if (message.includes("Successfully")) {
      return styles["success-message"];
    } else if (message.includes("Passwords")) {
      return styles["error-message"];
    }
    return styles["info-message"];
  }

  return (
    <>
      <div>
        <h2 style={{display:"flex",justifyContent:'center',marginTop:"30px"}}>Sign Up</h2>
        <div className={styles.container}>
          <div className={styles["image-container"]}>
            <img src={form3} alt="Imagee" />
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
                type="username"
                placeholder="username"
                className={styles["form--input"]}
                onChange={handleChange}
                name="username"
                value={res.username}
              />
              <input
                type="password"
                placeholder="Password"
                className={styles["form--input"]}
                onChange={handleChange}
                name="password"
                value={res.password}
              />
              <input
                type="password"
                placeholder="Confirm password"
                className={styles["form--input"]}
                onChange={handleChange}
                name="confirmPassword"
                value={res.confirmPassword}
              />
              <button className={styles["form--submit"]}>Sign up</button>
              or
              <SignInLink />
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

const SignInLink = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate("/SignIn");
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
      Sign In
    </u>
  );
};




