'use client';

import React, { useState, useCallback } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Switch,
  Radio,
  Upload,
  Space,
  Typography,
  Popconfirm,
  message,
  InputNumber,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { ColumnType } from 'antd/es/table/interface';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface User {
  key: string;
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  role: string;
  isActive: boolean;
  salary: number;
  avatar?: string;
}

// Mock initial data
const initialData: User[] = [
  {
    key: '1',
    name: 'John Brown',
    email: 'john.brown@example.com',
    birthDate: '1990-05-15',
    gender: 'male',
    role: 'admin',
    isActive: true,
    salary: 75000,
  },
  {
    key: '2',
    name: 'Jim Green',
    email: 'jim.green@example.com',
    birthDate: '1985-11-22',
    gender: 'male',
    role: 'developer',
    isActive: false,
    salary: 65000,
  },
  {
    key: '3',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    birthDate: '1995-02-10',
    gender: 'female',
    role: 'designer',
    isActive: true,
    salary: 60000,
  },
];

export default function UsersPage() {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>(initialData);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchText, setSearchText] = useState('');

  // Field types and options
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Manager', value: 'manager' },
  ];

  const debouncedSearch = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    return (query: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!query.trim()) {
          setFilteredUsers(users);
          return;
        }
        const filtered = users.filter((user) =>
          Object.values(user).some((val) =>
            val?.toString().toLowerCase().includes(query.toLowerCase()),
          ),
        );
        setFilteredUsers(filtered);
      }, 300);
    };
  }, [users])();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  // Modal handlers
  const showModal = (user: User | null) => {
    setEditingUser(user);
    form.setFieldsValue(
      user
        ? {
            ...user,
            birthDate: user.birthDate ? dayjs(user.birthDate) : null,
          }
        : {
            name: '',
            email: '',
            birthDate: null,
            gender: 'male',
            role: undefined,
            isActive: true,
            salary: 50000,
          },
    );
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        birthDate: values.birthDate
          ? values.birthDate.format('YYYY-MM-DD')
          : null,
      };

      if (editingUser) {
        const updatedUsers = users.map((user) =>
          user.key === editingUser.key ? { ...user, ...formattedValues } : user,
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        message.success('User updated successfully!');
      } else {
        const newUser: User = {
          key: Date.now().toString(),
          ...formattedValues,
        };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        message.success('User created successfully!');
      }
      handleCancel();
    });
  };

  const handleDelete = (key: string) => {
    const updatedUsers = users.filter((user) => user.key !== key);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    message.success('User deleted successfully!');
  };

  // Columns configuration
  const columns: ColumnType<User>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: roleOptions.map((role) => ({
        text: role.label,
        value: role.value,
      })),
      onFilter: (value, record) => record.role === value,
      render: (role) => roleOptions.find((r) => r.value === role)?.label,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Text type={isActive ? 'success' : 'danger'}>
          {isActive ? 'Active' : 'Inactive'}
        </Text>
      ),
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      sorter: (a, b) => a.salary - b.salary,
      render: (salary) => `$${salary.toLocaleString()}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Users Management
        </Title>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
            style={{ width: 240 }}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal(null)}
            size="large"
          >
            Create User
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="key"
        scroll={{ x: true }}
      />

      <Modal
        title={editingUser ? 'Edit User' : 'Create User'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingUser ? 'Update' : 'Create'}
        width={700}
        styles={{
          body: {
            maxHeight: '66vh',
            overflowY: 'auto',
            paddingRight: '8px',
          },
        }}
      >
        <Form form={form} layout="vertical" name="userForm">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: 'Please input the name!' },
              { min: 3, message: 'Name must be at least 3 characters' },
            ]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input the email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="birthDate"
            label="Date of Birth"
            rules={[
              { required: true, message: 'Please select birth date!' },
              {
                validator: (_, value) => {
                  if (value && value > dayjs().subtract(18, 'years')) {
                    return Promise.reject('User must be at least 18 years old');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={(current) =>
                current && current > dayjs().endOf('day')
              }
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Radio.Group options={genderOptions} optionType="button" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select role!' }]}
          >
            <Select placeholder="Select a role" allowClear>
              {roleOptions.map((role) => (
                <Option key={role.value} value={role.value}>
                  {role.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="isActive"
            label="Active Status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>

          <Form.Item
            name="salary"
            label="Salary ($)"
            rules={[
              { required: true, message: 'Please input salary!' },
              {
                type: 'number',
                min: 30000,
                message: 'Salary must be at least $30,000',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => +value!.replace(/\$\s?|(,*)/g, '') as 30000}
              min={30000}
              step={5000}
            />
          </Form.Item>

          <Form.Item
            name="avatar"
            label="Profile Picture"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
