import stylesArt from "../styles/Articles.module.css";
import Header from "./Header";
import Footer from "./Footer";
import UpdateMateriel from './updateMateriel2.jsx'


function Articles() {


  return (
    <>
      <Header />
      <div className={stylesArt["title-container"]}>
        <h1 className={stylesArt["title-text"]}>Articles de magazin</h1>
      </div>
      <UpdateMateriel name="administration"
        //  name="Matériel fournit par l'administration"
        />
      <Footer />
    </>
  );
}

export default Articles;


