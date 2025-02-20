import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:5000/api/v1`,
});

api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      const loginType = localStorage.getItem("loginType");
  
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        config.headers["Auth"] = loginType;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
      console.log("Response Interceptor Running...");
      return response; 
  },
  async (error) => {
      console.log("Response Interceptor Error:", error.response?.status);


      if (error.response?.status === 400) {

        const loginType = localStorage.getItem("loginType");
        const userId = localStorage.getItem("userType");

        const refreshToken = localStorage.getItem("refreshToken");


          console.log(" Token Expired, Refreshing...");
          console.log("from refreshtoken ",refreshToken);
          

          if (!refreshToken) {
              alert("Session expired. Please log in again.");
              window.location.href = "/";
              return Promise.reject("No refresh token, redirecting to login.");
          }

          try {
            if (loginType === "google") {
              const response = await axios.post(
                "http://localhost:5000/api/v1/getGoogleNewAccessToken",
                {
                    headers: {
                      Authorization: `Bearer ${refreshToken}`
                    },
                  }
              );
    
              const { accessToken } = response.data.response;
              localStorage.setItem("accessToken", accessToken);
    
              error.config.headers["Authorization"] = `Bearer ${accessToken}`;
              error.config.headers["Auth"] =`Bearer ${loginType}`;
              return api(error.config);
           
            } else {
                
                const response = await axios.post(
                    "http://localhost:5000/api/v1/getNewAccessToken?id="+userId,
                    {
                        headers: {
                          Authorization: `Bearer ${refreshToken}`
                        },
                      }
                  );
        
                  const { accessToken } = response.data.response;
                  localStorage.setItem("accessToken", accessToken);

                  error.config.headers["Authorization"] = `Bearer ${accessToken}`;
                  error.config.headers["Auth"] =`Bearer ${loginType}`;
                  return api(error.config);
               
            }
          } catch (error) {
            console.log(error);
            alert("Session expired. Please log in again.");
              window.location.href = "/";
              return Promise.reject(error);
          }
      }

      return Promise.reject(error);
  }
);


export default api;