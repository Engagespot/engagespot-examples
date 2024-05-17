import { EngagespotProvider } from "@engagespot/react-hooks";
import { Notifications } from "./Notifications";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <EngagespotProvider
      options={{
        userId: "hemanditwiz@gmail.com",
        apiKey: "6lle29ey369dif42l5a7ne",
      }}
    >
      <View style={styles.container}>
        <Text>Engagespot Notifications</Text>
        <Notifications />
        <StatusBar style="auto" />
      </View>
    </EngagespotProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
