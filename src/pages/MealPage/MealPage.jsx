import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./MealPage.module.css";
import axios from "axios";
import Ingredients from "../../components/Ingredients";
import Button from "../../components/Button";

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
    <>
      {meal && (
        <div className={styles.mealPage}>
          <section className={styles.meal_info_section}>
            <div className={styles.meal_ingradients}>
              <h1 className={styles.title}>{meal.strMeal}</h1>
              <div className={styles.meal_category_and_land}>
                {meal.strCategory} | {meal.strArea}
              </div>
              <Ingredients meal={meal} />
              <a href="https://itchief.ru/html-and-css/media-queries">gg54455353gggg</a>
            </div>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className={styles.meal_img}
            />
          </section>
          <section className={styles.meal_instruction}>
            <h2>Instruction</h2>
            <p>{meal.strInstructions}</p>
            <Button meal={meal} />
          </section>
        </div>
      )}
    </>
  );
}
