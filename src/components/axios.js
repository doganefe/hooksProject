import axios from 'axios'

const instance = axios.create({
  baseURL : 'https://react-yazi-yorum.herokuapp.com'
})


export default instance