import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MainPage() {
  const src = "https://www.themealdb.com/api/json/v1/1/random.php";
  const [meal, setMeal] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    axios.get(src).then((data) => {
      // console.log(data.data.meals)
      setMeal(data.data.meals[0]);
      //console.log(meal);
    });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm != "") {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        if (response.data.meals) {
          setSearchResult(response.data.meals);
        } else {
          setSearchResult([]);
          alert("Meal not founded");
          e.target.value = "";
        }
      } catch (error) {
        console.error("Error fetching meal:", error);
      }
    } else {
      alert("Type meal");
    }
  };
  return (
    <div className={styles.mainPage}>
      <>
        <section className={styles.meal_of_the_day}>
          <div className={styles.descripton}>
            <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal}>
              <h1 className={styles.title}>{meal.strMeal}</h1>
            </Link>
            <div className={styles.category}>
              {meal.strCategory} | {meal.strArea}
            </div>
          </div>
          <img
            className={styles.meal_img}
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
        </section>
        <form className="find_your_Meal" onSubmit={handleSearch}>
          <h2>Find your Meal</h2>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Find your meal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className={styles.search_button}>
            Search
          </button>
        </form>
      </>
      {searchResult.map((item) => (
        <section className={styles.target_meal_section} key={item.idMeal}>
          <img
            src={item.strMealThumb}
            alt={item.strMeal}
            className={styles.meal_img}
          />
          <div className={styles.meal_info_link}>
            <Link to={`/meal/${item.idMeal}`} key={item.idMeal}>
              <h2 className={styles.title}>{item.strMeal}</h2>
            </Link>
            <div className={styles.category}>
              {item.strCategory} | {item.strArea}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
