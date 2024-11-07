// @ts-nocheck
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Typography, Radio, message } from 'antd';
import TestExecutionPage from "./TestExecutionPage";

const { Title, Paragraph } = Typography;

function TestPage({strapi}) {
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [testExecutionId, setTestExecutionId] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchRandomTest() {
      try {
        const data = await axios.get('http://localhost:1337/test-manager/tests?populate[questionintests][populate][questions][populate][answers][populate][0]=answer');
        const tests = data.data;
        const randomIndex = Math.floor(Math.random() * tests.length);
        const randomTest = tests[randomIndex];

        const testResponse = await axios.get(`http://localhost:1337/test-manager/tests/${randomTest.id}`);
        const testData = testResponse.data;
        setTest(testData);
        setQuestions(testData.questionintests.map(qt => qt.questions));
      } catch (error) {
        console.error('Error fetching random test:', error);
      }
    }

    fetchRandomTest();
  }, []);

  const handleStartTest = async () => {
    if (!age || !sex) {
      message.error('Please provide your age and sex.');
      return;
    }



    try {

      const sexResponse = await axios.post('http://localhost:1337/test-manager/sexes', {
          name: sex
      });

      const response = await axios.post('http://localhost:1337/test-manager/testexecutions', {
          execution_time: new Date().toISOString().split('T')[1].split('Z')[0],
          age: age,
          sex: sexResponse.data.id,
          test: test.id,
          score: 0
      });

      setTestExecutionId(response.data.id);
      message.success('Test Execution created successfully');
      setSubmitted(true);
    } catch (error) {
      console.error('Error creating Test Execution:', error);
      message.error('Error creating Test Execution');
    }
  };

  if (submitted) {
    return <TestExecutionPage test={test} questions={questions} testExecutionId={testExecutionId} />;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      textAlign:'left',
      height: '100vh',
      paddingBottom: '10px'
    }}>
    <div>
      <Title>Start Test</Title>
      <Paragraph>Please enter your age and sex to begin.</Paragraph>

      <Form layout="vertical"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off">
        <Form.Item label="Age">
          <Input value={age} onChange={(e) => setAge(e.target.value)} />
        </Form.Item>
        <Form.Item label="Sex">
          <Radio.Group onChange={(e) => setSex(e.target.value)} value={sex}>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleStartTest}>Start Test</Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
}

export default TestPage;
