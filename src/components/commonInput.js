import React, { useState, useEffect } from "react";
import { Input, Button, Form } from "antd";

// const { Title } = Typography;

const InputHandler = ({ onSubmit, editMode = false, user = {}, clearEditMode }) => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editMode && user) {
      form.setFieldsValue(user);
    }
  }, [editMode, user, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (!validateForm(values)) return;
      onSubmit(values);
      form.resetFields();
      clearEditMode();
    });
  };

  const validateForm = ({ name, email }) => {
    let isValid = true;
    let newErrors = {};

    if (!name || !name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!email || !email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validate(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validate = (email) => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
  };

  return (
    <div className="header-box">
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <div className="button-container" style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
            <Button type="primary" htmlType="submit">
              {editMode ? "Edit user" : "Add user"}
            </Button>
            {editMode && (
              <Button type="default" onClick={clearEditMode} style={{ marginLeft: 8 }}>
                Cancel
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputHandler;
