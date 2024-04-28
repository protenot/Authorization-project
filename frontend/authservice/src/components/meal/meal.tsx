import { useState, useEffect } from "react";
//import { fetchData } from "../../app/services/fetchData";
import {  MealType } from "../../types";
import Link from "antd/es/typography/Link";

export const Meal = (meal: MealType) => {
  const [imageURL, setImageUrl] = useState("");
  useEffect(() => {
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
    }, [meal.id]);
  
  

  return <article>
    <h1>{meal.title}</h1>
    <img src = {imageURL} alt = "recipe"/>
    <ul className="instructions">
        <li>Preparation time: {meal.readyInMinutes}</li>
        <li>Number of serving:{meal.servings}</li>
      </ul>
      <Link href={meal.sourceUrl} />

    </article>;
};
