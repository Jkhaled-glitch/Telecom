import { useState, useEffect } from "react";
import axios from "axios";
import stylesArt from "../styles/Articles.module.css";
import { toast } from "react-toastify";

const AddMateriel = ({ name }) => {



  const [natureInput, setNatureInput] = useState("");
  const [designationInput, setDesignationInput] = useState("");
  const [uniteInput, setUniteInput] = useState("");
  const [puInput, setPuInput] = useState("");




  const addRow = async () => {
    if (natureInput && designationInput && uniteInput && puInput) {
      const newRow = {
        nature: natureInput,
        Designation: designationInput,
        unit: uniteInput,
        price: puInput,
      };

      await axios.post("http://localhost:4000/api/addMateriel", {
        title: name,
        ...newRow,
      })
      .then(toast.success("Materiel ajouté"))
      .catch((error)=>toast.error(error))

      setNatureInput("");
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

  return (
    <div>
      <table className={stylesArt["my-table"]}>
        <thead>
          <tr>
            <th>Nature</th>
            <th>Desination</th>
            <th>Unité</th>
            <th>P.U</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <input
                type="text"
                value={natureInput}
                onChange={(e) => handleInputChange(e, setNatureInput)}
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
      <button className={stylesArt["add-row-btn"]} onClick={addRow}>
        Add Row
      </button>
    </div>
  );
};

export default AddMateriel;
