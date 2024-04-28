import { Form, Input } from "antd";

type InputType = {
  name: string;
  placeholder: string;
  type?: string;
};

export const MyInput = ({ name, placeholder, type = "text" }: InputType) => {
  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: "Обязательное поле" }]}
      shouldUpdate={true}
    >
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};
