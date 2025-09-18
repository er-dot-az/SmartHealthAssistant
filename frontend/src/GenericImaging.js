import React, { useState } from 'react';

function GenericImaging() {
  const [imageFile, setImageFile] = useState(null);
  const [diseaseLabels, setDiseaseLabels] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleLabelsChange = (e) => {
    setDiseaseLabels(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('disease_labels', JSON.stringify(diseaseLabels.split(',').map(l => l.trim())));
    try {
      const res = await fetch('http://localhost:8000/genericImaging/analyse', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Generic Imaging Analysis</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Attach Image:
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </label>
        <br />
        <label>
          Disease Labels (comma separated):
          <input
            type="text"
            value={diseaseLabels}
            onChange={handleLabelsChange}
            placeholder="e.g. pneumonia, tuberculosis"
            required
          />
        </label>
        <br />
        <button type="submit">Analyze</button>
      </form>
      {loading && <div>Analyzing...</div>}
      {error && <div style={{color:'red'}}>Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Analysis Result:</strong>
          <div><b>Most likely label:</b> {result.max_label}</div>
          <div><b>Score:</b> {result.max_score}</div>
          <ul>
            {result.scores && result.scores.map((s, idx) => (
              <li key={idx}>{s.label}: {s.similarity.toFixed(3)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GenericImaging;
