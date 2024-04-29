import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { MyLayout } from "../../components/layout/myLayout";
import { MyButton } from "../../components/myButton/myButton";
import { useGetAllUsersQuery } from "../../app/services/users";
import { Paths } from "../../paths";
import { selectUser } from "../../features/auth/authSlice";

const columns = [
  {
    title: "Имя пользователя",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Почта",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Роль",
    dataIndex: "roles",
    key: "roles",
  },
];
export const Users = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { data, isLoading } = useGetAllUsersQuery();
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }

    if (!user?.roles.includes("ADMIN")) {
      navigate(`${Paths.status}/restricted`);
    }
  }, [navigate, user]);

  return (
    <MyLayout>
      <MyButton
        type="primary"
        onClick={() => navigate("/users/add")}
        icon={<PlayCircleOutlined />}
      >
        Добавить
      </MyButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record._id.toString()}
        onRow={(user) => ({
          onClick: () => navigate(`${Paths.allUsers}/${user._id}`),
        })}
      />
    </MyLayout>
  );
};
