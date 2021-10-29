import axios from "axios"

axios.defaults.baseURL = "http://localhost:5000/"

export async function fetchPeopleById(peopleId) {
  return await axios.get(`people/${peopleId}`).then((res) => res.data.data)
}

export async function fetchPlanetsById(planetsId) {
  return await axios.get(`planets/${planetsId}`).then((res) => res.data.data)
}
