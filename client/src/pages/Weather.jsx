import { useState } from 'react';
import axios from 'axios';

const WeatherChatComponent = () => {
  const [location, setLocation] = useState('Berlin');
  const [response, setResponse] = useState('');

  const fetchWeatherChat = async () => {
    try {
      const result = await axios.post('http://localhost:8000/api/v1/weather/completions', {
        location,
        stream: false, // Set to true if you want to handle streaming
    });
    console.log(result)

      setResponse(result.data.content);
    } catch (error) {
      console.error('Error fetching weather chat:', error);
    }
  };

  return (
    <div>
      <h1>Weather Chat</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={fetchWeatherChat}>Get Weather Chat</button>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default WeatherChatComponent;
