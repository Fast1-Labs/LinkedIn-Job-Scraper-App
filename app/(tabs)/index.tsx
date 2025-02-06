import { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

import { fetchJobs } from '~/functions/fetchJobs';

type Job = {
  id: number; // Adjust the type based on the actual data structure
  title: string; // Adjust the type based on the actual data structure
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('React Native Developer');

  const handleSearch = async () => {
    setLoading(true);
    const jobResults = await fetchJobs(search);
    setJobs(jobResults?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View className="flex-1 bg-blue-400">
      <SafeAreaView>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search for jobs"
          className="border border-gray-300 p-2"
        />
        <Button title="Search" onPress={handleSearch} />
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
