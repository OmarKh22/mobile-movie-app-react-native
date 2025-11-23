import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useTopRatedMovies, usePopularMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { BlurView } from 'expo-blur';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
   const { data, isLoading, error } = usePopularMovies();
   const { data: topRated, isLoading: topRatedLoading, error: topRatedError } = useTopRatedMovies();

   if (isLoading || topRatedLoading) return <ActivityIndicator />;
   if (error || topRatedError) return <Text>Something went wrong!</Text>;

   const router = useRouter();

   return (
      <SafeAreaView className="flex-1 bg-primary">
         {/* Background */}
         <Image source={images.bg} className="absolute w-full h-full z-0" />

         {/* ===== FIXED BLUR HEADER ===== */}
         <BlurView 
            intensity={70}
            tint="dark"
            style={{
               position: "absolute",
               top: 0,
               left: 0,
               right: 0,
               paddingTop: 55,
               paddingBottom: 20,
               paddingHorizontal: 20,
               zIndex: 50,
            }}
         >
            <Image
               source={icons.logo}
               className="w-16 h-10 mx-auto mb-4"
            />

            <SearchBar 
               onFocus={() => router.push('/search')}
               placeholder="Search for movies, shows..."
            />
         </BlurView>

         {/* ===== SCROLL CONTENT ===== */}
         <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
               paddingHorizontal: 20,
               paddingTop: 200,   
               paddingBottom: 40
            }}
         >
            {/* Popular Movies */}
            <Text className="text-white text-lg font-semibold mb-4">
               Popular Movies
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
               {data?.results?.map((movie: any) => (
                  <MovieCard key={movie.id} movie={movie} />
               ))}
            </ScrollView>

            {/* Top Rated */}
            <Text className="text-white text-lg font-semibold mt-8 mb-4">
               Top Rated Movies
            </Text>

            <FlatList
               data={topRated?.results}
               keyExtractor={(item) => item.id.toString()}
               numColumns={2}
               scrollEnabled={false}
               columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
               renderItem={({ item }) => (
                  <MovieCard movie={{ ...item, poster_path: item.poster_path ?? null }} />
               )}
            />
         </ScrollView>
      </SafeAreaView>
   );
}

