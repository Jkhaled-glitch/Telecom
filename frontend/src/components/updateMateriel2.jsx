import stylesArt from "../styles/Articles.module.css";
import stylesAtt from "../styles/Attachement.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateMateriel = (name) => {
  console.log(name.name);
  const [rows, setRows] = useState([]);
  const addRow = async () => {

    if (newNature && newDesignation && newUnit && newPrice) {
      const newRow = {
        title:name.name,
        nature: newNature,
        Designation: newDesignation,
        unit: newUnit,
        price: newPrice,
      };
      setRows([...rows, newRow]);
      await axios.post(
        `http://localhost:4000/api/addMateriel`, newRow)
        .then(()=>{
            newNature && newDesignation && newUnit && newPrice
            setNewNature('')
            setNewDesignation('')
            setNewPrice('')
            setNewUnit('')

            fetchRows()
        } )
      
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };

 
  useEffect(() => {
    fetchRows();
 
  }, []);

  const fetchRows = async () => {
    try {
     
      const response = await axios.get(`http://localhost:4000/api/getMaterielByTitle/${name.name}`);
      const rowsData = response.data;

      setRows(rowsData);
    } catch (error) {
      console.log(error);
    }
  };

const [newNature,setNewNature] = useState('')
const [newPrice,setNewPrice] = useState('')
const [newUnit,setNewUnit] = useState('')
const [newDesignation,setNewDesignation] = useState('')


  return (
    <div>
      <table className={stylesArt["my-table"]}>
        <thead>
          <tr>
            <th>Nature</th>
            <th>Designation</th>
            <th>Unité</th>
            <th>prix</th>
          
          </tr>
          <tr className={stylesAtt.specialRow}>
            <td colSpan="5">{name.name}</td>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.nature}</td>
              <td>{row.Designation}</td>
              <td>{row.unit}</td>
              <td>{row.price}</td>
              
            </tr>
          ))}

              <tr>
              <td><input
              value={newNature}
              onChange={(e)=>setNewNature(e.target.value)}
              
              />
              </td>
              <td><input
              value={newDesignation}
              onChange={(e)=>setNewDesignation(e.target.value)}
            
              
              /></td>
              <td><input
              value={newUnit}
              onChange={(e)=>setNewUnit(e.target.value)}
              
              /></td>
              <td><input
              value={newPrice}
              onChange={(e)=>setNewPrice(e.target.value)}
              
              /></td>
              
            </tr>
          
        </tbody>
      </table>
      <button className={stylesArt["add-row-btn"]} onClick={()=>addRow()   }>
        add Row
      </button>
    </div>
  );
};

export default UpdateMateriel;
