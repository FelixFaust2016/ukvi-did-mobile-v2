import { logo } from "@/assets/images";
import { Button } from "@/components";
import { router } from "expo-router";
import { SafeAreaView, Text, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export default function Index() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      const complete = await AsyncStorage.getItem("onboardingComplete");
      setOnboardingComplete(complete === "true");
      setChecking(false);
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    if (!checking && onboardingComplete) {
      router.replace("/(tabs)/home");
    }
  }, [checking, onboardingComplete]);

  if (checking) return null;

  return (
    <View className="flex items-center justify-start flex-1 bg-primary">
      <SafeAreaView className="flex-1">
        <View className="px-5 flex-1 flex items-center mt-10 w-full">
          <View className="w-[70px] h-[70px] bg-secondary flex justify-center items-center rounded-md">
            <Image source={logo} className="w-10" />
          </View>
          <Text className="text-light-100 text-center text-4xl mt-5">
            Welcome to UKVI ID
          </Text>
          <Text className="mt-2 text-xl text-center text-light-200">
            Verify and store your visa securely{"\n"} with Decentralized
            Identity
          </Text>

          <View className="absolute bottom-10 w-full">
            <Button
              text="Get Started"
              onPress={() => router.push("/create-did")}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
