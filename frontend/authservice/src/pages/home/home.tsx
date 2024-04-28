import { useSelector } from "react-redux";
import { MyLayout } from "../../components/layout/myLayout";
import { selectUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, ChangeEvent } from "react";
import { Input, Space } from "antd";
import { MyButton } from "../../components/myButton/myButton";
import { MealList } from "../../components/mealList/mealList";
import { MealResponseType } from "../../types";
import styles from "./home.module.css";

export const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [mealData, setMealData] = useState<MealResponseType | null>(null);
  const [calories, setCalories] = useState(2000);
  console.log("calories", calories);
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  });

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=cea5775e8e6340d19ba2df6cd5863531&timeFrame=day&targetCalories=${calories}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    console.log("value", calories);
    setCalories(value);
  }

  return (
    <MyLayout>
      <div className={styles.home}>
        <h2> Введите количество калорий</h2>
        <div className="home">
          <section className="control">
            <Input
              className="input-meal"
              type="number"
              name="calories"
              placeholder={"Калории(2000 по умолчанию)"}
              style={{ width: "50%", textAlign: "center", margin: "0 auto" }}
              onChange={handleChange}
            />
            <Space>
              <MyButton onClick={getMealData}>Получить план питания</MyButton>
            </Space>
          </section>
          {mealData && <MealList mealData={mealData} />}
        </div>
      </div>
    </MyLayout>
  );
};
