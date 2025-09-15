import React, { useState } from 'react';

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [context, setContext] = useState('');
  const [result, setResult] = useState(null);
  const [selectedLinks, setSelectedLinks] = useState([]);

  const healthcareLinks = [
    { label: 'Mayo Clinic', url: 'https://www.mayoclinic.org' },
    { label: 'MedlinePlus', url: 'https://medlineplus.gov' },
    { label: 'WebMD', url: 'https://www.webmd.com' },
    { label: 'NHS', url: 'https://www.nhs.uk' },
    { label: 'CDC', url: 'https://www.cdc.gov' },
    { label: 'WHO', url: 'https://www.who.int' },
  ];

  const handleLinkChange = (url, checked) => {
    let updatedLinks;
    if (checked) {
      updatedLinks = [...selectedLinks, url];
    } else {
      updatedLinks = selectedLinks.filter(link => link !== url);
    }
    setSelectedLinks(updatedLinks);
    // Update context textarea with selected links and any manual text
    const manualText = context
      .split('\n')
      .filter(line => !healthcareLinks.some(link => line.includes(link.url)))
      .join('\n');
    setContext((manualText ? manualText + '\n' : '') + updatedLinks.join('\n'));
  };

  const handleContextChange = (e) => {
    setContext(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/symptoms/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        symptoms: symptoms.split(',').map(s => s.trim()),
        context: context
      })
    });
    setResult(await res.json());
  };

  return (
    <div className="card">
      <h2>Symptom Checker</h2>
      <div style={{ marginBottom: '12px', fontSize: '0.95em', color: '#444' }}>
        <strong>Tip:</strong> For best results, ground your medical context using reputable sources. Select links below to add them to your context, or paste summaries/quotes manually:
        <div style={{ margin: '8px 0 0 16px', padding: 0 }}>
          {healthcareLinks.map(link => (
            <div key={link.url} style={{ marginBottom: '4px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedLinks.includes(link.url)}
                  onChange={e => handleLinkChange(link.url, e.target.checked)}
                />
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '6px' }}>{link.label}</a>
              </label>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px' }}>
          You can also paste a summary, quote, or additional URLs in the context box below.
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symptoms}
          onChange={e => setSymptoms(e.target.value)}
          placeholder="Enter symptoms, comma separated"
        />
        <br />
        <textarea
          value={context}
          onChange={handleContextChange}
          placeholder="Paste or type relevant medical context, summary, or URL (optional)"
          rows={4}
          style={{ width: '100%', marginTop: '8px' }}
        />
        <br />
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
