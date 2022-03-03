import React, { useContext } from "react";
import Swal from "sweetalert2";
import { DataContext } from "../context/DataProvider";

import { DeleteTeamMember, FetchTeamMembers, FetchMember } from "./Service/AxiosService";

export const PeopleList = ({ peopleList,setPeopleList }) => {
  const { setSelectedMemberValues } =
    useContext(DataContext);



  const DeleteMember = async(id) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteTeamMember(id).then(
          result=>{
            FetchTeamMembers().then(TeamMember=>{
              setPeopleList(TeamMember);
            })
          }
        )
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const EditMember = async id =>{ 
  const memberInfo = await FetchMember(id);
  console.log(memberInfo);
  setSelectedMemberValues(memberInfo);
  return memberInfo;
  };

  return (
    <>
      <div className="container my-4">
        <h4 className="mt-2 text-start text-info">Team Members</h4>
      <div className="table-responsive-xl" >
        <table  className="table table-dark table-striped text-white vh-50 overflow-visible">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Location</th>
              <th>Action</th>
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
                  <td>
                    <button className="btn btn-outline-danger border-0 me-2" onClick={()=> DeleteMember(item.id)} ><i className="fa-solid fa-trash-can"  ></i></button>
                    <button className="btn btn-outline-light border-0" onClick={()=> EditMember(item.id)}><i className="fa-solid fa-pen-to-square"></i></button>
                  </td>
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
