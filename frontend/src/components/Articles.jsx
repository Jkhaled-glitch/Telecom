import stylesArt from "../styles/Articles.module.css";
import Header from "./Header";
import Footer from "./Footer";
import AddMateriel from "./addMateriel";

function Articles() {
  return (
    <>
      <Header />
      <div className={stylesArt["title-container"]}>
        <h1 className={stylesArt["title-text"]}>Articles de magazin</h1>
      </div>
      <div className={stylesArt["container"]}>
        <AddMateriel name='magazin' />
      </div>
      <Footer />
    </>
  );
}

export default Articles;
