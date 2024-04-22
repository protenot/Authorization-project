import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Paths } from "./paths";
import { Login } from "./pages/login/login";
import { Registration } from "./pages/registration/registration";
import { AuthComponent } from "./features/auth/authComponent";
import { Users } from "./pages/users/users";
import { UserAdd } from "./pages/userAdd/userAdd";
import { Status } from "./pages/status/status";
import { UserPage } from "./pages/userPage/userPage";
import { EditUser } from "./pages/editUser/editUser";
import { CurrentUser } from "./pages/currentUser/currentUser";
import { Home } from "./pages/home/home";
import { Page404 } from "./pages/404/404";

const container = document.getElementById("root")!;
const root = createRoot(container);
const Router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Home />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.registration,
    element: <Registration />,
  },
  {
    path: Paths.currentUser,
    element: <CurrentUser />,
  },
  {
    path: Paths.users,
    element: <Users />,
  },
  {
    path: Paths.allUsers,
    element: <Users />,
  },
  {
    path: Paths.userAdd,
    element: <UserAdd />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.allUsers}/:id`,
    element: <UserPage />,
  },
  {
    path: `${Paths.userEdit}/:id`,
    element: <EditUser />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#00b96b",
            borderRadius: 10,

            // Alias Token
            colorBgContainer: "#f6ffed",
          },
        }}
      >
        <AuthComponent>
          <RouterProvider router={Router} />
        </AuthComponent>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
