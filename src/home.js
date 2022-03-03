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
    <DataProvider payload="Bienvenido" >
      <>
        <div className="container mt-5 text-white vh-100 mh-100">
          <h1 className="text-center text-warning text-uppercase">
            My Team Manager App
          </h1>
          <hr />
          <div className="row">
            <div className="col-md-4">
              <AddMember setPeopleList={setPeopleList} />
            </div>
            <div className="col-md-8">
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
