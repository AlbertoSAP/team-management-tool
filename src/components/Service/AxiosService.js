import axios from "axios";

const apiUrl =
  "https://reactapi-23e4f-default-rtdb.europe-west1.firebasedatabase.app";
const headers = {
  "Contenet-Type": "application/json",
};

export const AddTeamMember = async (person) => {
  const body = JSON.stringify(person);
  await axios
    .post(`${apiUrl}/person.json`, body, headers)
    .then((res) => {
    })
    .catch((err) => {
      console.error(err);
    });
};

export const FetchMember = async(id)=>{
  const {data} = await axios.get(`${apiUrl}/person/${id}/.json`);
  const {name, lastname,location,position} = data;
  return { id,name, lastname,location,position};
}

export const FetchTeamMembers = async () => {
  const { data } = await axios.get(`${apiUrl}/person.json`);
  return Object.keys(data).map((key) => {
    const {name, lastname,location,position} = data[key];
    return {id: key, name, lastname, location, position};
  });
};

export const UpdateMember = async (person,id) => {
  const body = JSON.stringify(person);
  await axios
    .put(`${apiUrl}/person/${id}/.json`, body, headers)
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.error(e);
    });
};

export const DeleteTeamMember = async (id) => {
  const { data } = await axios.delete(`${apiUrl}/person/${id}.json`);
  return data;
};
