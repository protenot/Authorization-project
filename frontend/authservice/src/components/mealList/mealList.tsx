import { Meal } from "../meal/meal";
import { MealResponseType } from "../../types";

type Props = {
    mealData: MealResponseType;
  };

export const MealList = ({ mealData }: Props) => {
  const { nutrients } = mealData;
  return (
    <main>
      <section className="nutrients">
        <h1> Состав </h1>
        <ul>
          <li> Количество калорий:{nutrients.calories.toFixed(0)}</li>
          <li>Количество углеводов: {nutrients.carbohydrates.toFixed(0)}</li>
          <li>Количество жиров:{nutrients.fat.toFixed(0)}</li>
          <li>Количество белков:{nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>
      <section className="meals">
    {mealData.meals.map((meal)=>{
        return <Meal key={meal.id} {...meal} />
    })
        
    }

      </section>
    </main>
  );
};
