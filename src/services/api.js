import axios from 'axios'

const api = axios.create({
	// baseURL: 'http://10.21.0.141:5000'
	baseURL: 'https://autune.herokuapp.com'
})

export default api