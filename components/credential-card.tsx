import { truncateText } from "@/utils/truncate";
import { FC } from "react";
import { Text, View } from "react-native";
import { Button } from "./button";

interface ICard {
  visa_type: string;
  cid: string;
  status: string;
  expiry_date: string;
  onPress: () => void;
}

export const CredentialCard: FC<ICard> = ({
  visa_type,
  cid,
  status,
  expiry_date,
  onPress,
}) => {
  return (
    <View className="bg-secondary border-light-200 p-5 rounded-md relative">
      {/* <View className="p-1 bg-light-100 absolute top-5 right-5 rounded-xl">
        <Text className="text-primary">{status}</Text>
      </View> */}
      <Text className="text-3xl text-light-100">{visa_type}</Text>
      <Text className="text-light-100 mt-2">{truncateText(cid, 10)}</Text>

      <View className="flex-row justify-between items-center mt-5 mb-5">
        <Text className="text-light-200">Valid until:</Text>
        <Text className="text-light-100">{expiry_date}</Text>
      </View>

      <Button text="Share Credential" onPress={onPress} />
    </View>
  );
};
