import { Button, Input, Stepper, WarningBox } from "@/components";
import { create_did_schema } from "@/schema/create-did";
import { useAppDispatch } from "@/store/hook";
import { setOnboardingData } from "@/store/slices/onboarding-slice";
import { generateRsaDidKey } from "@/utils/genrate-did-keys";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

type FormData = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export default function CrearDID() {
  const dispatch = useAppDispatch();
  const [generating, setGenerating] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(create_did_schema),
  });

  const onSubmit = async (data: FormData) => {
    setGenerating(true);
    try {
      const did_and_keys = await generateRsaDidKey();

      console.log("====================================");
      console.log("did_and_keys");
      console.log("====================================");

      const userData = {
        firstname: data.firstName,
        middlename: data.middleName,
        lastname: data.lastName,
        did: did_and_keys.did,
        privateKey: did_and_keys.privateKeyPem,
        publicKey: did_and_keys.publicKeyPem,
      };
      dispatch(setOnboardingData(userData));
      router.push("/take-a-picture");
      setGenerating(false);
    } catch (error) {
      console.log(error, "error");
      setGenerating(false);
    }
  };

  return (
    <View className="flex justify-start flex-1 bg-primary">
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 200 }}
          className="w-full mt-5 px-5"
        >
          <Stepper noOfSteps={3} currentStep={1} />
          <Text className="text-light-100 text-4xl mt-10">
            Create Your Digital Identity
          </Text>
          <Text className="mt-2 text-xl  text-light-200">
            This will generate a unique identifier that represents{"\n"}you in
            the digital world
          </Text>

          <View className="w-100 mt-5">
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="First Name"
                  placeholder="Enter your Firstname"
                  // onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorText={errors.firstName && errors.firstName.message}
                />
              )}
            />
          </View>
          <View className="w-100 mt-5">
            <Controller
              control={control}
              name="middleName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Middle Name"
                  placeholder="Enter your Middlename"
                  // onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorText={errors.middleName && errors.middleName.message}
                />
              )}
            />
          </View>
          <View className="w-100 mt-5 mb-10">
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Last Name"
                  placeholder="Enter your Lastname"
                  // onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorText={errors.lastName && errors.lastName.message}
                />
              )}
            />
          </View>
          <WarningBox
            text=" Ensure the names included in the field above are the same used for
          your travel documents"
          />
        </ScrollView>
        <View className="w-full absolute bottom-10 border-t-2 border-secondary px-5 py-5 gap-5 bg-primary">
          <Button
            onPress={handleSubmit(onSubmit)}
            text={generating ? "Generating..." : "Generate DID"}
          />
          <Button
            type={"secondary"}
            text="Cancel"
            onPress={() => router.back()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
