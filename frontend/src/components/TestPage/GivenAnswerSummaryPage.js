import React, { useEffect, useState, useRef } from 'react';
import { Table, Typography, Spin, message, Button } from 'antd';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Title } = Typography;

const GivenAnswerSummaryPage = ({ testExecutionId }) => {
  const [testExecutionData, setTestExecutionData] = useState({});
  const [loading, setLoading] = useState(true);
  const pdfRef = useRef(); // Reference for the PDF content

  const transformData = (data) => {
    const result = {
      testExecutionId: data.code,
      executionTime: data.execution_time,
      age: data.age,
      score: data.score,
      ip: data.ip,
      revisionDate: new Date(data.revision_date).toDateString(),
      note: data.note,
      givenAnswers: []
    };

    const answers = data.givenanswer ? data.givenanswer.answers : [];

    answers.forEach((answer) => {
      result.givenAnswers.push({
        id: answer.id,
        text: answer.text,
        correction: answer.correction,
        score: answer.score ? '1' : '0',
      });
    });

    return result;
  };

  useEffect(() => {
    const fetchTestExecutionData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/test-manager/testexecutions/${testExecutionId}`);
        const transformedData = transformData(response.data);
        setTestExecutionData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching test execution data:', error);
        message.error('Error loading test execution data');
        setLoading(false);
      }
    };

    fetchTestExecutionData();
  }, [testExecutionId]);

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'pt', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`test_execution_summary_${testExecutionId}.pdf`);
    });
  };

  const columns = [
    {
      title: 'Test Execution Code',
      dataIndex: 'testExecutionId',
      key: 'testExecutionId',
    },
    {
      title: 'Execution Time',
      dataIndex: 'executionTime',
      key: 'executionTime',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'Revision Date',
      dataIndex: 'revisionDate',
      key: 'revisionDate',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Given Answers',
      key: 'givenAnswers',
      render: (_, record) => (
        <ul>
          {record.givenAnswers.map((answer) => (
            <li key={answer.id}>
              <ul>
                <li>Text: {answer.text}</li>
                <li>Correction: {answer.correction}</li>
                <li>Score: {answer.score}</li>
              </ul>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div ref={pdfRef}>
      <Title level={2}>Test Execution Summary</Title>

      {/* PDF Content Area */}
      <div>
        <Table
          dataSource={[testExecutionData]}
          columns={columns}
          rowKey="testExecutionId"
        />
      </div>

      {/* Save PDF Button */}
      <Button type="primary" onClick={handleDownloadPDF} style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.3)'
      }}>
        Save as PDF
      </Button>
    </div>
  );
};

export default GivenAnswerSummaryPage;
