import React, { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "./Hooks/useForm";
import { FetchTeamMembers, AddTeamMember, UpdateMember } from "./Service/AxiosService";
import { DataContext } from "../context/DataProvider";

export const AddMember = ({ setPeopleList }) => {
  const { selectedMemberValues,setSelectedMemberValues } = useContext(DataContext);  

  const [values, handleInputChange, clearFormFields, handleSetInput] = useForm({
    id: "",
    name: "",
    lastname: "",
    position: "",
    location: "",
  });
  const { id, name, lastname, position, location } = values;

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
            setSelectedMemberValues({});
            clearFormFields();
            Swal.fire("Team Manager", "Member has been successfully updated!", "success"); 
          });
        });
      } else {
        // Add
        AddTeamMember({ name, lastname, position, location }).then((res) => {
          FetchTeamMembers().then((result) => {
            setPeopleList(result); 
            clearFormFields();
            Swal.fire("Team Manager", "Member has been successfully added!", "success");
          });
        });
      }
    } else {
      Swal.fire("Team Manager", "All Fields Are Required", "warning");
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
                  value={name}
                  id="name"
                  className="form-control fw-bolder"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="lastname"
                  value={lastname}
                  id="lastname"
                  className="form-control fw-bolder"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Position</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="position"
                  value={position}
                  id="position"
                  className="form-control fw-bolder"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="location"
                  value={location}
                  id="location"
                  className="form-control fw-bolder"
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-info"
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
