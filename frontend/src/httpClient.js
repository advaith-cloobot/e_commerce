// httpClient.js
import axios from 'axios';



const PROD_BACK = 'http://20.204.183.209:5000'   //kanish ids


const httpClient = axios.create({
  baseURL: PROD_BACK  
});

// const httpClient = "fkjewhf";



export default httpClient;