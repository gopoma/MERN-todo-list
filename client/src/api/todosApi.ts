import axios from 'axios'
import { config } from '../config'

const todosApi = axios.create({
  baseURL: config.apiURL
})

export default todosApi
