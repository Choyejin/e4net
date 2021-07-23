import axios from "axios";
let CARD_API_HOST = `http://localhost:18081`;

const client = axios.create({  
  baseURL: CARD_API_HOST,  
  responseType: "json"
});
client.defaults.headers.common["Authorization"] = "";

client.interceptors.request.use(
    function (config) {
        // 요청 성공 직전 호출됩니다.
        // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
        console.log("AXIOS INTERCEPTORS REQUEST : ", window.sessionStorage.getItem("token"));
        config.headers.Authorization = window.sessionStorage.getItem("token");
        return config;
    }, 
    function (error) {
        // 요청 에러 직전 호출됩니다.
        return Promise.reject(error);
    }
);

client.interceptors.response.use(
    function (response) {
        /*
            http status가 200인 경우
            응답 성공 직전 호출됩니다. 
            .then() 으로 이어집니다.
        */
        console.log("AXIOS INTERCEPTORS RESPONSE");
        return response;
    },
    function (error) {
        /*
            http status가 200이 아닌 경우
            응답 에러 직전 호출됩니다.
            .catch() 으로 이어집니다.    
        */
        return Promise.reject(error);
    }
);

export default client;