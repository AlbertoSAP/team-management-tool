import axios from "axios";

const apiUrl =
  "https://reactapi-23e4f-default-rtdb.europe-west1.firebasedatabase.app";
const headers = {
  "Contenet-Type": "application/json",
};

export const PostPerson = async (person) => {
  const body = JSON.stringify(person);
  await axios
    .post(`${apiUrl}/person.json`, body, headers)
    .then((r) => {
    })
    .catch((e) => {
      console.error(e);
    });
};

export const FetchTeamMembers = async () => {
  const { data } = await axios.get(`${apiUrl}/person.json`);
  return Object.keys(data).map((key) => {
    const {name, lastname,location,position} = data[key];
    return {id: key, name, lastname, location, position};
  });
};
