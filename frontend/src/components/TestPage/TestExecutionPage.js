import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Radio, Button, message } from 'antd';
import TestResultPage from "./TestResultPage";

const { Title, Paragraph } = Typography;
function TestExecutionPage({ test, questions, testExecutionId }) {
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [ totalScore, setTotalScore ] = useState()
  const [ipAddress, setIpAddress] = useState();
 const [code, setCode] = useState("");

  const fetchIpAddress = async () => {
    try {
      const response = await axios.get('https://test-manager64.ipify.org?format=json');
      setIpAddress(response.data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  const handleAnswerChange = (questionId, answerId, score) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find((ans) => ans.questionId === questionId);

      if (existingAnswer) {
        return prevAnswers.map((ans) =>
          ans.questionId === questionId ? { questionId, answerId, score } : ans
        );
      } else {
        return [...prevAnswers, { questionId, answerId, score }];
      }
    });
  };

  const getSelectedAnswer = (questionId) => {
    const answer = answers.find((ans) => ans.questionId === questionId);
    return answer ? answer.answerId : null;
  };

  const handleSubmit = async () => {
    try {
      const testCode = `TEST-${testExecutionId}`;

      // Estrai gli answerId da tutte le risposte
      const answerIds = answers.map(answer => answer.answerId);

      // Invia un'unica richiesta POST con tutte le risposte
      await axios.post('http://localhost:1337/test-manager/givenanswers', {
        test_execution: testExecutionId,
        answers: answerIds,
      });

      setTotalScore( answers.reduce((sum, answer) => sum + answer.score, 0));
      setCode(testCode);

      await axios.put(`http://localhost:1337/test-manager/testexecutions/${testExecutionId}`, {
         data:{
           score: answers.reduce( ( sum, answer ) => sum + answer.score, 0 ),
           ip: ipAddress,
           code: testCode,
         }
      });

      message.success('Test submitted successfully');
      setSubmitted(true);

    } catch (error) {
      console.error('Error submitting test:', error);
      message.error('Error submitting test');
    }
  };

  if (submitted) {
    return <TestResultPage testExecutionId={testExecutionId} score={totalScore} code={code}  />;

  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      textAlign:'left',
      height: '100vh',
    }}>
    <div>
      <Title>{test.name}</Title>
      <Paragraph>{test.description}</Paragraph>

      {questions.map((questionGroup) =>
        questionGroup.map((question) => (
          <div style={{ paddingBottom: '20px' }} key={question.id}>
            <Paragraph>{question.text}</Paragraph>
            <Radio.Group
              value={getSelectedAnswer(question.id)}
              onChange={(e) =>
                handleAnswerChange(
                  question.id,
                  e.target.value,
                  question.answers.find(a => a.id === e.target.value).score
                )
              }
            >
              {question.answers.map((answer) => (
                <Radio key={answer.id} value={answer.id}>
                  {answer.text}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        ))
      )}

      <Button type="primary" onClick={handleSubmit}>
        Invia Test
      </Button>
    </div>
 </div>
  );
}

export default TestExecutionPage;
