import { Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";

export const MySpin = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#adebbf",
        }}
      >
        <Spin tip="Loading" size="large" />
      </Content>
    </Layout>
  );
};
