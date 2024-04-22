import { Descriptions } from "antd";
import { Navigate } from "react-router-dom";
import { useCurrentUserQuery } from "../../app/services/auth";
import { MyLayout } from "../../components/layout/myLayout";

export const CurrentUser = () => {
  const currentUser = useCurrentUserQuery();
  if (!currentUser.currentData) {
    return <Navigate to="/" />;
  }
 
  return (
    <MyLayout>
      <Descriptions title="Информация о пользователе" bordered>
        <Descriptions.Item label="Имя" span={3}>
          {`${currentUser.currentData.userName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Почта" span={3}>
          {`${currentUser.currentData.email}`}
        </Descriptions.Item>
        <Descriptions.Item label="Роль" span={3}>
          {`${currentUser.currentData.roles}`}
        </Descriptions.Item>
      </Descriptions>
    </MyLayout>
  );
};
