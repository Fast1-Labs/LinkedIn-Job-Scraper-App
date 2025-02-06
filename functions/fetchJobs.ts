export const fetchJobs = async () => {
  try {
    const response = await fetch(
      'https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lpfll7v5hcqtkxl6l&include_errors=true&type=discover_new&discover_by=keyword',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_BRIGHTDATA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([]),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
