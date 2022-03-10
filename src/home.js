import React, { useCallback, useEffect, useState } from "react";
import { AddMember } from "./components/AddMember";
import { PeopleList } from "./components/PeopleList";
import { FetchTeamMembers } from "./components/Service/AxiosService";
import DataProvider from "./context/DataProvider";


export const Home = () => {
  const [peopleList, setPeopleList] = useState([]);

  const getPeopleList = useCallback(async () => {
    const result = await FetchTeamMembers();
    setPeopleList(result);
  }, []);

  useEffect(() => {
    getPeopleList().catch(console.error);
  }, [getPeopleList]);

  return (
    <DataProvider payload="Bienvenido">
      <>
        <div className="container mt-5 text-white vh-100 mh-100">
          <div className="row justify-content-around align-items-center text-center">
            <div className="col-6" >
 <h1 className="text-warning text-uppercase">
            My Team Manager App
          </h1>
            </div>
            <div className="col-6" >
            <a
            class="btn btn-outline-info"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            Add Team Member
          </a>
         </div>
          </div>
         
          <hr />
          <div
                className="offcanvas offcanvas-start bg-dark"
                tabindex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasLabel"
              >
                <div className="offcanvas-header">
                  <button
                    type="button"
                    className="btn-close text-reset text-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <AddMember setPeopleList={setPeopleList} />
                </div>
              </div>
          <div className="row"> 
            <div className="col-12">
              <PeopleList
                peopleList={peopleList}
                setPeopleList={setPeopleList}
              />
            </div>
          </div>
        </div>
      </>
    </DataProvider>
  );
};
