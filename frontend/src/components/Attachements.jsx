import { useEffect } from "react";
import stylesAtt from "../styles/Attachement.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import img from "../assets/imge.png";
import UpdateArticle from "./updateArticle";
import UpdateMateriel from "./updateMateriel";

const Attachement = () => {
  useEffect(() => {
    

  }, []);

  return (
    <div>
      <Header />

      <div className={stylesAtt.headerTitle}>
        <p>Liste des Attachements</p>
        <p></p>
      </div>

      <div>
        <div className={stylesAtt["table-container"]}>
          <table className={stylesAtt.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Entreprise</th>
                <th>Operation</th>
                <th>Date</th>
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
      <Link to="/OrdreService">
        <button className={stylesAtt.validation}>Valider</button>
      </Link>
      {/* end observations */}
      <Footer />
    </div>
  );
};

export default Attachement;
