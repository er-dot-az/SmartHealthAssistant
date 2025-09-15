import React, { useState } from 'react';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('http://localhost:8000/imaging/analyze', {
      method: 'POST',
      body: formData
    });
    setResult(await res.json());
  };

  return (
    <div style={{marginBottom: 20}}>
      <h2>Image Analysis</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" disabled={!file}>Analyze</button>
      </form>
      {result && <div><strong>Image Result:</strong> {result.image_result}</div>}
    </div>
  );
}

export default ImageUpload;
