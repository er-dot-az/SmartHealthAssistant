import React, { useState } from 'react';

function ImagingAnalysis() {
  const [frontalFile, setFrontalFile] = useState(null);
  const [lateralFile, setLateralFile] = useState(null);
  const [indication, setIndication] = useState('');
  const [technique, setTechnique] = useState('');
  const [comparison, setComparison] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('frontal_image', frontalFile);
    formData.append('lateral_image', lateralFile);
    formData.append('indication', indication);
    formData.append('technique', technique);
    formData.append('comparison', comparison);

    const res = await fetch('http://localhost:8000/imaging/analyze', {
      method: 'POST',
      body: formData
    });
    const responseJson = await res.json();
    console.log('API response:', responseJson); // Debug: log response to browser console
    setResult(responseJson);
  };

  // Helper to render the result nicely
  const renderResult = () => {
    if (!result) return null;
    if (result.error) {
      return (
        <div style={{ color: 'red', fontWeight: 'bold' }}>
          Error: {result.error}
        </div>
      );
    }
    // Try to parse result.result as JSON
    if (typeof result.result === 'string') {
      try {
        const parsed = JSON.parse(result.result);
        // If parsed is an object, show summary fields if present
        if (parsed.summary) {
          return (
            <div>
              <h4>Summary:</h4>
              <pre>{parsed.summary}</pre>
              <h4>Full Result:</h4>
              <pre>{JSON.stringify(parsed, null, 2)}</pre>
            </div>
          );
        }
        return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
      } catch {
        // Not JSON, show as plain text
        return <pre>{result.result}</pre>;
      }
    }
    // If result.result is not a string, show as JSON
    return <pre>{JSON.stringify(result.result, null, 2)}</pre>;
  };

  return (
    <div>
      <h2>Imaging Analysis</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Frontal Image:</label>
          <input type="file" accept="image/*" onChange={e => setFrontalFile(e.target.files[0])} required />
        </div>
        <div>
          <label>Lateral Image:</label>
          <input type="file" accept="image/*" onChange={e => setLateralFile(e.target.files[0])} required />
        </div>
        <div>
          <input type="text" value={indication} onChange={e => setIndication(e.target.value)} placeholder="Indication" required />
        </div>
        <div>
          <input type="text" value={technique} onChange={e => setTechnique(e.target.value)} placeholder="Technique" required />
        </div>
        <div>
          <input type="text" value={comparison} onChange={e => setComparison(e.target.value)} placeholder="Comparison" required />
        </div>
        <button type="submit">Analyze</button>
      </form>
      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result:</h3>
          {renderResult()}
        </div>
      )}
    </div>
  );
}

export default ImagingAnalysis;