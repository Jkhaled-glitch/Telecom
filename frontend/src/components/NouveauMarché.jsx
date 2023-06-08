import { useState } from "react";
import stylesNM from "../styles/NouveauMarché.module.css";
import Footer from "./Footer.jsx";
import BackToTopButton from "./BackToTopButton.jsx";
import Table from "./TableTravaux";
import landing from "../assets/landing-image.png";
import logo from "../assets/logotélécom.png";
import form3 from "../assets/formsimg3.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddMateriel from "./addMateriel";

const App = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  const [marcheData, setMarcheData] = useState({
    référence: "",
    nomEntreprise: "",
    address: "",
  });
  const [responsableData, setResponsableData] = useState({
    responsable: "",
    contact: "",
    email: "",
  });

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleMarcheInputChange = (e) => {
    const { name, value } = e.target;
    setMarcheData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResponsableInputChange = (e) => {
    const { name, value } = e.target;
    setResponsableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!marcheData.nomEntreprise || !responsableData.responsable) {
      toast.error("Veuillez remplir tous les champs de responsable et marché.");
      return;
    }
    console.log("Marche data:", marcheData);
    console.log("Responsable data:", responsableData);
    toast.success("Marché ajouté");
    navigate("/");
    await axios.post("http://localhost:4000/api/addMarket", {
      reference: marcheData.référence,
      nomEntreprise: marcheData.nomEntreprise,
      address: marcheData.address,
    });

    await axios.post("http://localhost:4000/api/addResponsable", {
      contact: responsableData.contact,
      email: responsableData.email,
      responsable: responsableData.responsable,
    });

    // Show success toast

    // Reset the form
    setMarcheData({
      référence: "",
      nomEntreprise: "",
      address: "",
    });
    setResponsableData({
      responsable: "",
      contact: "",
      email: "",
    });


  };

  return (
    <div>
      {/* font awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
      />
      {/* styles */}
      <link rel="stylesheet" href="../styles/all.min.css" />
      <link rel="stylesheet" href="../styles/normalize.css" />

      {/* header */}
      <header id="home">
        {/* navbar */}
        <nav id="nav">
          <div className={stylesNM["nav-center"]}>
            {/* nav header */}
            <div className={stylesNM["nav-header"]}>
              <img src={logo} alt="logo" className={stylesNM.logo} />
              <button className={stylesNM["nav-toggle"]}>
                <i className="fas fa-bars"></i>
              </button>
            </div>
            {/* links */}
            <div className={stylesNM["links-container"]}>
              <ul className={stylesNM.links}>
                <li>
                  <a href="#home" className={stylesNM["scroll-link"]}>
                    home
                  </a>
                </li>
                <li>
                  <a href="#about" className={stylesNM["scroll-link"]}>
                    information_marché
                  </a>
                </li>
                <li>
                  <a href="#services" className={stylesNM["scroll-link"]}>
                    travaux
                  </a>
                </li>
                <li>
                  <a href="#matériel" className={stylesNM["scroll-link"]}>
                    Matériel
                  </a>
                </li>
                {/* <li>
                <a href="#tours" className={stylesNM['scroll-link']}>
                    tours
                </a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>

        <div className={stylesNM.landing}>
          <div className={stylesNM.container}>
            <div className={stylesNM.text}>
              <h2>Bienvenue, au nouveau marché</h2>
              <p>
                Ici vous allez trouvez tous ce qui est en relation avec le
                nouveau marché tel que les informations, les travaux et le
                matériel
              </p>
            </div>
            <div className={stylesNM.image}>
              <img src={landing} alt="" />
            </div>
          </div>
          <a href="#articles">
            {" "}
            <i className="fa-solid fa-angles-down"></i>
          </a>
        </div>
      </header>

      <section className={stylesNM.section} id="about">
        <div className={stylesNM.title}>
          <h2>Information du marché</h2>
          <p>
            les informations concerant le marché , l'entreprise et le
            responsable
          </p>
        </div>
        <div className={stylesNM["about-center"]}>
          <article className={stylesNM["about-img"]}>
            <img src={form3} alt="aboutpicture" />
          </article>
          <article className={stylesNM.about}>
            {/* btn container */}
            <div className={stylesNM["btn-container"]}>
              <button
                className={`${stylesNM["tab-btn"]} ${stylesNM.active}`}
                data-id="history"
                onClick={() => handleTabClick("history")}
              >
                marché
              </button>
              <button
                className={stylesNM["tab-btn"]}
                data-id="goals"
                onClick={() => handleTabClick("goals")}
              >
                responsable
              </button>
            </div>
            <article className={stylesNM["about-content"]}>
              <div
                className={`${stylesNM.content} ${
                  activeTab === "history" ? stylesNM.active : ""
                }`}
                id="history"
              >
                {/* history */}
                <div>
                  <div>
                    <div className={stylesNM["form-group"]}>
                      <label htmlFor="référence">Référence du marché :</label>
                      <input
                        type="text"
                        id="référence"
                        name="référence"
                        placeholder="Entrez votre nom"
                        className={stylesNM["input-field"]}
                        value={marcheData.référence}
                        onChange={handleMarcheInputChange}
                      />
                    </div>

                    <div className={stylesNM["form-group"]}>
                      <label htmlFor="nomEntreprise">
                        Nom de l'entreprise :
                      </label>
                      <input
                        type="text"
                        id="nomEntreprise"
                        name="nomEntreprise"
                        placeholder="Entrez votre name"
                        className={stylesNM["input-field"]}
                        value={marcheData.nomEntreprise}
                        onChange={handleMarcheInputChange}
                      />
                    </div>

                    <div className={stylesNM["form-group"]}>
                      <label htmlFor="address">Adresse :</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Entrez votre adresse"
                        className={stylesNM["input-field"]}
                        value={marcheData.address}
                        onChange={handleMarcheInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* end of single item */}
              {/* single item */}
              <div
                className={`${stylesNM.content} ${
                  activeTab === "goals" ? stylesNM.active : ""
                }`}
                id="goals"
              >
                {/* goals */}
                <div>
                  <div className={stylesNM["form-group"]}>
                    <label htmlFor="responsable">Nom:</label>
                    <input
                      type="text"
                      id="responsable"
                      name="responsable"
                      placeholder="Entrez le nom du responsable"
                      value={responsableData.responsable}
                      onChange={handleResponsableInputChange}
                    />
                  </div>

                  <div className={stylesNM["form-group"]}>
                    <label htmlFor="contact">Num contact:</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      placeholder="Entrez le numéro du responsable"
                      value={responsableData.contact}
                      onChange={handleResponsableInputChange}
                    />
                  </div>

                  <div className={stylesNM["form-group"]}>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Entrez votre email"
                      value={responsableData.email}
                      onChange={handleResponsableInputChange}
                    />
                  </div>
                </div>
              </div>
              {/* end of single item */}
            </article>
          </article>
        </div>
      </section>

      {/* tours */}
      <section id="services" className={stylesNM.section}>
        <Table name="Travaux génie civil" />
      </section>

      <section id="services" className={stylesNM.section}>
        <Table name="Travaux réseaux urbain" />
      </section>

      <section id="services" className={stylesNM.section}>
        <Table name="Poteaux & Obturateurs" />
      </section>

      <section id="matériel" className={stylesNM.section}>
        <div className={stylesNM.title}>
          <h2>matériel fournit par l' entreprise</h2>
          {/* <div className={stylesNM["table-container"]}> */}

          <AddMateriel name="entreprise" />

          {/* </div> */}
        </div>
      </section>
      <button className={stylesNM.validerBtn} onClick={handleSubmit}>
        {" "}
        Valider
      </button>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default App;
