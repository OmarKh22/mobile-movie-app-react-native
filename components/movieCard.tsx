import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  console.log("Full Poster URL:", posterUrl);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/movie/${movie.id}`)}
      className="w-[150px] mr-4"
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: posterUrl }}
        style={{ width: 150, height: 220, borderRadius: 12, backgroundColor: "#222" }}
        contentFit="contain"
        // onError={(e) => console.log("Image load error:", e.nativeEvent)}
      />
      <Text
        className="text-white text-sm font-semibold mt-2"
        numberOfLines={1}
      >
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
}
