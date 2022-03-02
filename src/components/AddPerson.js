import React from "react";
import Swal from "sweetalert2";
import { useForm } from "./Hooks/useForm";
import { FetchTeamMembers, PostPerson } from "./Service/AxiosService";

export const AddPerson = ({ setPeopleList }) => {
  const [values, handleinputchange] = useForm({
    name: "",
    lastname: "",
    position: "",
    location: "",
  });

  const { name, lastname, position, location } = values;

  const clickAdd = (e) => {
    e.preventDefault();
    PostPerson({ name, lastname, position, location }).then((r) => {
      FetchTeamMembers().then((r) => {
        setPeopleList(r);
      });
      Swal.fire("App", "Save!", "success");
    });
    console.log(name, lastname, position, location);
  };

  return (
    <>
      <div className="container mt-4">
        <h4 className="text-start text-info"> Add Team Member </h4>
        <div className="card bg-dark border border-info">
          <div className="card-body mx-3 pb-3 pt-3">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  onChange={handleinputchange}
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  onChange={handleinputchange}
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Position</label>
                <input
                  onChange={handleinputchange}
                  type="text"
                  name="position"
                  id="position"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  onChange={handleinputchange}
                  type="text"
                  name="location"
                  id="location"
                  className="form-control"
                />
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-info" onClick={clickAdd}>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
