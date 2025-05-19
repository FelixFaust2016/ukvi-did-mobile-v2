import { Button, KeyBox, WarningBox } from "@/components";
import {
  deleteDidKey,
  DidKeyStorage,
  getDidKey
} from "@/utils/handle-did-keys";
import { deleteVC } from "@/utils/handle-vc-data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { FC, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Modal from "react-native-modal";

export default function Profile() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [keys, setKeys] = useState<DidKeyStorage>({
    did: "",
    privateKeyHex: "",
    publicKeyHex: "",
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const fetchKeys = async () => {
      const keys = await getDidKey();
      setKeys(keys!);
    };

    fetchKeys();
  }, []);

  return (
    <>
      <View className="flex-1  bg-primary">
        <SafeAreaView className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ minHeight: "100%", paddingBottom: 200 }}
            className="w-full mt-5 px-5"
          >
            <Text className="text-light-100 text-4xl mt-10">Profile</Text>
            <Text className="mt-2 text-xl  text-light-200">
              Your did and keys will help you claim your{"\n"}visa when it has
              been issued
            </Text>

            <View className="mt-5 gap-3">
              <KeyBox placeholder="DID" text={keys.did} />
              <KeyBox placeholder="Public Key" text={keys.publicKeyHex} />
              <KeyBox placeholder="Private Key" text={keys.privateKeyHex} />
            </View>
            <View className="mt-5 mb-5">
              <WarningBox
                text={
                  "Make sure to not expose your private key to any individual, it is parmount for your identity verification"
                }
              />
            </View>
            <Button
              type="danger"
              text="Delete Identity"
              onPress={toggleModal}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
      <DeleteIdentityModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />
    </>
  );
}

const DeleteIdentityModal: FC<{
  isModalVisible: boolean;
  toggleModal: () => void;
}> = ({ isModalVisible, toggleModal }) => {
  const deleteIdenitiy = async () => {
    try {
      await deleteDidKey();
      await deleteVC();
      await AsyncStorage.clear();
      router.dismissAll();
      router.replace("/");
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      swipeDirection="down"
    >
      <View className="h-[300px] w-full justify-center alitem-center p-5 bg-secondary absolute bottom-0 left-0 right-0 rounded-l-xl rounded-r-xl">
        <Text className="text-center text-light-100 text-4xl">
          Are you Sure?!!
        </Text>
        <Text className="text-center text-light-200 mt-2 mb-10">
          Deleting your identity without a copy of it will permanently {"\n"}
          prevent you from accessing your credential.
        </Text>

        <Button
          type="danger"
          text="Delete Identity"
          onPress={deleteIdenitiy}
        />
      </View>
    </Modal>
  );
};
