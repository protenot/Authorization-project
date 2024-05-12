import { Button, Result, Row } from "antd";
import { Link, useParams } from "react-router-dom";

const Statuses: Record<string, string> = {
  created: "Пользователь успешно создан",
  updated: "Пользователь успешно обновлен",
  deleted: "Пользователь успешно удален",
  restricted: "У вас нет прав для просмотра данного контента",
};

export const Status = () => {
  const { status } = useParams();
  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      {status === "restricted" ? (
        <Result
          status="warning"
          title={Statuses[status]}
          extra={
            <Button key="dashbord">
              <Link to="/"> Вернуться на главную</Link>
            </Button>
          }
        />
      ) : (
        <Result
          status={status ? "success" : 404}
          title={status ? Statuses[status] : "Не найдено"}
          extra={
            <Button key="dashbord">
              <Link to="/users"> Вернуться к просмотру пользователей</Link>
            </Button>
          }
        />
      )}
    </Row>
  );
};
