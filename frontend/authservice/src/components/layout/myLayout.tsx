import React from "react";
import { Layout as AntLayout } from "antd";

import styles from "./layout.module.css";
import { Header } from "../header/header";

export type Props = {
  children: React.ReactNode;
};

export const MyLayout = ({ children }: Props) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntLayout.Content style={{ height: "100%" }}>
        {children}
      </AntLayout.Content>
    </div>
  );
};
