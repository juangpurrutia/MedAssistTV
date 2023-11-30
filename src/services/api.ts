import axios from 'axios';


const api = axios.create({
  baseURL: 'http://192.168.1.25:8180/api/v2',// aqui vem o link da API BACK-END
  headers: {
    api_key: "b4083757db5be1286b8f69044ed7b085ff24093a",
    'Cache-Control': 'no-cache', 'max-age': 30 
  }
});

export default api;