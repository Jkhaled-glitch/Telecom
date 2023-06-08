import { useState, useEffect } from "react";
import axios from "axios";
import stylesArt from "../styles/Articles.module.css";

const AddMateriel = ({ name }) => {
  const [rows, setRows] = useState([]);
  const [articleInput, setArticleInput] = useState("");
  const [designationInput, setDesignationInput] = useState("");
  const [uniteInput, setUniteInput] = useState("");
  const [puInput, setPuInput] = useState("");
  const [materielOptions, setMaterielOptions] = useState([]);

  const addRow = async () => {
    if (articleInput && designationInput && uniteInput && puInput) {
      const newRow = {
        nature: articleInput,
        Designation: designationInput,
        unit: uniteInput,
        price: puInput,
      };

      setRows([...rows, newRow]);

      await axios.post("http://localhost:4000/api/getMateriels", {
        title: name,
        ...newRow,
      });

      setArticleInput("");
      setDesignationInput("");
      setUniteInput("");
      setPuInput("");
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
      const nameToDelete = rowToDelete.nature;

      const updatedRows = [...rows];
      updatedRows.splice(rowIndex, 1);
      setRows(updatedRows);

      axios
        .delete(
          `http://localhost:4000/api/deleteMaterielByNature/${nameToDelete}`
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
    fetchMaterielOptions();
  }, []);

  const fetchMaterielOptions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/materiel");
      const materielData = response.data;
      const materielNames = materielData.map((materiel) => materiel.nature);
      setMaterielOptions(materielNames);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <table className={stylesArt["my-table"]}>
        <thead>
          <tr>
            <th>Nature</th>
            <th>Nom</th>
            <th>Unité</th>
            <th>P.U</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.nature}</td>
              <td>{row.Designation}</td>
              <td>{row.unit}</td>
              <td>{row.price}</td>
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
              <select
                value={articleInput}
                onChange={(e) => handleInputChange(e, setArticleInput)}
                required
              >
                <option value="">Select Nature</option>
                {materielOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="text"
                value={designationInput}
                onChange={(e) => handleInputChange(e, setDesignationInput)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={uniteInput}
                onChange={(e) => handleInputChange(e, setUniteInput)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={puInput}
                onChange={(e) => handleInputChange(e, setPuInput)}
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button className={stylesArt["add-row-btn"]} onClick={addRow}>
        Add Row
      </button>
    </div>
  );
};

export default AddMateriel;
