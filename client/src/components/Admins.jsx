import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { Globalstate } from "../context/Globalcontext";

const AdminAccessControl = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Globalstate);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [pageLoad, setpageLoad] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    (async () => {
      setpageLoad(false);
      try {
        setpageLoad(true);
        const res = await axios.get(
          "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net/api/check-auth"
        );
        setRegisteredUsers(res.data.users);
        setpageLoad(false);
        setIsAuthenticated(true);
        toast.success(res.data.message || "Reconnected!");
      } catch (error) {
        setpageLoad(false);
        setIsAuthenticated(false);
        toast.error(error.response.data.message || "Unauthorized");
      }
    })();
  }, []);

  const handleLogin = async (e) => {
    setisLoading(false);
    e.preventDefault();

    try {
      setisLoading(true);
      const res = await axios.post(
        "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net/api/signin",
        {
          email,
          password,
        }
      );
      setisLoading(false);
      toast.success(res.data.message || "Login success!");
      setRegisteredUsers(res.data.users);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
    } catch (error) {
      setisLoading(false);
      toast.error(
        error.response.data.message || "Login failed!",
        error.message
      );
    }
  };

  const Handlelogout = async () => {
    setpageLoad(false);
    try {
      setpageLoad(true);
      const res = await axios.post(
        "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net/api/signout"
      );
      setpageLoad(false);
      setIsAuthenticated(false);
      toast.success(res.data.message || "Logged out!");
    } catch (error) {
      setpageLoad(false);
      setIsAuthenticated(true);
      toast.error(error.response.data.message || "Error logging out");
    }
  };

  const handleRegisterUser = async (e) => {
    setisLoading(false);
    e.preventDefault();

    try {
      setisLoading(true);
      const res = await axios.post(
        "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net/api/add-admin",
        {
          email: newUserEmail,
          password: newUserPassword,
        }
      );
      setisLoading(false);
      toast.success(res.data.message || "User addition success!");
      setIsAuthenticated(true);
      setNewUserEmail("");
      setNewUserPassword("");

      setRegisteredUsers(res.data.users);
    } catch (error) {
      setisLoading(false);

      toast.error(
        error.response.data.message || "Approval failed!",
        error.message
      );
    }
  };
  const Handledelete = async (e, id) => {
    setisLoading(false);
    e.preventDefault();
    try {
      setisLoading(true);
      const res = await axios.post(
        "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net/api/remove-admin",
        {
          id,
        }
      );
      setisLoading(false);
      toast.success(res.data.message || "User deletion success!");
      setIsAuthenticated(true);
      setRegisteredUsers(res.data.users);
    } catch (error) {
      setisLoading(false);
      toast.error(
        error.response.data.message || "Deletion failed!",
        error.message
      );
    }
  };

  if (pageLoad) return <Loader />;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
        <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl w-full max-w-md border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Admin Dashboard Login
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-purple-100 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-purple-100 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200 cursor-pointer shadow-lg"
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2">
                  <span>Loading...</span>
                  <span className="h-4 w-4 border-l-2 border-t-2 border-blue-50 rounded-full animate-spin" />
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4 flex justify-center items-center">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Admin Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Registered Users List */}
            <div className="bg-white/20 rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                Authorized Users
              </h3>

              {registeredUsers.length <= 1 ? (
                <p className="text-purple-100">No users registered yet</p>
              ) : (
                <ul className="space-y-2">
                  {registeredUsers.slice(1).map((user, index) => (
                    <li
                      key={index}
                      className="text-white flex justify-between items-center"
                    >
                      <span className="text-purple-100">{user.email}</span>
                      <button
                        onClick={(e) => Handledelete(e, user._id)}
                        className="text-red-300 hover:text-red-100 cursor-pointer"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Register New User */}
            <div className="bg-white/20 rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                Register New User
              </h3>
              <form onSubmit={handleRegisterUser}>
                <div className="mb-4">
                  <label
                    htmlFor="newUserEmail"
                    className="block text-purple-100 text-sm font-medium mb-2"
                  >
                    User Email
                  </label>
                  <input
                    type="email"
                    id="newUserEmail"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                    placeholder="user@example.com"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="newUserPassword"
                    className="block text-purple-100 text-sm font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="newUserPassword"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200 cursor-pointer shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center gap-2">
                      <span>Loading...</span>
                      <span className="h-4 w-4 border-l-2 border-t-2 border-blue-50 rounded-full animate-spin" />
                    </div>
                  ) : (
                    "Register User"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 text-center flex justify-between">
            <button
              onClick={Handlelogout}
              className="text-green-50 hover:text-green-500 ease-in-out duration-300 cursor-pointer"
            >
              Logout
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-green-50 hover:text-green-500 ease-in-out duration-300 cursor-pointer"
            >
              Hero
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="text-green-50 hover:text-green-500 ease-in-out duration-300 cursor-pointer"
            >
              Dash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccessControl;
