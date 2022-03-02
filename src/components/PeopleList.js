import React from "react";

export const PeopleList = ({ peopleList }) => {
  console.log(peopleList, "table");
  return (
    <>
      <div className="container my-4">
        <h4 className="mt-2 text-start text-info">Team Members</h4>
      <div className="table-responsive-xl" >
        <table className="table table-dark table-striped text-white vh-50 overflow-visible">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {peopleList.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.lastname}</td>
                  <td className="text-capitalize">{item.position}</td>
                  <td>{item.location}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};
