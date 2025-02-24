// TestExecutionRevisionForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import GivenAnswerSummaryPage from "./GivenAnswerSummaryPage";

const TestExecutionRevisionForm = () => {
  const [executionCode, setExecutionCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const handleFormSubmit = async () => {
    if (!executionCode) {
      message.error('Please enter a valid Test Execution ID');
      return;
    }

    setLoading(true);
    try {
      const revisionDate = new Date().toISOString();
      setExecutionCode (executionCode.substring(5))
      await axios.put(`http://localhost:1337/test-manager/testexecutions/${executionCode.substring(5)}`, {
          data: {
            revision_date: revisionDate,
          }
      });

      message.success('Test Execution revision date updated successfully');

    } catch (error) {
      console.error('Error fetching Test Execution:', error);
      message.error('Error updating Test Execution');
    } finally {
      setLoading(false);
      setSubmitted(true);

    }
  };

  if (submitted) {
    return <GivenAnswerSummaryPage testExecutionId={executionCode}   />;
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
      <h3>Inserisci il codice del test per vedere il resoconto</h3>
      <Form layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item label="Codice">
          <Input
            value={executionCode}
            onChange={(e) => setExecutionCode(e.target.value)}
            placeholder="Codice"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
</div>
  );
};

export default TestExecutionRevisionForm;
