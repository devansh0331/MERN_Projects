import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorWorld from "./errorWorld/ErrorWorld.jsx";
import { UserContextProvider } from "../UseContext.jsx";
import Auth from "./budChi/Auth/Auth.jsx";

function Main() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route exact path="/errorWorld" element={<ErrorWorld />} />
          <Route exact path="/" element={<Auth />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default Main;
