export const fetchJobs = async (keyword: string) => {
  try {
    const response = await fetch(
      `https://brightdata.com/cp/data_api/gd_lpfll7v5hcqtkxl6l/keyword?id=hl_c6db08c4&keyword=${keyword}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_BRIGHTDATA_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const text = await response.text(); // Get the response as text
    console.log('Response:', text); // Log the response
    const data = JSON.parse(text); // Parse the text as JSON
    return data;
  } catch (error) {
    console.error('Error while fetching jobs! ', error);
    return null;
  }
};
