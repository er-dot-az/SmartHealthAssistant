import React, { useState } from 'react';

function RiskAssessment() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bp, setBp] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vitals = { blood_pressure: bp };
    const res = await fetch('http://localhost:8000/risk/assess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: Number(age), gender, vitals })
    });
    setResult(await res.json());
  };

  return (
    <div className="card">
      <h2>Risk Assessment</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
        <input type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Gender" />
        <input type="text" value={bp} onChange={e => setBp(e.target.value)} placeholder="Blood Pressure" />
        <button type="submit">Assess</button>
      </form>
      {result && (
        <div className="result">
          <strong>Risk Score:</strong> {result.risk_score}<br />
          <strong>Recommendation:</strong> {result.recommendation}
        </div>
      )}
    </div>
  );
}

export default RiskAssessment;
