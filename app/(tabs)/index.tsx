import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { usePopularMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";


export default function Index() {
   const { data, isLoading, error } = usePopularMovies();
  console.log("data" , data)
  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Something went wrong !</Text>;
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
     <Image source={images.bg} className="absolute w-full z-0" />
     <ScrollView 
      className="flex-1 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        minHeight: '100%',
        paddingBottom: 10 
      }}>
        {/* logo */}
      <Image
        source={icons.logo}
        className="w-16 h-10 mt-20 mb-6 mx-auto"
      />
      {/* search bar */}
      <View className=" mt-5 gap-2">
        <SearchBar 
          onPress={() => router.push('/search')}
          palceholder="Search for movies, shows..."
        />
      <Text className="text-white text-lg font-semibold mt-3 mb-4">
          Popular Movies
        </Text>
      </View>
      {/* fetching movies */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.results?.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ScrollView>
     </ScrollView>

    </View>
  );
}
