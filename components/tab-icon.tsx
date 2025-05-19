import { Image, ImageBackground, Text, View } from "react-native";

export const TabIcon = ({ focused, icon, title }: any) => {
  return (
    <View className="items-center justify-center mt-7">
      <Image
        source={icon}
        tintColor={focused ? "#a8b5db" : "#fff"}
        className="size-7"
      />
    </View>
  );
};