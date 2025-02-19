import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Naviga verso" style={{ width: 400, textAlign: 'center' }}>
        <Button block type="primary" onClick={() => navigate('/test')} style={{ marginBottom: 10 }}>
          Inizia un test
        </Button>
        <Button block type="primary" onClick={() => navigate('/test_results')} style={{ marginBottom: 10 }}>
          Vedi i risultati dei test
        </Button>
        <Button block type="primary" onClick={() => navigate('/test_create')} style={{ marginBottom: 10 }}>
          Crea un Test
        </Button>
        <Button block type="primary" onClick={() => navigate('/test_recap')} style={{ marginBottom: 10 }}>
          Vedi tutti i test creati
        </Button>
        <Button block type="default" danger onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default DashboardPage;
