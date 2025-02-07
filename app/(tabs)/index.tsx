import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import { fetchJobs } from '../../functions/fetchJobs';

const HomeScreen = () => {
  // States for Filters
  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [remote, setRemote] = useState('');
  const [company, setCompany] = useState('');

  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState('');

  const searchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const filters = {
        location,
        keyword,
        country,
        time_range: timeRange,
        job_type: jobType,
        experience_level: experienceLevel,
        remote,
        company,
      };
      const result = await fetchJobs(filters);
      setJobs(result);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-4">
        {/* Header */}
        <Text className="mb-4 text-center text-2xl font-bold text-red-500">Job Finder</Text>

        {/* Search Section */}
        <View className="mb-4">
          <TextInput
            placeholder="Location (e.g., New York)"
            value={location}
            onChangeText={setLocation}
            className="mb-2 rounded-md border border-gray-300 p-2"
          />
          <TextInput
            placeholder="Job Title (e.g., Software Engineer)"
            value={keyword}
            onChangeText={setKeyword}
            className="mb-2 rounded-md border border-gray-300 p-2"
          />
          <TextInput
            placeholder="Country (e.g., US, FR)"
            value={country}
            onChangeText={setCountry}
            className="mb-2 rounded-md border border-gray-300 p-2"
          />
          <TextInput
            placeholder="Company Name (Optional)"
            value={company}
            onChangeText={setCompany}
            className="mb-2 rounded-md border border-gray-300 p-2"
          />

          {/* Dropdown Filters */}
          <Picker selectedValue={timeRange} onValueChange={(item: any) => setTimeRange(item)}>
            <Picker.Item label="Any time" value="Any time" />
            <Picker.Item label="Past 24 hours" value="Past 24 hours" />
            <Picker.Item label="Past week" value="Past week" />
            <Picker.Item label="Past month" value="Past month" />
          </Picker>

          <Picker selectedValue={jobType} onValueChange={(item: any) => setJobType(item)}>
            <Picker.Item label="Full-time" value="Full-time" />
            <Picker.Item label="Part-time" value="Part-time" />
            <Picker.Item label="Contract" value="Contract" />
            <Picker.Item label="Internship" value="Internship" />
          </Picker>

          <Picker
            selectedValue={experienceLevel}
            onValueChange={(item: any) => setExperienceLevel(item)}>
            <Picker.Item label="Entry level" value="Entry level" />
            <Picker.Item label="Mid level" value="Mid level" />
            <Picker.Item label="Senior level" value="Senior level" />
            <Picker.Item label="Internship" value="Internship" />
          </Picker>

          <Picker selectedValue={remote} onValueChange={(item: any) => setRemote(item)}>
            <Picker.Item label="Remote" value="Remote" />
            <Picker.Item label="On-site" value="On-site" />
            <Picker.Item label="Hybrid" value="Hybrid" />
          </Picker>

          {/* Search Button */}
          <TouchableOpacity onPress={searchJobs} className="mt-4 rounded-md bg-red-500 p-3">
            <Text className="text-center text-white">Search Jobs</Text>
          </TouchableOpacity>
        </View>

        {/* Loading Indicator */}
        {loading && <ActivityIndicator size="large" color="#FF0000" className="mt-4" />}

        {/* Error Message */}
        {error && <Text className="mt-4 text-center text-red-500">{error}</Text>}

        {/* Job Listings */}
        <FlatList
          data={jobs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="mb-2 rounded-lg bg-white p-4 shadow-md">
              <Text className="text-lg font-bold text-black">{item.title}</Text>
              <Text className="text-gray-500">
                {item.company} - {item.location}
              </Text>
              <Text className="text-gray-400">{item.date_posted}</Text>
            </View>
          )}
          ListEmptyComponent={
            !loading ? (
              <Text className="mt-4 text-center text-gray-500">
                No jobs found. Try another search.
              </Text>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
