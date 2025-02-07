export const fetchJobs = async (filters: {
  location: string;
  keyword: string;
  country?: string;
  time_range?: string;
  job_type?: string;
  experience_level?: string;
  remote?: string;
  company?: string;
}) => {
  try {
    const requestBody = [filters];
    const response = await fetch(
      'https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lpfll7v5hcqtkxl6l&include_errors=true&type=discover_new&discover_by=keyword',
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_BRIGHTDATA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );
    if (!response.ok) {
      throw new Error('Error while fetching jobs');
    }

    const data = await response.json();
    console.log('Fetched jobs: ', data);
    return data;
  } catch (e) {
    console.log('Error: ', e);
    return [];
  }
};
