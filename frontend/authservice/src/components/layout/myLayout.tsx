import React from "react";
import { Layout as AntLayout } from "antd";
import { Header } from "../header/header";
import styles from "./layout.module.css";


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
