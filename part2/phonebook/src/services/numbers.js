// Services for communicating with backend
import axios from 'axios'
const baseUrl = '/api/persons'

// Retrieve phone numbers from DB server
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// Adding a new name
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

// Delete a name
const deleteService = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, create, deleteService, update}