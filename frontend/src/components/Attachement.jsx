import { useEffect,useState } from "react";
import stylesAtt from "../styles/Attachement.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import img from "../assets/imge.png";
import UpdateArticle from "./updateArticle";
import UpdateMateriel from "./updateMateriel";
import { useNavigate } from 'react-router-dom';

const Attachement = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const date = document.getElementById("date");
    if (date) {
      date.innerHTML = new Date().getFullYear();
    }

    const btns = document.querySelectorAll(`.${stylesAtt.tabBtn}`);
    const about = document.querySelector(`.${stylesAtt.about}`);
    const articles = document.querySelectorAll(`.${stylesAtt.content}`);

    about.addEventListener("click", function (e) {
      const id = e.target.dataset.id;

      if (id) {
        btns.forEach(function (btn) {
          btn.classList.remove(stylesAtt.active);
        });

        e.target.classList.add(stylesAtt.active);

        articles.forEach(function (article) {
          article.classList.remove(stylesAtt.active);
        });

        const element = document.getElementById(id);
        element.classList.add(stylesAtt.active);
      }
    });

    const addRowBtns = document.querySelectorAll(`.${stylesAtt.addRowBtn}`);
    const tableBodies = document.querySelectorAll(`.${stylesAtt.tableBody}`);

    function handleDeleteButtonClick(event) {
      const deleteBtn = event.target;
      const row = deleteBtn.closest("tr");

      if (row.textContent.trim() === "") {
        row.remove();
      } else {
        if (window.confirm("Are you sure you want to delete this row?")) {
          row.remove();
        }
      }
    }

    tableBodies.forEach((tableBody) => {
      tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
          handleDeleteButtonClick(event);
        }
      });
    });

    addRowBtns.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        const tableBody = event.target
          .closest(`.${stylesAtt.table}`)
          .querySelector(`.${stylesAtt.tableBody}`);

        const newRow = document.createElement("tr");

        newRow.innerHTML = `
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
              <button class="${stylesAtt["delete-btn"]}">Delete</button>
          </td>
        `;

        tableBody.appendChild(newRow);
      });
    });
  }, []);


  const [attachementData, setAttachementData] = useState({
    title: "",
    entreprise: "",
    operation: "",
  });
  const [serviceData, setServiceData] = useState({
    ref_market: "",
    ordre: "",
  });

  const handleAttachementInputChange = (e) => {
    const { name, value } = e.target;
    setAttachementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!attachementData.title || !attachementData.entreprise || !attachementData.operation ||
        !serviceData.ref_market || !serviceData.ordre) {
      toast.error("Veuillez remplir tous les champs de responsable et marché.");
      return;
    }
    
    toast.success("Attachement et Service ajoutés");
    
    await axios.post("http://localhost:4000/api/addAttachement", {
      title: attachementData.title,
      entreprise: attachementData.entreprise,
      operation: attachementData.operation,
      date: Date.now(),
    });
  
    await axios.post("http://localhost:4000/api/addService", {
      ref_market: serviceData.ref_market,
      ordre: serviceData.ordre,
    });
  
  
    // Navigate to another route with data
   
    navigate("/OrdreService", { data:
                  {
                    attachementData:attachementData,
                    serviceData: serviceData
                  }
            });
  };
  

  return (
    <div>
      <Header />

      <div className={stylesAtt.headerTitle}>
        <p>Attachement journalier N°</p>
        <p>Journée du: 1/04/2023</p>
      </div>

      {/* start renseignement généreaux */}
      <div className={stylesAtt.renseignement}>
        <h2 className={stylesAtt.title}>Renseignement généreaux</h2>
        {/* ****form****** */}
        <section className={stylesAtt.section} id="about">
          <div
            className={`${stylesAtt["about-center"]} ${stylesAtt["section-center"]}`}
          >
            <article className={stylesAtt["about-img"]}>
              <img src={img} alt="aboutpicture" />
            </article>
            <article className={stylesAtt.about}>
              {/* btn container */}
              <div className={stylesAtt["btn-container"]}>
                <button
                  className={`${stylesAtt["tab-btn"]} ${stylesAtt.active}`}
                  data-id="history"
                >
                  Attachement
                </button>
                <button className={stylesAtt["tab-btn"]} data-id="goals">
                  Service
                </button>
              </div>
              <article className={stylesAtt["about-content"]}>
                {/* single item */}
                <div
                  className={`${stylesAtt.content} ${stylesAtt.active}`}
                  id="history"
                >
                  {/* history */}
                  <div>
                    <div className={stylesAtt["form-group"]}>
                      <label htmlFor="référence">Nom du surveillant :</label>
                      <input
                        type="text"
                        id="référence"
                        name="title"
                        placeholder="Entrez votre nom"
                        className={stylesAtt["input-field"]}
                        value={attachementData.title}
                        onChange={handleAttachementInputChange}
                      />
                    </div>

                    <div className={stylesAtt["form-group"]}>
                      <label htmlFor="nomEntreprise">
                        Nom de l'entreprise :
                      </label>
                      <input
                        type="text"
                        id="nomEntreprise"
                        name="entreprise"
                        placeholder="Entrez votre name"
                        className={stylesAtt["input-field"]}
                        value={attachementData.entreprise}
                        onChange={handleAttachementInputChange}
                      />
                    </div>

                    <div className={stylesAtt["form-group"]}>
                      <label htmlFor="address">Intitulé de l'opération :</label>
                      <input
                        type="text"
                        id="address"
                        name="operation"
                        placeholder="Entrez votre adresse"
                        className={stylesAtt["input-field"]}
                        value={attachementData.operation}
                        onChange={handleAttachementInputChange}
                      />
                    </div>
                  </div>
                </div>
                {/* end of single item */}
                {/* single item */}
                <div className={stylesAtt.content} id="goals">
                  {/* goals */}
                  <div>
                    <div className={stylesAtt["form-group"]}>
                      <label htmlFor="responsable">Référence du marché:</label>
                      <input
                        type="text"
                        id="responsable"
                        name="ref_market"
                        placeholder="Entrez le nom du responsable"
                        value={serviceData.ref_market}
                        onChange={handleServiceInputChange}
                      />
                    </div>

                    <div className={stylesAtt["form-group"]}>
                      <label htmlFor="contact">Ordre de service N°:</label>
                      <input
                        type="text"
                        id="contact"
                        name="ordre"
                        placeholder="Entrez le numéro du responsable"
                        value={serviceData.ordre}
                        onChange={handleServiceInputChange}
                      />
                    </div>
                  </div>
                </div>
                {/* end of single item */}
              </article>
            </article>
          </div>
        </section>
      </div>
      {/* end renseignement généreaux */}

      {/* start prestation GC */}
      <div className={stylesAtt.prestation}>
        <h2 className={stylesAtt.title}>Prestations dues à l'entreprise</h2>
        <div>
          <h4>Travaux & préstations exécutés</h4>
          <UpdateArticle name="Travaux génie civil" />
        </div>
      </div>
      {/* end prestation GC */}

      {/* start prestation RU */}

      <UpdateArticle name="Travaux réseaux urbain" />
      
      <UpdateArticle name="Poteaux & Obturateurs" />

      {/* end prestation RU */}

      {/* start matériel fournit par l'entreprise */}
      <div>
        <h4>Matériel fournit par l'entreprise</h4>
        <UpdateMateriel name="entreprise"/>
      </div>
      {/* end matériel fournit par l'entreprise */}

      {/* start matériel fournit par l'administration */}
      <div>
        <h4>matériel fournit par l'administration</h4>

        <UpdateMateriel name="administration"
        //  name="Matériel fournit par l'administration"
        />
      </div>
      {/* end matériel fournit par l'administration */}
      {/* observations */}
      <div>
        <h4>Observations</h4>
        <div className={stylesAtt["table-container"]}>
          <table className={stylesAtt.table}>
            <thead>
              <tr>
                <th>Le Surveillant</th>
                <th>Le chef de cellule</th>
                <th>l'entrepreneur</th>
                <th>Le chef de Service</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    
        <button className={stylesAtt.validation} onClick={handleSubmit}>Valider</button>
     
      <Link to="/OrdreService">
        <button className={stylesAtt.validation}>OrdreService</button>
      </Link>
      
      {/* end observations */}
      <Footer />
    </div>
  );
};

export default Attachement;
