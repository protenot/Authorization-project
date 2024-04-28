import { MealType } from "../../types";
export const fetchData = async (meal:MealType):Promise<MealType|void>=>{
try {
const response =
  await fetch(
        `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=cea5775e8e6340d19ba2df6cd5863531&includeNutrition=false`,
      )
        .then((response) => response.json())
        const data = await response.json();
        return data as MealType;
} catch (error) {
    console.log('error', error)
   
}

}