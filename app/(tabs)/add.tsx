import { Button } from "@/components";
import { router } from "expo-router";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

export default function Add() {
  useLayoutEffect(() => {
    router.replace("/import-credential/import");
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Text>Hello from add</Text>
    </View>
  );
}
