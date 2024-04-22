import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetOneUserQuery,
} from "../../app/services/users";
import { MySpin } from "../../components/mySpin/mySpin";
import { MyLayout } from "../../components/layout/myLayout";
import { Descriptions, Divider, Modal, Space } from "antd";
import { MyButton } from "../../components/myButton/myButton";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ErrorMessage } from "../../components/error-message/error";
import { Paths } from "../../paths";
import { isErrorWithMessages } from "../../utils/is-error-with-messages";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

export const UserPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetOneUserQuery(params.id || "");
  const [deleteUser] = useDeleteUserMutation();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }

    if (!user?.roles.includes("ADMIN")) {
      navigate(`${Paths.status}/restricted`);
    }
  }, [navigate, user]);

  if (isLoading) {
    return <MySpin />;
  }
  if (!data) {
    return <Navigate to="/" />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    const userId = data._id.toString();
    hideModal();
    try {
      await deleteUser(userId).unwrap();
      navigate(`${Paths.status}/deleted`);
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
      <Descriptions title="Информация о пользователе" bordered>
        <Descriptions.Item label="Имя" span={3}>
          {`${data.userName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Почта" span={3}>
          {`${data.email}`}
        </Descriptions.Item>
        <Descriptions.Item label="Пароль" span={3}>
          {`${data.password}`}
        </Descriptions.Item>
        <Descriptions.Item label="Роль" span={3}>
          {`${data.roles}`}
        </Descriptions.Item>
      </Descriptions>
      {
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`/users/edit/${data._id}`}>
              <MyButton shape="round" type="default" icon={<EditOutlined />}>
                Редактировать
              </MyButton>
            </Link>
            <MyButton
              shape="round"
              danger
              type="default"
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Удалить
            </MyButton>
          </Space>
        </>
      }
      <ErrorMessage message={error}></ErrorMessage>

      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить пользователя?
      </Modal>
    </MyLayout>
  );
};
