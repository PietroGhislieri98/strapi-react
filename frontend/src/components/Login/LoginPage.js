import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: username,
        password: password,
      });

      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      console.log(localStorage);

      message.success(`Benevenuto, ${response.data.user.username}!`);
      navigate('/dashboard');
    } catch (error) {
      message.error('Invalid email or password.');
      console.error('Login Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Login" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Username - Email">
            <Input value={username} onChange={(e) => handleInputChange(e, setUsername)} />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password value={password} onChange={(e) => handleInputChange(e, setPassword)} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;


