import React from "react";

export default function Ingredients({ meal }) {
  console.log(meal);
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }
  return (
    <ul>
      {ingredients.map((item, index) => (
        <li key={index}>
          {item.ingredient} - <b>{item.measure}</b>
        </li>
      ))}
    </ul>
  );
}
