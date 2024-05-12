import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row } from "antd";
import { MyLayout } from "../../components/layout/myLayout";
import { UserForm } from "../../components/userForm/userForm";
import { selectUser } from "../../features/auth/authSlice";
import { useAddUserMutation } from "../../app/services/users";
import { UserType } from "../../types";
import { isErrorWithMessages } from "../../utils/is-error-with-messages";
import { Paths } from "../../paths";

export const UserAdd = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addUser] = useAddUserMutation();

  useEffect(() => {
    if (!user) {
      navigate("auth/login");
    }
    if (!user?.roles.includes("ADMIN")) {
      navigate(`${Paths.status}/restricted`);
    }
  }, [navigate, user]);

  const handleAddUser = async (data: UserType) => {
    try {
      await addUser(data).unwrap();
      navigate(`${Paths.status}/created`);
    } catch (err) {
      const mayBeError = isErrorWithMessages(err);
      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Ошибочка!");
      }
    }
  };
  return (
    <MyLayout>
      <Row align="middle" justify="center" style={{width:'100%'}} >
        <UserForm
          title="Добавить пользователя"
          btnText="Добавить"
          onFinish={handleAddUser}
          error={error}
        />
      </Row>
    </MyLayout>
  );
};
