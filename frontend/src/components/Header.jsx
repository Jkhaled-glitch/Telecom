import stylesHeader from "../styles/Header.module.css";
import logo from "../assets/logotélécom.png";
import Person from "../assets/person.png";
import { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext";



  

 


function Header() {
  
  return (
    <div >
      
      
    <div
      className={stylesHeader["company-info"]}
      //  style={{ background: "red" }}
    >
      
      <div className={stylesHeader["company-info-left"]}>
        <span className={stylesHeader["company-name"]}>
          Société Nationale des Télécoms
        </span>
        <br />
        <span className={stylesHeader["company-info-line"]}>
          Direction Régionale des Télécoms de l&apos;Ariana
        </span>
        <br />
        <span className={stylesHeader["company-info-line"]}>ULS El Menzah</span>
        <br />
      </div>
      <div className={stylesHeader["company-info-right"]}>
        <img src={logo} alt="Company Logo" className={stylesHeader.logo} />
        <div>
          <span className={stylesHeader["company-name-arabic"]}>
            الشركة الوطنية للاتصالات
          </span>
          <br />
          <span className={stylesHeader["company-info-line-arabic"]}>
            الإدارة الجهوية للاتصالات بأريانة
          </span>
          <br />
          <span className={stylesHeader["company-info-line-arabic"]}>
            {" "}
            المنزه ULS
          </span>
          <br />
        </div>

        <Logout/>

      </div>
      
    </div>
    </div>
  );
}


const Logout = () => {
  const { dispatch } = useContext(AuthContext);
    const handleLogout=()=>{
      dispatch({type:"LOGOUT"})
    }
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

 

  const linkStyles = {
    cursor: isHovered ? "pointer" : "default",
    color: isHovered ? "red" : "black",
    marginTop:"5px", 
    marginRight:"5px",
    marginLeft:"15px",
    height:"13vh"
  };

  return (
    <div style={linkStyles}>
            <span style={{display:"flex"}}   
                onClick={handleLogout} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img style={{height:"25px",width:"20px" }} src={Person} alt="user" className={stylesHeader.logo} />
                Logout
              </span>
      </div>
    

  );
};

export default Header;
