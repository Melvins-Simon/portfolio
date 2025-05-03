import React from "react";
import { Route, Routes } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import Notfound from "./pages/Notfound";
import Unauthorized from "./pages/Unauthorized";
import SignIn from "./components/Signin";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} exact element={<Portfolio />} />
      <Route path={"/admin"} element={<Dashboard />} />
      <Route path={"/signin"} element={<SignIn />} />
      <Route path={"/unauthorized"} element={<Unauthorized />} />
      <Route path={"*"} element={<Notfound />} />
    </Routes>
  );
};

export default App;
