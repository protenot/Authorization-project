import { useEffect, useState } from "react";
import { Card, Form, Row, Space, Typography } from "antd";
import { MyLayout } from "../../components/layout/myLayout";
import { MyInput } from "../../components/myInput/myInput";
import { PasswordInput } from "../../components/passwordInput/passwordInput";
import { MyButton } from "../../components/myButton/myButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessages } from "../../utils/is-error-with-messages";
import { ErrorMessage } from "../../components/error-message/error";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user) {
      const userIsLoggedIn = true;
      setIsLoggedIn(userIsLoggedIn);
    }
  }, [user]);

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
