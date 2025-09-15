import React, { useState } from 'react';

function BioDictionaryLookup() {
  const [inputText, setInputText] = useState('');
  const [minLength, setMinLength] = useState('100');
  const [maxLength, setMaxLength] = useState('1024');
  const [numBeams, setNumBeams] = useState('5');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    const payload = { inputs: inputText };
    if (minLength) payload.min_length = parseInt(minLength);
    if (maxLength) payload.max_length = parseInt(maxLength);
    if (numBeams) payload.num_beams = parseInt(numBeams);
    const res = await fetch('http://localhost:8000/biodictionary/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const responseJson = await res.json();
    setResult(responseJson);
  };

  return (
    <div className="card">
      <h2>BioDictionary Lookup</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <label style={{ fontWeight: 'bold' }}>
          Prompt:
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder='Enter prompt, e.g. "COVID-19 is"'
            required
            style={{ width: '300px', marginTop: '4px' }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          Min Length:
          <input
            type="number"
            value={minLength}
            onChange={e => setMinLength(e.target.value)}
            placeholder='min_length'
            style={{ width: '100px', marginTop: '4px' }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          Max Length:
          <input
            type="number"
            value={maxLength}
            onChange={e => setMaxLength(e.target.value)}
            placeholder='max_length'
            style={{ width: '100px', marginTop: '4px' }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          Num Beams:
          <input
            type="number"
            value={numBeams}
            onChange={e => setNumBeams(e.target.value)}
            placeholder='num_beams'
            style={{ width: '100px', marginTop: '4px' }}
          />
        </label>
        <button type="submit">Lookup</button>
      </form>
      {result && (
        <div className="result" style={{ marginTop: 20 }}>
          {result.error ? (
            <span style={{ color: 'red', fontWeight: 'bold' }}>Error: {result.error}</span>
          ) : (
            <span><strong>Result:</strong> {result.result}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default BioDictionaryLookup;