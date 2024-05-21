import { useFeed } from "@engagespot/react-hooks";
import { StyleSheet, Text, type TextProps, View } from "react-native";

export function Notifications({ style, ...props }: TextProps) {
  const { notifications } = useFeed();
  return (
    <View>
      {notifications.map((notification) => {
        return (
          <Text key={notification.id} style={[$paragraph, style]} {...props}>
            {notification.title}
          </Text>
        );
      })}
    </View>
  );
}

const { $paragraph } = StyleSheet.create({
  $paragraph: {
    color: "blue",
    fontSize: 16,
    letterSpacing: 0.25,
    marginVertical: 2,
  },
});
