import React from 'react';
import './App.css';
import SymptomChecker from './SymptomChecker';
import ImagingAnalysis from './ImagingAnalysis';
import BioDictionaryLookup from './BioDictionaryLookup';

function App() {
  return (
    <div className="app-container">
      <h1>Smart Health Assistant</h1>
      <SymptomChecker />
      <ImagingAnalysis />
      <BioDictionaryLookup />
    </div>
  );
}

export default App;
