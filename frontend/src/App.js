import './App.css';
import SymptomChecker from './SymptomChecker';
import BioDictionaryLookup from './BioDictionaryLookup';
import GenericImaging from './GenericImaging';

function App() {
  return (
    <div className="app-container">
      <h1>Smart Health Assistant</h1>
      <SymptomChecker />
      <BioDictionaryLookup />
      <GenericImaging />
    </div>
  );
}

export default App;
