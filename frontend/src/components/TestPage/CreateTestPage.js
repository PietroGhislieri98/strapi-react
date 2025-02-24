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
      const testResponse = await axios.post('http://localhost:1337/test-manager/tests', {
        name: testName,
        description: testDescription,
      });

      const testId = testResponse.data.id;

      // Step 2: Create questions and link them
      for (let q of questions) {
        const questionResponse = await axios.post('http://localhost:1337/test-manager/questions', {
          text: q.text,
        });
        const questionId = questionResponse.data.id;

        // Step 3: Create answers and link them
        for (let a of q.answers) {
          await axios.post('http://localhost:1337/test-manager/answers', {
            text: a.text,
            score: a.isCorrect ? 1 : 0,
            questions: [questionId],
          });
        }

        // Step 4: Link question to test
        const questionintests = await axios.post('http://localhost:1337/test-manager/questionintests', {
          data: {
            tests: [{ id: testId }],  // Ensure IDs are inside objects
            questions: [{ id: questionId }]
          }
        });

        console.log(questionintests)
      }

      message.success('Test creato con successo!');
    } catch (error) {
      console.error('Errore nella creazione del test:', error);
      message.error('Errore nella creazione del test.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Card title="Crea un nuovo test">
        <Form layout="vertical">
          <Form.Item label="Nome">
            <Input value={testName} onChange={(e) => setTestName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Descrizione">
            <Input.TextArea value={testDescription} onChange={(e) => setTestDescription(e.target.value)} />
          </Form.Item>

          <Button type="dashed" onClick={addQuestion}>Aggiungi Domanda</Button>

          {questions.map((q, qIndex) => (
            <Card key={qIndex} style={{ marginTop: 10 }}>
              <Input
                placeholder="Domande"
                value={q.text}
                onChange={(e) => updateQuestion(qIndex, e.target.value)}
              />

              <Button type="dashed" onClick={() => addAnswer(qIndex)} style={{ marginTop: 10 }}>Aggiungi Risposta</Button>

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
                  >Corretto</Checkbox>
                </Space>
              ))}
            </Card>
          ))}

          <Button type="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>Crea Test</Button>
        </Form>
      </Card>
    </div>
  );
};

export default CreateTestPage;
