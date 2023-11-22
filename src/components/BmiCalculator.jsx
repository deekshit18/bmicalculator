import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const BmiCalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const calculateBMI = () => {
    if (!/^\d+(\.\d+)?$/.test(height) || !/^\d+(\.\d+)?$/.test(weight)) {
      setErrorMessage('Please enter valid height and weight values.');
      setBmi(null);
      return;
    }

    const heightMeters = parseFloat(height) / 100;
    const weightKg = parseFloat(weight);
    const bmiValue = (weightKg / (heightMeters * heightMeters)).toFixed(2);
    setBmi(bmiValue);
    setErrorMessage('');
  };

  const getBmiCategory = () => {
    if (bmi >= 18.5 && bmi <= 24.9) {
      return 'Normal';
    } else if (bmi < 18.5) {
      return 'Low';
    } else {
      return 'High';
    }
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setErrorMessage('');
  };

  return (
    <Container className="mt-5 text-center">
      <h2>BMI Calculator</h2>

      <Form>
        <Form.Group>
          <Form.Label className='mb-2'>Height (in cm)</Form.Label>
          <Form.Control
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className='mt-3 mb-2'>Weight (in kg)</Form.Label>
          <Form.Control
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" className='mt-4' onClick={calculateBMI}>
          Calculate BMI
        </Button>
        <Button variant="secondary" className='mt-4 ms-3' onClick={handleReset}>
          Reset
        </Button>
      </Form>

      {errorMessage && <Alert variant="danger" className='mt-4'>{errorMessage}</Alert>}

      {bmi !== null && (
        <div>
          <h3 className='mt-4'>Your BMI is: {bmi}</h3>
          <p>BMI Category: {getBmiCategory()}</p>
        </div>
      )}
    </Container>
  );
};

export default BmiCalculator;
