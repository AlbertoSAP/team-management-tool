import React, { createContext, useState } from "react";
export const DataContext = createContext();

function DataProvider({ children }) {
  const [selectedMemberValues, setSelectedMemberValues] = useState({
  id:"",
  name: "",
  lastname: "",
  position: "",
  location: ""});

  return (
    <DataContext.Provider
      value={{
        selectedMemberValues,
        setSelectedMemberValues,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export default DataProvider;
