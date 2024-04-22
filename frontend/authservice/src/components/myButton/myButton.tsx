import React from "react";
import { Button, Form } from "antd";

type ButtonProps = {
  children: React.ReactNode;
  htmlType?: "button" | "submit" | undefined;
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
  onClick?: () => void;
  danger?: boolean;
  loading?: boolean;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: React.ReactNode;
  ghost?: boolean;
  disabled?: boolean;
};

export const MyButton = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  shape,
  icon,
  ghost,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <Form.Item>
      <Button
        className="btn"
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        ghost={ghost}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </Form.Item>
  );
};
