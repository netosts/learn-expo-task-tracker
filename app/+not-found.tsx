import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Link href="/" style={{ fontSize: 18, marginTop: 20 }}>
          Go to home screen!
        </Link>
      </View>
    </>
  );
}
