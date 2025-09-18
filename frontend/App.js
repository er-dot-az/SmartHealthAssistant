import React, { useState } from 'react';
import GenericImaging from './src/GenericImaging';

function App() {
  const [option, setOption] = useState('symptoms');
  return (
    <div style={{ padding: 32 }}>
      <h1>Smart Health Assistant</h1>
      <div>
        <button onClick={() => setOption('symptoms')}>Symptoms</button>
        <button onClick={() => setOption('image')}>Image Analysis</button>
        <button onClick={() => setOption('bio')}>BioDictionary Lookup</button>
        <button onClick={() => setOption('genericimaging')}>Generic Imaging</button>
      </div>
      <div style={{ marginTop: 32 }}>
        {option === 'symptoms' && <SymptomsForm />}
        {option === 'image' && <ImageAnalysisForm />}
        {option === 'bio' && <BioDictionaryForm />}
        {option === 'genericimaging' && <GenericImaging />}
      </div>
    </div>
  );
}

function SymptomsForm() {
  const [symptoms, setSymptoms] = useState('');
  return (
    <form>
      <label>Enter symptoms (comma separated):</label><br />
      <input value={symptoms} onChange={e => setSymptoms(e.target.value)} style={{ width: 300 }} />
      <button type="submit">Submit</button>
    </form>
  );
}

function ImageAnalysisForm() {
  const [image, setImage] = useState(null);
  return (
    <form>
      <label>Upload Image:</label><br />
      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
      <button type="submit">Analyze</button>
    </form>
  );
}

function BioDictionaryForm() {
  const [prompt, setPrompt] = useState('');
  const [minLength, setMinLength] = useState(10);
  const [maxLength, setMaxLength] = useState(50);
  const [numBeams, setNumBeams] = useState(5);
  return (
    <form>
      <label>Prompt:</label><br />
      <input value={prompt} onChange={e => setPrompt(e.target.value)} style={{ width: 300 }} /><br />
      <label>Min Length:</label>
      <input type="number" value={minLength} onChange={e => setMinLength(Number(e.target.value))} /><br />
      <label>Max Length:</label>
      <input type="number" value={maxLength} onChange={e => setMaxLength(Number(e.target.value))} /><br />
      <label>Num Beams:</label>
      <input type="number" value={numBeams} onChange={e => setNumBeams(Number(e.target.value))} /><br />
      <button type="submit">Lookup</button>
    </form>
  );
}

export default App;
import React, { useState } from 'react';import React, { useState } from 'react';



function App() {function App() {

  const [option, setOption] = useState('symptoms');  const [option, setOption] = useState('symptoms');



  return (  return (

    <div style={{ padding: 32 }}>    <div style={{ padding: 32 }}>

      <h1>Smart Health Assistant</h1>      <h1>Smart Health Assistant</h1>

      <div>      <div>

        <button onClick={() => setOption('symptoms')}>Symptoms</button>        <button onClick={() => setOption('symptoms')}>Symptoms</button>

        <button onClick={() => setOption('image')}>Image Analysis</button>        <button onClick={() => setOption('image')}>Image Analysis</button>

        <button onClick={() => setOption('bio')}>BioDictionary Lookup</button>        <button onClick={() => setOption('bio')}>BioDictionary Lookup</button>

      </div>      </div>

      <div style={{ marginTop: 32 }}>      <div style={{ marginTop: 32 }}>

        {option === 'symptoms' && <SymptomsForm />}        {option === 'symptoms' && <SymptomsForm />}

        {option === 'image' && <ImageAnalysisForm />}        {option === 'image' && <ImageAnalysisForm />}

        {option === 'bio' && <BioDictionaryForm />}        {option === 'bio' && <BioDictionaryForm />}

      </div>      </div>

    </div>    </div>

  );  );

}}



function SymptomsForm() {function SymptomsForm() {

  const [symptoms, setSymptoms] = useState('');  const [symptoms, setSymptoms] = useState('');

  return (  // ...existing code...

    <form>  return (

      <label>Enter symptoms (comma separated):</label><br />    <form>

      <input value={symptoms} onChange={e => setSymptoms(e.target.value)} style={{ width: 300 }} />      <label>Enter symptoms (comma separated):</label><br />

      <button type="submit">Submit</button>      <input value={symptoms} onChange={e => setSymptoms(e.target.value)} style={{ width: 300 }} />

    </form>      <button type="submit">Submit</button>

  );    </form>

}  );

}

function ImageAnalysisForm() {

  const [image, setImage] = useState(null);function ImageAnalysisForm() {

  return (  const [image, setImage] = useState(null);

    <form>  // ...existing code...

      <label>Upload Image:</label><br />  return (

      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />    <form>

      <button type="submit">Analyze</button>      <label>Upload Image:</label><br />

    </form>      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />

  );      <button type="submit">Analyze</button>

}    </form>

  );

function BioDictionaryForm() {}

  const [prompt, setPrompt] = useState('');

  const [minLength, setMinLength] = useState(10);function BioDictionaryForm() {

  const [maxLength, setMaxLength] = useState(50);  const [prompt, setPrompt] = useState('');

  const [numBeams, setNumBeams] = useState(5);  const [minLength, setMinLength] = useState(10);

  return (  const [maxLength, setMaxLength] = useState(50);

    <form>  const [numBeams, setNumBeams] = useState(5);

      <label>Prompt:</label><br />  // ...existing code...

      <input value={prompt} onChange={e => setPrompt(e.target.value)} style={{ width: 300 }} /><br />  return (

      <label>Min Length:</label>    <form>

      <input type="number" value={minLength} onChange={e => setMinLength(e.target.value)} /><br />      <label>Prompt:</label><br />

      <label>Max Length:</label>      <input value={prompt} onChange={e => setPrompt(e.target.value)} style={{ width: 300 }} /><br />

      <input type="number" value={maxLength} onChange={e => setMaxLength(e.target.value)} /><br />      <label>Min Length:</label>

      <label>Num Beams:</label>      <input type="number" value={minLength} onChange={e => setMinLength(e.target.value)} /><br />

      <input type="number" value={numBeams} onChange={e => setNumBeams(e.target.value)} /><br />      <label>Max Length:</label>

      <button type="submit">Lookup</button>      <input type="number" value={maxLength} onChange={e => setMaxLength(e.target.value)} /><br />

    </form>      <label>Num Beams:</label>

  );      <input type="number" value={numBeams} onChange={e => setNumBeams(e.target.value)} /><br />

}      <button type="submit">Lookup</button>

    </form>

export default App;  );

}

export default App;
