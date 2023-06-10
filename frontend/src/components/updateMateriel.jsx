import stylesArt from "../styles/Articles.module.css";
import stylesAtt from "../styles/Attachement.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateMateriel = (name) => {
  console.log(name.name);
  const [rows, setRows] = useState([]);
  const [myRows, setMyRows] = useState([]);

  const [uniteInput, setUniteInput] = useState("");
  const [natureInput, setNatureInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const [designationOptions, setDesignationOptions] = useState([]);

  const [selectedDesignation, setSelectedDesignation] = useState(-1);

  const updateRow = async (id) => {

    if (uniteInput && natureInput && priceInput) {
      const newRow = {
        nature: natureInput,
        unit: uniteInput,
        price: priceInput,
      };


      

      setRows([...rows, newRow]);


      await axios.put(
        
        `http://localhost:4000/api/updateMaterialByID/${id}`, newRow)
        .then(()=> fetchRows())
      
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };

  const handleInputChange = (e, setInput) => {
    setInput(e.target.value);
  };

  const deleteRow = (/*rowIndex */) => {
    
      

      const updatedRows = [...rows];
      updatedRows.splice(selectedDesignation, 1);
      setRows(updatedRows);
      /*
      axios
        .delete(
          `http://localhost:4000/api/deleteMaterielByID/${id}`
        )
        .then(() => {
          console.log("Delete successful");
        })
        .catch((error) => {
          console.error("Delete failed", error);
        });
        */
    
  };

 

  useEffect(() => {
    fetchRows();
 
  }, []);

  const fetchRows = async () => {
    try {
     
      const response = await axios.get(`http://localhost:4000/api/getMaterielByTitle/${name.name}`);
      const rowsData = response.data;

      const designations = rowsData.map((material) => material.Designation);
      setDesignationOptions(designations);

      setRows(rowsData);
    } catch (error) {
      console.log(error);
    }
  };

 

  
 const handleSelectChange = (rowIndex) => {
  setSelectedDesignation(rowIndex);
  const existingRow = myRows.find((row) => row === rows[rowIndex]);

  if (rowIndex >= 0 && !existingRow) {
    setMyRows([...myRows,rows[rowIndex]])
  }
};


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
          {myRows.map((row, index) => (
            <tr key={index}>
              <td>{row.nature}</td>
              <td>{row.Designation}</td>
              <td>{row.unit}</td>
              <td>{row.price}</td>
              <td>
                <button
                  className={stylesArt["delete-row-btn"]}
                  onClick={() => deleteRow(row._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>

            <td>
              {selectedDesignation >-1 && (
                <input
                  type="text"
                  value={natureInput}
                  onChange={(e) => handleInputChange(e, setNatureInput)}
                  required
                />
              )}
            </td>
            <td>
              <div>
                <div className={stylesArt["select-container"]}>
                  <select
                    className={stylesArt["select-designation"]}
                    value={selectedDesignation}
                    onChange={(e)=>handleSelectChange(e.target.value)}
                  >
                    <option value="-1">Select Designation</option>
                    {designationOptions.map((designation, index) => (
                      <option key={index} value={index}>
                        {designation}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </td>
            <td>
              {(selectedDesignation >-1) && (
                <input
                  type="text"
                  value={uniteInput}
                  onChange={(e) => handleInputChange(e, setUniteInput)}
                  required
                />
              )}
            </td>
            <td>
            {selectedDesignation>-1 && (
              <input
                type="text"
                value={priceInput}
                onChange={(e) => handleInputChange(e, setPriceInput)}
                required
              />
              )}
            </td>
            
          </tr>
        </tbody>
      </table>
      <button className={stylesArt["add-row-btn"]} onClick={()=>updateRow(  rows[selectedDesignation]._id )   }>
        Update Row
      </button>
    </div>
  );
};

export default UpdateMateriel;
