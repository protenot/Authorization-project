import { Card, Form, Space } from "antd";
import { MyButton } from "../myButton/myButton";
import { MyInput } from "../myInput/myInput";
import { PasswordInput } from "../passwordInput/passwordInput";
import { ErrorMessage } from "../error-message/error";
import { UserType } from "../../types";
type Props<T> = {
  onFinish: (value: T) => void;
  btnText: string;
  title: string;
  error: string | undefined;
  user?: T;
};

export const UserForm = ({
  onFinish,
  title,
  btnText,
  error,
  user,
}: Props<UserType>) => {
  return (
    <Card title={title} style={{ width: "50%" }}>
      <Form name="user-form" onFinish={onFinish} initialValues={user}>
        <MyInput type="text" name="userName" placeholder="Имя пользователя" />
        <MyInput type="text" name="email" placeholder="Почта" />
        <PasswordInput name="password" placeholder="Пароль" />
        <MyInput type="text" name="roles" placeholder="Роль" />

        <Space>
          <ErrorMessage message={error} />
          <MyButton htmlType="submit" >{btnText}</MyButton>
        </Space>
      </Form>
    </Card>
  );
};
