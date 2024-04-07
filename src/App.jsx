import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import MealPage from "./pages/MealPage/MealPage";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/meal/id" Component={MealPage} />
      </Routes>
      <MainPage />
    </>
  );
}

export default App;
