import React, { useState } from 'react';
import { Form, Input, Button, Card, Space, Checkbox, message } from 'antd';
import axios from 'axios';

const CreateTestPage = () => {
  const [testName, setTestName] = useState('');
  const [testDescription, setTestDescription] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', answers: [] }]);
  };

  const updateQuestion = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const addAnswer = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers.push({ text: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

  const updateAnswer = (qIndex, aIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[aIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      // Step 1: Create the test
      const testResponse = await axios.post('http://localhost:1337/api/tests', {
        name: testName,
        description: testDescription,
      });

      const testId = testResponse.data.id;

      // Step 2: Create questions and link them
      for (let q of questions) {
        const questionResponse = await axios.post('http://localhost:1337/api/questions', {
          text: q.text,
        });
        const questionId = questionResponse.data.id;

        // Step 3: Create answers and link them
        for (let a of q.answers) {
          await axios.post('http://localhost:1337/api/answers', {
            text: a.text,
            score: a.isCorrect ? 1 : 0,
            question: questionId,
          });
        }

        // Step 4: Link question to test
        await axios.post('http://localhost:1337/api/questionintests', {
          test: testId,
          question: questionId,
        });
      }

      message.success('Test created successfully!');
    } catch (error) {
      console.error('Error creating test:', error);
      message.error('Failed to create test.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Card title="Create a New Test">
        <Form layout="vertical">
          <Form.Item label="Test Name">
            <Input value={testName} onChange={(e) => setTestName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Test Description">
            <Input.TextArea value={testDescription} onChange={(e) => setTestDescription(e.target.value)} />
          </Form.Item>
          
          <Button type="dashed" onClick={addQuestion}>Add Question</Button>
          
          {questions.map((q, qIndex) => (
            <Card key={qIndex} style={{ marginTop: 10 }}>
              <Input
                placeholder="Question Text"
                value={q.text}
                onChange={(e) => updateQuestion(qIndex, e.target.value)}
              />
              
              <Button type="dashed" onClick={() => addAnswer(qIndex)} style={{ marginTop: 10 }}>Add Answer</Button>
              
              {q.answers.map((a, aIndex) => (
                <Space key={aIndex} style={{ display: 'flex', marginTop: 10 }}>
                  <Input
                    placeholder="Answer Text"
                    value={a.text}
                    onChange={(e) => updateAnswer(qIndex, aIndex, 'text', e.target.value)}
                  />
                  <Checkbox
                    checked={a.isCorrect}
                    onChange={(e) => updateAnswer(qIndex, aIndex, 'isCorrect', e.target.checked)}
                  >Correct</Checkbox>
                </Space>
              ))}
            </Card>
          ))}
          
          <Button type="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>Create Test</Button>
        </Form>
      </Card>
    </div>
  );
};

export default CreateTestPage;
