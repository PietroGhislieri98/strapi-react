// TestResultPage.js
import React, { useState } from 'react';
import { Typography, Button } from 'antd';
import TestExecutionRevisionForm from "./TestExecutionRevisionForm";

const { Title, Paragraph } = Typography;

const TestResultPage = ({ testExecutionId, score, code }) => {
  const [submitted, setSubmitted] = useState(false);
  const handleContinue = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return <TestExecutionRevisionForm />;
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
      <Title>Test Completed</Title>
      <Paragraph>Codice Test: {code}</Paragraph>
      <Paragraph>Punteggio: {score}</Paragraph>

      <Button type="primary" onClick={handleContinue}>
        Visualizza Dettaglia
      </Button>
    </div>
 </div>
  );
};

export default TestResultPage;
