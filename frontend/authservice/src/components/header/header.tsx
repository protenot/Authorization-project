import { Layout, Space, Typography } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HomeOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { MyButton } from "../myButton/myButton";
import { Paths } from "../../paths";
import { logout } from "../../features/auth/authSlice";
import styles from "./header.module.css";

export const Header = () => {
  const currentPath = useLocation().pathname;
  const tokenInLS = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogOutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <Layout.Header className={styles.header}>
      {currentPath === "/" ? (
        <Space>
          <Link to={Paths.home}>
            <MyButton type="link" icon={<HomeOutlined />}>
              <Typography.Title level={5}>
                Вы находитесь на главной странице
              </Typography.Title>
            </MyButton>
          </Link>
        </Space>
      ) : (
        <Space>
          <Link to={Paths.home}>
            <MyButton type="link" icon={<HomeOutlined />}>
              <Typography.Title level={5}>
                Вернуться на главную
              </Typography.Title>
            </MyButton>
          </Link>
        </Space>
      )}
      {tokenInLS ? (
        <MyButton
          type="primary"
          onClick={onLogOutClick}
          icon={<LoginOutlined></LoginOutlined>}
        >
          Выйти
        </MyButton>
      ) : (
        <>
          <Space>
            <Link to={Paths.registration}>
              <MyButton type="link" icon={<UserOutlined />}>
                Зарегистрироваться
              </MyButton>
            </Link>
          </Space>
          <Space>
            <Link to={Paths.login}>
              <MyButton type="link" icon={<LoginOutlined />}>
                Войти
              </MyButton>
            </Link>
          </Space>
        </>
      )}
    </Layout.Header>
  );
};
