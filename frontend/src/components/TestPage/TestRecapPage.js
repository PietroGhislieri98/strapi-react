import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TestRecapPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get('http://localhost:1337/test-manager/tests');
      setTests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tests:', error);
      message.error('Failed to load tests.');
      setLoading(false);
    }
  };

  const deleteTest = async (id) => {
    try {
      // Step 1: Fetch the test details to get related questions
      const testResponse = await axios.get(`http://localhost:1337/test-manager/tests/${id}`);

      const testData = testResponse.data;
      if (!testData || !testData.questionintests) {
        message.warning("Test not found or has no questions.");
      }

      // Step 2: Extract question IDs
      const questionIds = testData.questionintests.flatMap(qt => qt.questions.flatMap(question => question.id));

      const answerIds = testData.questionintests.flatMap(qt => qt.questions).flatMap(q => q.answers).map(a => a.id);

      // Step 4: Delete all answers
       for (let answerId of answerIds) {
           await axios.delete(`http://localhost:1337/test-manager/answers/${answerId}`);
       }

      // Step 5: Delete all questions
      for (let questionId of questionIds) {
        await axios.delete(`http://localhost:1337/test-manager/questions/${questionId}`);
      }

      // Step 6: Delete all `questionintests` entries related to this test
      for (let questionTest of testData.questionintests) {
           await axios.delete(`http://localhost:1337/test-manager/questionintests/${questionTest.id}`);
        }

        await axios.delete(`http://localhost:1337/test-manager/tests/${id}`);

      message.success("Test and all related data deleted successfully!");
      fetchTests(); // Refresh test list
    } catch (error) {
      console.error("Error deleting test and related data:", error);
      message.error("Failed to delete test.");
    }
  };


  const columns = [
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          {/*<Button type="primary" onClick={() => navigate(`/test-details/${record.id}`)}>Details</Button>*/}
          <Popconfirm
            title="Sicuro di voler eliminare"
            onConfirm={() => deleteTest(record.id)}
            okText="Sì"
            cancelText="No"
          >
            <Button type="primary">Elimina</Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: 'Test Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Test Recap</h1>
      <Button type="primary" onClick={() => navigate('/test_create')} style={{ marginBottom: 20 }}>
        Crea un nuovo test
      </Button>
      <Table
        columns={columns}
        dataSource={tests}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default TestRecapPage;
