import React, { useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import SearchBar from '@/components/searchBar';
import { searchMovies } from '@/services/api';
import MovieCard from '@/components/movieCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const data = await searchMovies({ query: text });
      setResults(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary px-4 pt-16">
      <SearchBar
        placeholder="Search for movies..."
        value={query}
        onChangeText={handleSearch}
      />

      {loading && <ActivityIndicator className="mt-4" />}

      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
          renderItem={({ item }) => <MovieCard movie={item} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        query.trim() !== '' &&
        !loading && (
          <Text className="text-white mt-4 text-center">No results found.</Text>
        )
      )}
    </SafeAreaView>
  );
}
