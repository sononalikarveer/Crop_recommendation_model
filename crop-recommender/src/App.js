import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: ''
  });
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction('');

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: form,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      // Extract the prediction from the HTML response
      const parser = new DOMParser();
      const doc = parser.parseFromString(result, 'text/html');
      const predictionText = doc.getElementById('prediction').innerText;
      setPrediction(predictionText);

    } catch (err) {
      setError('Failed to fetch prediction. Make sure the backend server is running.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="App">
      <h1>Crop Recommender</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" name="N" placeholder="Nitrogen (N)" value={formData.N} onChange={handleChange} required />
        <input type="number" name="P" placeholder="Phosphorus (P)" value={formData.P} onChange={handleChange} required />
        <input type="number" name="K" placeholder="Potassium (K)" value={formData.K} onChange={handleChange} required />
        <input type="number" name="temperature" placeholder="Temperature (°C)" value={formData.temperature} onChange={handleChange} required />
        <input type="number" name="humidity" placeholder="Humidity (%)" value={formData.humidity} onChange={handleChange} required />
        <input type="number" name="ph" placeholder="pH" value={formData.ph} onChange={handleChange} required />
        <input type="number" name="rainfall" placeholder="Rainfall (mm)" value={formData.rainfall} onChange={handleChange} required />
        <button type="submit">Get Recommendation</button>
      </form>

      {prediction && <h2>{prediction}</h2>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;

















// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
