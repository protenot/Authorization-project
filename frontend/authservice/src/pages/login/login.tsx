import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Row, Space, Typography } from "antd";
import { MyLayout } from "../../components/layout/myLayout";
import { MyInput } from "../../components/myInput/myInput";
import { PasswordInput } from "../../components/passwordInput/passwordInput";
import { MyButton } from "../../components/myButton/myButton";
import { Paths } from "../../paths";
import {UserData} from "../../types";
import {  useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessages } from "../../utils/is-error-with-messages";
import { ErrorMessage } from "../../components/error-message/error";


export const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const user = useSelector(selectUser);
  const tokenInLS = localStorage.getItem("token");
  useEffect(() => {
    if (tokenInLS) {
      const userIsLoggedIn = true;
      setIsLoggedIn(userIsLoggedIn);
    }
  }, [tokenInLS]);

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate("/");
      setIsLoggedIn(true);
    } catch (err) {
      const mayBeError = isErrorWithMessages(err);
      if (mayBeError) {
        console.log(loginUserResult.error);
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };
  return (
    <MyLayout>
      <Row align={"middle"} justify={"center"}>
        <Card title="Входите" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <MyInput type="emai;" name="email" placeholder="Введите email" />
            <PasswordInput name="password" placeholder="Введите пароль" />

            <MyButton type="primary" htmlType="submit" disabled={isLoggedIn}>
              Войти
            </MyButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта?{" "}
              <Link to={Paths.registration}>Зарегистрируйтесь</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </MyLayout>
  );
};
