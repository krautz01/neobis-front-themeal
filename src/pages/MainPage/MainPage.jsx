import React, { useEffect, useState } from "react";
import "./MainPage.module.css";
import axios from "axios";

export default function MainPage(props) {
  const [meal, setMeal] = useState([] || localStorage.getItem("meals"));
  const src = "https://www.themealdb.com/api/json/v1/1/random.php";
  useEffect(() => {
    axios.get(src).then((data) => {
     // console.log(data.data.meals)
      setMeal(data.data.meals[0]);
      console.log(meal)
    });
  }, []);
  console.log("render")
  return (
    <div className="mainPage">
      <header>The Meal</header>
      <section className="Meal_of_the_Day">
        <div className="descripton">
          <div>{meal.strCategory}</div>
          <div>{meal.strArea}</div>
        </div>
        <img className="meal_photo" src={meal.strMealThumb}/>
      </section>
      <section className="Find_your_Meal">
        Find your Meal
        <input />
      </section>
    </div>
  );
}
