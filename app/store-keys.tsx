import { Button, KeyBox, Stepper, WarningBox } from "@/components";
import { router } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppSelector } from "@/store/hook";
import { usePostMutation } from "@/api/use-post-query";
import { deleteDidKey, storeDidKey } from "@/utils/handle-did-keys";
import { useAppDispatch } from "@/store/hook";
import { resetOnboarding } from "@/store/slices/onboarding-slice";

type PostInput = {
  did: string;
  firstname: string;
  lastname: string;
  middlename: string;
  image: string;
  publickey: string;
};

type PostResponse = {
  status: string;
  msg: string;
  applicant: PostInput;
};

export default function StoreKey() {
  const dispatch = useAppDispatch();
  const onboardingData = useAppSelector((state) => state.onboarding);

  const { mutate, isPending, isSuccess } = usePostMutation<
    PostResponse,
    PostInput
  >("http://192.168.1.66:8000/api/applicants/add_applicant");

  const completeOnboarding = async () => {
    const applicantData = {
      did: onboardingData.did,
      firstname: onboardingData.firstname,
      middlename: onboardingData.middlename,
      lastname: onboardingData.lastname,
      image: onboardingData.image,
      publickey: onboardingData.publicKey,
    };
    try {
      mutate(applicantData, {
        onSuccess: async () => {
          await storeDidKey({
            did: onboardingData.did,
            publicKeyHex: onboardingData.publicKey,
            privateKeyHex: onboardingData.privateKey,
          });
          dispatch(resetOnboarding());

          await AsyncStorage.setItem("onboardingComplete", "true");

          router.dismissAll();
          router.replace("/(tabs)/home");
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 200 }}
          className="w-full mt-5 px-5"
        >
          <Stepper currentStep={3} noOfSteps={3} />
          <Text className="text-light-100 text-4xl mt-10">
            Store DID and Verification Keys
          </Text>
          <Text className="mt-2 text-xl  text-light-200">
            Your DID and keys will help you claim your{"\n"}visa when it has
            been issued
          </Text>

          <View className="mt-5 gap-3">
            <KeyBox placeholder="DID" text={onboardingData.did} />
            <KeyBox placeholder="Public Key" text={onboardingData.publicKey} />
            <KeyBox
              placeholder="Private Key"
              text={onboardingData.privateKey}
            />
          </View>
          <View className="mt-5">
            <WarningBox
              text={
                "Make sure to not expose your private key to any individual, it is parmount for your identity verification"
              }
            />
          </View>
        </ScrollView>
        <View className="w-full absolute bottom-10 border-t-2 border-secondary px-5 py-5 gap-5 bg-primary">
          <Button
            text={isPending ? "Finishing..." : "Finish"}
            onPress={completeOnboarding}
          />
          <Button
            type={"secondary"}
            text="Cancel"
            onPress={() => router.push("/")}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
