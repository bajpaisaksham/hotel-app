// ... existing code ...
import axios from 'axios';

// New controller function to fetch data from the API
async function fetchData() {
    try {
      const response = await axios.get('http://localhost:3000/api/data'); // Adjust the URL as needed
      console.log('Data fetched successfully:');
      return response.data;
    } catch (error) {
      console.error('Error fetching data from API:', error);
      throw error;
    }
  }
  
export default fetchData;
  
  // ... existing code ...