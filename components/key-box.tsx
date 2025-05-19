import { hide, show } from "@/assets/images";
import { FC, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { maskText } from "@/utils/mask-values";
import { truncateText } from "@/utils/truncate";

export const KeyBox: FC<{ placeholder: string; text: string }> = ({
  placeholder,
  text,
}) => {
  const [showKey, setShowKey] = useState(true);

  return (
    <View className="w-full p-5 rounded-lg bg-secondary">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl text-light-100 font-semibold">
          {placeholder}
        </Text>

        <TouchableOpacity onPress={() => setShowKey(!showKey)}>
          <Image className="w-7 h-5" source={!showKey ? show : hide} />
        </TouchableOpacity>
      </View>

      <Text className="mt-14 text-lg text-light-100 font-medium">
        {!showKey ? text : truncateText(maskText(text), 50)}
      </Text>
    </View>
  );
};
