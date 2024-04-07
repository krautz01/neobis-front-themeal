import React, { useEffect, useState } from "react";
import styles from "./MealPage.module.css";
import { useParams } from "react-router";
import axios from "axios";
import Ingredients from "../../components/Ingredients";

export default function MealPage() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        if (response.data.meals && response.data.meals.length > 0) {
          setMeal(response.data.meals[0]);
        } else {
          setMeal(null);
        }
      } catch (error) {
        console.log("Error fetching meal details:", error.message);
      }
    };

    fetchMeal();
  }, [mealId]);

  return (
    <div className={styles.mealPage}>
      {meal && (
        <div className={styles.meal_details_home}>
          <section className={styles.random_meal}>
            <div className={styles.meal_info}>
              <h2 className={styles.title}>{meal.strMeal}</h2>
              <p>
                {meal.strCategory} | {meal.strArea}
              </p>
              <Ingredients meal={meal}/>
            </div>
            <div className={styles.meal_img}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            </div>
          </section>
          <section className={styles.add_info}>
            <h1>Instruction</h1>
            <p>{meal.strInstructions}</p>
            <h2>YouTube Tutorial:</h2>
            <p className={styles.meal_link_video}>
              <a href={meal.strYoutube}>Watch Now</a>
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

