import React from "react";
import { Table, Typography, Button, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { deleteUser } from "../actions/userActions";

const { Text } = Typography;
const SimpleTable = ({ dataSource = [], onEdit }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" style={{ marginLeft: 8.6 }}>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="user-table.1">
      <Table
        dataSource={dataSource.map(item => ({ ...item, key: item.id }))}
        columns={columns}
        locale={{ emptyText: <Text type="secondary">No user data</Text> }}
      />
    </div>
  );
};
export default SimpleTable;
