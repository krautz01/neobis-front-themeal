import React from "react";
import styles from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className="mainPage">
      <header>The Meal</header>
      <section className="Meal_of_the_Day">
        <div className="descripton"></div>
        <img className="meal_photo" />
      </section>
      <section className="Find_your_Meal">
        Find your Meal
        <input />
      </section>
    </div>
  );
}
