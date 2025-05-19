import { Button, Stepper } from "@/components";
import { Text, View, Image, SafeAreaView } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { FC, useRef, useState } from "react";
import { router } from "expo-router";
import { useAppDispatch } from "@/store/hook";
import { setOnboardingData } from "@/store/slices/onboarding-slice";
import { imageToBase64 } from "@/utils/base64-fomatter";
import { compressAndConvertToBase64 } from "@/utils/compressImage";

const CameraComponent: FC<{ cameraRef: any }> = ({ cameraRef }) => {
  return (
    <View className="mt-10 justify-center bg-primary w-full">
      <CameraView
        ref={cameraRef}
        className=" bg-primary w-full"
        facing={"front"}
      >
        <View className="w-full h-[300px]"></View>
      </CameraView>
    </View>
  );
};

const RenderPicture: FC<{ uri: string }> = ({ uri }) => {
  return (
    <View className="mt-10 justify-center bg-primary w-full ">
      <Image className="w-full h-[300px]" source={{ uri }} />
    </View>
  );
};

const TakeAPicture = () => {
  const dispatch = useAppDispatch();

  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string>("");

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri!);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View className="bg-primary flex-1" />;
  }

  const handleSubmit = async () => {
    try {
      const uri64 = await compressAndConvertToBase64(uri);
      dispatch(setOnboardingData({ image: uri64! }));
      router.push("/store-keys");
    } catch (error) {
      console.log(error);
    }
  };

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 justify-center items-center bg-primary gap-5">
        <Text className="text-center mb-5 text-light-100">
          We need your permission to show the camera
        </Text>
        <View className="w-7/12">
          <Button onPress={requestPermission} text="grant permission" />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView className=" flex-1">
        <View className="flex flex-1 mt-5 px-5">
          <Stepper noOfSteps={3} currentStep={2} />
          <Text className="font-semibold text-light-100 text-4xl mt-10">
            Take a Selfie
          </Text>
          <Text numberOfLines={4} className="text-light-200 mt-2 text-lg ">
            Taking a selfie helps us verify your identity securely and
            efficiently. It ensures that your account remains private and
            protected, enhancing your overall security experience.
          </Text>
          {uri.length === 0 ? (
            <CameraComponent cameraRef={ref} />
          ) : (
            <RenderPicture uri={uri} />
          )}
        </View>
        <View className="absolute bottom-20 w-full px-5 gap-5">
          <Button
            onPress={uri.length === 0 ? takePicture : () => setUri("")}
            text={uri.length === 0 ? "Take Selfie" : "Retake Selfie"}
          />
          <Button
            onPress={handleSubmit}
            type="secondary"
            text="Continue"
            disabled={!uri}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TakeAPicture;
