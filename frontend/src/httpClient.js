// httpClient.js
import axios from 'axios';



const PROD_BACK = 'http://74.225.136.45:5000'   //kanish ids


const httpClient = axios.create({
  baseURL: PROD_BACK  
});

// const httpClient = "fkjewhf";



export default httpClient;