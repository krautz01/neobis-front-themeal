import React, { useEffect, useState } from "react";
import "./MainPage.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MainPage(props) {
  const src = "https://www.themealdb.com/api/json/v1/1/random.php";
  const [meal, setMeal] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    axios.get(src).then((data) => {
      // console.log(data.data.meals)
      setMeal(data.data.meals[0]);
      console.log(meal);
    });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      if (response.data.meals) {
        setSearchResult(response.data.meals);
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      console.error("Error fetching meal:", error);
    }
  };
  return (
    <div className="mainPage">
      <>
        <header>The Meal</header>
        <section className="Meal_of_the_Day">
          <div className="descripton">
            <Link to={`/meal/${item.idMeal}`} key={item.idMeal}>
              <h2 className="title">{item.strMeal}</h2>
            </Link>
            <div>{meal.strCategory}</div>
            <div>{meal.strArea}</div>
          </div>
          <img
            className="meal_photo"
            src={meal.strMealThumb}
            alt={item.strMeal}
          />
        </section>
        <form className="Find_your_Meal" onSubmit={handleSearch}>
          <h2>Find your Meal</h2>
          <input
            type="text"
            placeholder="Find your meal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </>
      {searchResult.map((item) => (
        <div className="home" key={item.idMeal}>
          <section className="random-meal">
            <div className="meal-info">
              <Link to={`/meal/${item.idMeal}`} key={item.idMeal}>
                <h2 className="title">{item.strMeal}</h2>
              </Link>
              <p>
                {item.strCategory} | {item.strArea}
              </p>
            </div>
            <div className="meal-img">
              <img src={item.strMealThumb} alt={item.strMeal} />
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
