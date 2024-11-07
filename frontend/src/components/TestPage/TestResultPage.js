// TestResultPage.js
import React, { useState } from 'react';
import { Typography, Button } from 'antd';
import GivenAnswerSummaryPage from "./GivenAnswerSummaryPage";

const { Title, Paragraph } = Typography;

const TestResultPage = ({ testExecutionId, score }) => {
  const [submitted, setSubmitted] = useState(false);
  const handleContinue = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return <GivenAnswerSummaryPage testExecutionId={testExecutionId}   />;
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
      <Paragraph>Your test ID is: {testExecutionId}</Paragraph>
      <Paragraph>Your score is: {score}</Paragraph>

      <Button type="primary" onClick={handleContinue}>
        Continue
      </Button>
    </div>
 </div>
  );
};

export default TestResultPage;
