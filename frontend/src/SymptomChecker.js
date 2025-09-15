import React, { useState } from 'react';

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/symptoms/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: symptoms.split(',').map(s => s.trim()) })
    });
    setResult(await res.json());
  };

  return (
    <div className="card">
      <h2>Symptom Checker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symptoms}
          onChange={e => setSymptoms(e.target.value)}
          placeholder="Enter symptoms, comma separated"
        />
        <button type="submit">Check</button>
      </form>
      {result && (
        <div className="result">
          <strong>Possible Conditions:</strong> {result.response}
        </div>
      )}
    </div>
  );
}

export default SymptomChecker;
