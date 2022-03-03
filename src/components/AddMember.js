import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "./Hooks/useForm";
import { FetchTeamMembers, AddTeamMember, UpdateMember } from "./Service/AxiosService";
import { DataContext } from "../context/DataProvider";

export const AddMember = ({ setPeopleList }) => {
  const { selectedMemberValues } = useContext(DataContext);  

  const [values, handleInputChange, clearFormFields, handleSetInput] = useForm({
    id: "",
    name: "",
    lastname: "",
    position: "",
    location: "",
  });
  const { id, name, lastname, position, location } = values;
  console.log('values',id, name, lastname, position, location);
  const [enableSaveButton, setEnableSaveButton] = useState(false);

  useEffect(() => {
    if (selectedMemberValues.id && selectedMemberValues.id !== id ) {
      handleSetInput(selectedMemberValues);
    }
  }, [selectedMemberValues, handleSetInput,id]);

  const SaveMember = (e) => {
    e.preventDefault();
    if (name !== "" && lastname !== "" && position !== "" && location !== "") {
    // Update 
      if (id !== "") {
        UpdateMember({name, lastname, position, location},id).then((res) => {
          FetchTeamMembers().then((result) => {
            setPeopleList(result);
            clearFormFields();
            Swal.fire("App", "Update!", "success");
            
          });
        });
      } else {
        // Add
        AddTeamMember({ name, lastname, position, location }).then((res) => {
          FetchTeamMembers().then((result) => {
            setPeopleList(result); 
            clearFormFields();
            Swal.fire("App", "Save!", "success");
           
          });
        });
      }
    } else {
      Swal.fire("My Team App", "All Fields Are Required", "warning");
      setEnableSaveButton(true);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h4 className="text-start text-info"> Add Team Member </h4>
        <div className="card bg-dark border border-info">
          <div className="card-body mx-3 pb-3 pt-3">
            <form onSubmit={(e) => SaveMember(e)}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  defaultValue={name}
                  id="name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="lastname"
                  defaultValue={lastname}
                  id="lastname"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Position</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="position"
                  defaultValue={position}
                  id="position"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="location"
                  defaultValue={location}
                  id="location"
                  className="form-control"
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-info"
                  disabled={enableSaveButton}
                  type="submit"
                >
                 { id ? 'Update':'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};