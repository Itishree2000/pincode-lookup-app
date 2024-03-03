import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

function App() {
  const [pincode, setPincode] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      if (response.data && response.data.length > 0 && response.data[0].PostOffice) {
        setFilteredData(response.data[0].PostOffice);
        setError('');
      } else {
        setError('Postal data not found for this pincode.');
        setFilteredData([]);
      }
    } catch (error) {
      setError('Error fetching data. Please try again.');
      setFilteredData([]);
    }
  };

  const handleInputChange = (event) => {
    setPincode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pincode.length !== 6 || isNaN(pincode)) {
      setError('Please enter a valid 6-digit pincode.');
      setFilteredData([]);
      return;
    }
    fetchData();
  };

  return (
    <div className="app">
      <h1>Pincode Lookup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pincode}
          onChange={handleInputChange}
          placeholder="Enter 6-digit Pincode"
        />
        <button type="submit">Lookup</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="result-container">
        {filteredData.map((postOffice, index) => (
          <div key={index} className="post-office">
            <p><strong>Post Office Name:</strong> {postOffice.Name}</p>
            <p><strong>Branch Type:</strong> {postOffice.BranchType}</p>
            <p><strong>District:</strong> {postOffice.District}</p>
            <p><strong>State:</strong> {postOffice.State}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;