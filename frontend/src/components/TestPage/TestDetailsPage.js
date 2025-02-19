import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Space, Spin, message, Row } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
// @ts-ignore
import axios from 'axios';

const TestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestDetails();
  }, []);

  const fetchTestDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/test-manager/tests/${id}`);
      setTest(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching test details:', error);
      message.error('Failed to load test details.');
      setLoading(false);
    }
  };

  const formattedQuestions = test?.questionintests?.flatMap((qt) => {
    const questionId = qt.questions.flatMap(q => q.id)[0]; // Extract the question ID
    const questionText = qt.questions.flatMap(q => q.text)[0]; // Extract the question text

    return [
      {
        key: `question-${questionId}`,
        question: questionText,
        answer: null,
        correct: null,
        isQuestion: true, // Mark this as a question row
      },
      ...qt.questions.flatMap(q =>
        q.answers.map(a => ({
          key: `answer-${a.id}`,
          question: '', // Keep empty to prevent duplication
          answer: a.text,
          correct: a.score > 0 ? "✅" : "❌",
          isQuestion: false, // Mark this as an answer row
        }))
      ),
    ];
  }) || [];

  const questionColumns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      render: (text, record) => (
        record.isQuestion ? <strong>{text}</strong> : <span style={{ paddingLeft: 20 }}>{text}</span>
      ),
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
    },
    {
      title: 'Correct',
      dataIndex: 'correct',
      key: 'correct',
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Card title={test ? `Test: ${test.name}` : "Loading..."} extra={<Button onClick={() => navigate(-1)}>Back</Button>}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            columns={questionColumns}
            dataSource={formattedQuestions}
            rowKey="key"
            bordered
          />
        )}
      </Card>
    </div>
  );

};

export default TestDetailsPage;
