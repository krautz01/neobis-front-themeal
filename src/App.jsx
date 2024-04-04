import React, { useState } from "react";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  const [meals, setMeals] = useState(
    [] || localStorage.getItem("meals", meals)
  );
  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
