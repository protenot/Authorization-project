import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditUserMutation,
  useGetOneUserQuery,
} from "../../app/services/users";
import { MySpin } from "../../components/mySpin/mySpin";
import { MyLayout } from "../../components/layout/myLayout";
import { Row } from "antd";
import { UserForm } from "../../components/userForm/userForm";
import { UserType } from "../../../../../backend/authServer/src/models/User";
import { Paths } from "../../paths";
import { isErrorWithMessages } from "../../utils/is-error-with-messages";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

export const EditUser = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetOneUserQuery(params.id || "");
  const [updateUser] = useEditUserMutation();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }

    if (!user?.roles.includes("ADMIN")) {
      navigate(`${Paths.status}/restricted`);
    }
  }, [navigate, user]);

  const handleEditUser = async (user: UserType) => {
    try {
      console.log("user", user);
      console.log("params.id", params.id);
      const editedUser = {
        ...data,
        ...user,
      };
      await updateUser(editedUser).unwrap();
      navigate(`${Paths.status}/updated`);
    } catch (err) {
      const mayBeError = isErrorWithMessages(err);
      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Ошибочка!");
      }
    }
  };

  if (isLoading || !data) {
    return <MySpin />;
  }

  return (
    <MyLayout>
      <Row align="middle" justify="center">
        <UserForm
          title="Редактировать пользователя"
          btnText="Редактировать"
          error={error}
          user={data}
          onFinish={handleEditUser}
        ></UserForm>
      </Row>
    </MyLayout>
  );
};
