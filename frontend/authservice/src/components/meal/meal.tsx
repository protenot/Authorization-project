import { useState, useEffect } from "react";
import {  MealType } from "../../types";
//import Link from "antd/es/typography/Link";
import styles from "./meal.module.css";
import { MySpin } from "../mySpin/mySpin";

export const Meal = (meal: MealType) => {
  const [imageURL, setImageUrl] = useState("");
  useEffect(() => {
    if(meal){
    fetch(
        `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=cea5775e8e6340d19ba2df6cd5863531&includeNutrition=false`,
      )
        .then((response) => response.json())
        .then((data) => {
          setImageUrl(data.image);
        })
        .catch(() => {
          console.log("error");
        });
    }
    }, [meal, meal.id]);
  
     if (!meal) {
        return <MySpin/>;
      } 

  return <article className={styles.meal}>
    <h1>{meal.title}</h1>
    <img src = {imageURL} alt = "recipe"/>
    <ul className="instructions">
        <li>Время приготовления: {meal.readyInMinutes}</li>
        <li>Количество порций: {meal.servings}</li>
      </ul>
      <a className="meal-link" href={meal.sourceUrl}>Посмотреть рецепт</a>

    </article>;
};
