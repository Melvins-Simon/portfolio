import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const Globalstate = createContext(null);

function Globalcontext({ children }) {
  axios.defaults.withCredentials = true;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [banner, setbanner] = useState("");
  const [proj, setproj] = useState({
    title: "",
    link: "",
    description: "",
    tags: [],
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          import.meta.env.MODE === "production"
            ? "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net/api/check-auth"
            : "http://localhost:5000/api/check-auth"
        );
        setIsAuthenticated(true);
        toast.success(res.data.message || "Reconnected!");
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <Globalstate.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        banner,
        setbanner,
        proj,
        setproj,
      }}
    >
      {children}
    </Globalstate.Provider>
  );
}

export default Globalcontext;
