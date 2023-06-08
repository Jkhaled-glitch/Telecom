import { useState } from "react";
import PropTypes from "prop-types";
import aa from "../styles/NouveauMarché.module.css";
import axios from "axios";

const Table = (props) => {
  const [rows, setRows] = useState([]);
  const [articleInput, setArticleInput] = useState("");
  const [designationInput, setDesignationInput] = useState("");
  const [uniteInput, setUniteInput] = useState("");
  const [puInput, setPuInput] = useState("");

  const addRow = async () => {
    if (articleInput && designationInput && uniteInput && puInput) {
      const newRow = {
        name: articleInput,
        Designation: designationInput,
        unit: uniteInput,
        price: puInput,
      };
      setRows([...rows, newRow]);
      await axios.post("http://localhost:4000/api/articles/add", {
        title: props.name,
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
      const rowToDelete = rows[rowIndex]; // Assuming the row data is stored in the `rows` state array
      const nameToDelete = rowToDelete.name; // Assuming the name is used as the identifier for deletion

      const updatedRows = [...rows];
      updatedRows.splice(rowIndex, 1);
      setRows(updatedRows);
      console.log(nameToDelete);
      axios
        .delete(`http://localhost:4000/api/articles/delete/${nameToDelete}`)
        .then(() => {
          console.log("Delete successful");
        })
        .catch((error) => {
          console.error("Delete failed", error);
        });
    }
  };

  return (
    <div className={aa.container}>
      <h2 className={aa.titreNM}>{props.name}</h2>
      <div className={aa["table-container"]}>
        <table className={aa.table}>
          <thead>
            <tr>
              <th>Article</th>
              <th>Désignation</th>
              <th>Unité</th>
              <th>PU HTVA</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.Designation}</td>
                <td>{row.unit}</td>
                <td>{row.price}</td>
                <td>
                  <button
                    className={aa["delete-row-btn"]}
                    onClick={() => deleteRow(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  value={articleInput}
                  onChange={(e) => handleInputChange(e, setArticleInput)}
                  required
                />
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

        <button className={aa["add-row-btn"]} onClick={addRow}>
          Add Row
        </button>
      </div>
    </div>
  );
};

Table.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Table;
