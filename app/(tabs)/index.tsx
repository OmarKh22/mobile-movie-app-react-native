import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-5xl font-bold text-accent">Omar!</Text>
      <Link href="/onboarding" className="mt-5 px-4 py-2 bg-primary rounded-md">
        <Text className="text-white text-lg">Get Started</Text>
      </Link>
    </View>
  );
}
