import { avatar } from "@/assets/images";
import { Button } from "@/components";
import { DefaultVC, StoreVC } from "@/types/vc";
// import { getVC } from "@/utils/handle-vc-data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { FC, Fragment, useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";

const Info: FC<{ label: string; text: string }> = ({ label, text }) => {
  return (
    <View>
      <Text className="text-light-200 text-lg font-semibold">
        {label.toLocaleLowerCase()}
      </Text>
      <Text className="text-light-100 text-2xl font-semibold">{text}</Text>
    </View>
  );
};

export default function ImportView() {
  const [vc, setVC] = useState<StoreVC>(DefaultVC);

  useEffect(() => {
    const fetchKeys = async () => {
      const keys = await AsyncStorage.getItem("vc-details");
      if (keys) {
        const parsed = JSON.parse(keys);

        // 🔍 Fix here: check if `data` is a string, and parse it again
        const data =
          typeof parsed.data === "string"
            ? JSON.parse(parsed.data)
            : parsed.data;

        setVC({ ...parsed, data }); // ✅ now vc.data will be a real object
      }
    };

    fetchKeys();
  }, []);

  console.log(vc.data.id, "-----");

  const { image, subjectDid, ...rest } = vc.data.credentialSubject;

  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
          <View className="flex-1 px-5">
            <Text className="text-light-100 text-4xl mt-10">
              You have Successfully Imported your Visa Credential ✅
            </Text>
            <View className="mt-14">
              <Image
                source={avatar}
                className="w-[150px] h-[150px] mx-auto object-cover object-center"
              />
              <View className="mt-10 gap-3">
                {Object.entries(rest).map(([key, value]) => (
                  <Fragment key={key}>
                    <Info label={key} text={value} />
                  </Fragment>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="w-full absolute bottom-0 h-[12 0px] border-t-2 border-secondary px-5 py-5 gap-5 bg-primary">
          <Button
            text="Back to Home"
            onPress={() => router.push("/(tabs)/home")}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
