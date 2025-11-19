import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useTopRatedMovies, usePopularMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
   const { data, isLoading, error } = usePopularMovies();
   const { data: topRated, isLoading: topRatedLoading, error: topRatedError } = useTopRatedMovies();

   if (isLoading || topRatedLoading) return <ActivityIndicator />;
   if (error || topRatedError) return <Text>Something went wrong!</Text>;

   const router = useRouter();
   return (
      <View className="min-h-full bg-primary">
         <Image source={images.bg} className="absolute w-full z-0" />

         <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
         >
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
               {/* Popular Movies */}
               <Text className="text-white text-lg font-semibold mt-3 mb-4">
                  Popular Movies
               </Text>
            </View>

            {isLoading ? (
               <ActivityIndicator />
            ) : (
               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {data?.results?.map((movie: any) => (
                     <MovieCard key={movie.id} movie={movie} />
                  ))}
               </ScrollView>
            )}

            {/* Top Rated Movies */}
            <Text className="text-white text-lg font-semibold mt-8 mb-4">
               Top Rated Movies
            </Text>
            {topRatedLoading ? (
               <ActivityIndicator />
            ) : (
               <FlatList
                  data={topRated?.results}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={2}
                  scrollEnabled={false} 
                  columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
                  renderItem={({ item }) => <MovieCard movie={{ ...item, poster_path: item.poster_path ?? null }} />}
               />
            )}
         </ScrollView>
      </View>
   );
}
