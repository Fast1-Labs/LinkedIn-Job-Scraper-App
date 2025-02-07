import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_BRIGHTDATA_API_KEY;
const DATASET_ID = 'gd_lpfll7v5hcqtkxl6l';
const URL = `https://api.brightdata.com/datasets/v3/trigger?dataset_id=${DATASET_ID}&include_errors=true&type=discover_new&discover_by=keyword`;

export const fetchJobs = async (keyword: string) => {
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error while fetching jobs ', error);
    return [];
  }
};
