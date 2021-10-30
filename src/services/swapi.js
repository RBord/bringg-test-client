import axios from "axios"

axios.defaults.baseURL = "https://bringg-test-server.herokuapp.com/"

export async function fetchPeopleById(peopleId, params) {
  return await axios
    .get(`people/${peopleId}${params}`)
    .then((res) => res.data.data)
}

export async function fetchPlanetsById(planetsId, params) {
  return await axios
    .get(`planets/${planetsId}${params}`)
    .then((res) => res.data.data)
}
