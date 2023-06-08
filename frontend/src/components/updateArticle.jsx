import stylesArt from "../styles/Articles.module.css";
import stylesAtt from "../styles/Attachement.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateArticle = (name) => {
  console.log(name.name);
  const [rows, setRows] = useState([]);

  const [articleInput, setArticleInput] = useState("");
  const [uniteInput, setUniteInput] = useState("");
  const [quantiteInput, setQuantiteInput] = useState("");
  const [observationsInput, setObservationsInput] = useState("");

  const [designationOptions, setDesignationOptions] = useState([]);

  const [selectedDesignation, setSelectedDesignation] = useState(-1);

  const updateRow = async () => {

    if (quantiteInput && observationsInput) {
      const newRow = {
        name: articleInput,
        unit: uniteInput,
        quantity: quantiteInput,
        observations: observationsInput,
      };

      //setQuantiteInput(quantiteInput);
      //setObservationsInput(observationsInput);
      

      setRows([...rows, newRow]);

      //console.log("new article", newRow);
      await axios.put(
        `http://localhost:4000/api/articles/update/${articleInput}`,
        newRow
      ).then((res)=>fetchRows())
      
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };

  const handleInputChange = (e, setInput) => {
    setInput(e.target.value);
  };

  const deleteRow = (rowIndex) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (shouldDelete) {
      const rowToDelete = rows[rowIndex];
      const articleToDelete = rowToDelete.name;

      const updatedRows = [...rows];
      updatedRows.splice(rowIndex, 1);
      setRows(updatedRows);
      console.log(articleToDelete);
      axios
        .delete(
          `http://localhost:4000/api/articles/delete/${articleToDelete}`
        )
        .then(() => {
          console.log("Delete successful");
        })
        .catch((error) => {
          console.error("Delete failed", error);
        });
    }
  };

 

  useEffect(() => {
    fetchRows();
 
  }, []);

  const fetchRows = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/articles/get/${name.name}`);
      const rowsData = response.data;

      const designations = rowsData.map((article) => article.Designation);
      setDesignationOptions(designations);

      setRows(rowsData);
    } catch (error) {
      console.log(error);
    }
  };

 

  
 const handleSelectChange = (rowIndex) => {
  setSelectedDesignation(rowIndex);

  if (rowIndex >= 0) {
    const { name, unit, quantity, observations } = rows[rowIndex];

    setArticleInput(name || "");
    setUniteInput(unit || "");
    setQuantiteInput(quantity || "");
    setObservationsInput(observations || "");
  } else {
    setArticleInput("");
    setUniteInput("");
    setQuantiteInput("");
    setObservationsInput("");
  }
};


  return (
    <div>
      <table className={stylesArt["my-table"]}>
        <thead>
          <tr>
            <th>Article</th>
            <th>Désignation</th>
            <th>Unité</th>
            <th>Quantité</th>
            <th>Observations</th>
          </tr>
          <tr className={stylesAtt.specialRow}>
            <td colSpan="5">{name.name}</td>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.Designation}</td>
              <td>{row.unit}</td>
              <td>{row.quantity}</td>

              <td>{row.observations}</td>
              <td>
                <button
                  className={stylesArt["delete-row-btn"]}
                  onClick={() => deleteRow(index)}
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
                  value={articleInput}
                  onChange={(e) => handleInputChange(e, setArticleInput)}
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
                value={quantiteInput}
                onChange={(e) => handleInputChange(e, setQuantiteInput)}
                required
              />
              )}
            </td>
            <td>
            {selectedDesignation >-1 && (
              <input
                type="text"
                value={observationsInput}
                onChange={(e) => handleInputChange(e, setObservationsInput)}
                required
              />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <button className={stylesArt["add-row-btn"]} onClick={updateRow}>
        Update Row
      </button>
    </div>
  );
};

export default UpdateArticle;
