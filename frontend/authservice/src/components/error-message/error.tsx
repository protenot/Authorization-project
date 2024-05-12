import { Alert } from "antd";

type ErrorType = {
  message?: string;
};

export const ErrorMessage = ({ message }: ErrorType) => {
  if (!message) {
    return null;
  }
  return <Alert message={message} type="error" />;
};
