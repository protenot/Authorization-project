import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Row, Space, Typography } from "antd";
import { MyLayout } from "../../components/layout/myLayout";
import { MyInput } from "../../components/myInput/myInput";
import { PasswordInput } from "../../components/passwordInput/passwordInput";
import { MyButton } from "../../components/myButton/myButton";
import { Paths } from "../../paths";
import { selectUser } from "../../features/auth/authSlice";
import { useRegistrationMutation } from "../../app/services/auth";
import { UserType } from "../../types";
import { isErrorWithMessages } from "../../utils/is-error-with-messages";
import { ErrorMessage } from "../../components/error-message/error";

type RegisterData = Omit<UserType, "_id"> & { confirmPassword: string };

export const Registration = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegistrationMutation();

  useEffect(() => {
    if (user) {
      navigate("/auth/login");
    }
  }, [navigate, user]);

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      //navigate("/auth/login");
    } catch (err) {
      const mayBeError = isErrorWithMessages(err);
      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <MyLayout>
      <Row align={"middle"} justify={"center"}>
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <MyInput type="text;" name="userName" placeholder="Введите имя" />
            <MyInput type="emai;" name="email" placeholder="Введите email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput
              name="confirmedPassword"
              placeholder="Повторите пароль"
            />

            <MyButton type="primary" htmlType="submit">
              Войти
            </MyButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже зарегистрованы? <Link to={Paths.login}>Входите</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </MyLayout>
  );
};
