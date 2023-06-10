import stylesArt from "../styles/Articles.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { useState,useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


function Articles() {
  const [attachements,setAttachements]=useState([])
  const [services,setServices]=useState([])
  useEffect(()=>{
        fetchData()
  },[])
  const fetchData=()=>{

    axios.get("http://localhost:4000/api/getAttachements")
    .then((res)=>{
      setAttachements(res.data)
    })
    .catch((error)=>toast.error(error))

    axios.get("http://localhost:4000/api/getServices")
    .then((res)=>{
      setServices(res.data)
    })
    .catch((error)=>toast.error(error))
  }

  return (
    <>
      <Header />
      <div className={stylesArt["title-container"]}>
        <h1 className={stylesArt["title-text"]}>Liste des attachements</h1>
      </div>
      <div className={stylesArt["container"]}>
      <div>
      <table className={stylesArt["my-table"]}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Entreprise</th>
            <th>Operation</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          { attachements.map( (attachement)=>
          <tr key={attachement._id}>
            <td>
            {attachement.title}
            </td>
            <td>
            {attachement.entreprise}
            </td>
            <td>
            {attachement.operation}
            </td>
            <td>
            {attachement.date}
            </td>
          </tr>
         ) }
        </tbody>
      </table>
     
    </div>
      </div>


      <div className={stylesArt["title-container"]}>
        <h1 className={stylesArt["title-text"]}>Liste des services</h1>
      </div>
      <div className={stylesArt["container"]}>
      <div>
      <table className={stylesArt["my-table"]}>
        <thead>
          <tr>
            <th>Reference du marché</th>
            <th>Ordre</th>

          </tr>
        </thead>
        <tbody>
          { services.map( (service)=>
          <tr key={service._id}>
            <td>
            {service.ref_market}
            </td>
            <td>
            {service.ordre}
            </td>
            
          </tr>
         ) }
        </tbody>
      </table>
     
    </div>
      </div>
      <Footer />
    </>
  );
}

export default Articles;


