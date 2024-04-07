import React from "react";
import styles from "./MealPage.module.css";

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

  const printIngredientsWithMeasure = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients.map((item, index) => (
      <li key={index}>
        {item.ingredient} - {item.measure}
      </li>
    ));
  };

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
              <h3>Ingredients:</h3>
              <ul>{printIngredientsWithMeasure(meal)}</ul>
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
