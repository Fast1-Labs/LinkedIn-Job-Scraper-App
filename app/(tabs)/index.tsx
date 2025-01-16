import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';

import { Button } from '~/components/Button';
import { fetchJobs } from '~/functions/fetchJobs';

export default function Home() {
  const [keyword, setKeyWord] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobs, setJobs] = useState([]);

  const scrapeJobs = async (keyword: string, location: string) => {
    const scrapedJobs = await fetchJobs(keyword, location);
    const response = await scrapedJobs.json();
    setJobs(response);
  };

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'Tab One' }} />
      <Text className="font-xl p-2 font-bold">Scraped Jobs</Text>
      <View className="m-2 gap-5 rounded-md bg-white p-5">
        <View className="flex-row">
          <Text>Keyword: </Text>
          <TextInput value={keyword} onChangeText={setKeyWord} className="flex-1 bg-gray-200" />
        </View>
        <View className="flex-row">
          <Text>Location: </Text>
          <TextInput value={location} onChangeText={setLocation} className="flex-1 bg-gray-200" />
        </View>
        <Button
          title="Scrape Jobs"
          className="mt-3"
          onPress={() => scrapeJobs(keyword, location)}
        />
      </View>
      <View>
        <FlatList
          data={jobs}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
