import { useNavigate } from "react-router-dom";

import axios from "axios";

export const useSignin = () => {

  const navigate = useNavigate();

  const url = "http://localhost:8080/api/v2/users/login";

  const signin = async (email, password) => {
    try {
      const response = await axios.post(url, {
        usernameOrEmail: email,
        password: password,
      });

      if (response.data.user) {
        const { usernameOrEmail, password, ...jsonData } = response.data.user;

        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(jsonData));
          dispatch({ type: "LOGIN", payload: jsonData });
          if (jsonData.roles !== "admin") {
            navigate("/");
          } else {
            navigate("/dashboard");
          }
        }
      } else {
        console.error("Response data is undefined");
        throw new Error("No such account");
      }
    } catch (error) {
    }
  };

  return { signin };
};
