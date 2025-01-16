import axios from 'axios';

export const fetchJobs = async (keyword: string, location: string) => {
  try {
    const response = await axios.get("'http://localhost:5001/api/jobs'", {
      params: {
        keyword,
        location,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
