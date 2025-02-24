// @ts-nocheck
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Typography, Radio, message, Card } from 'antd';
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
          execution_time: new Date().toISOString(),
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
    }}>
      <Card style={{ width: 600, textAlign: 'center' }}>
      <Title>Start Test</Title>
      <Paragraph>Aggiungi età e sesso per comincare</Paragraph>

      <Form layout="vertical"
            name="basic"
            autoComplete="off"
            style={{ alignItems: 'center' }}
      >
        <Form.Item label="Età" >
          <Input value={age} onChange={(e) => setAge(e.target.value)} />
        </Form.Item>
        <Form.Item label="Sesso">
          <Radio.Group onChange={(e) => setSex(e.target.value)} value={sex}>
            <Radio value="Maschio">Maschio</Radio>
            <Radio value="Femmina">Femmina</Radio>
            <Radio value="Altro">Altro</Radio>
            <Radio value="Non specificato">Perferisco non specidifcare</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleStartTest}>Start Test</Button>
        </Form.Item>
      </Form>
    </Card>
    </div>
  );
}

export default TestPage;
