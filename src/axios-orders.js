import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-25d2c.firebaseio.com/'
});

export default instance;