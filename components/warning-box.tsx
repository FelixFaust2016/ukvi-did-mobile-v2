import { warning } from "@/assets/images";
import { FC } from "react";
import { Image, Text, View } from "react-native";

export const WarningBox: FC<{ text: string }> = ({ text }) => {
  return (
    <View className="w-full p-5 align-top rounded-md bg-warning">
      <View className="w-full">
        <View className="flex-row items-start gap-3 ">
          <Image source={warning} />
          <Text className="text-xl text-gray-100 font-bold">
            Important Notice
          </Text>
        </View>

        <Text className="text-lg font-medium text-gray-100 mt-2">{text}</Text>
      </View>
    </View>
  );
};
