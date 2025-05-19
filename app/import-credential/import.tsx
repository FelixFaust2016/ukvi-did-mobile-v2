import { useGetQuery } from "@/api/use-get-query";
import { back } from "@/assets/images";
import { Button, Input } from "@/components";
import { importVC } from "@/schema/import-vc";
import { decryptWithPrivateKey } from "@/utils/decrypt-vc";
import { DidKeyStorage, getDidKey } from "@/utils/handle-did-keys";
import { storeVC } from "@/utils/handle-vc-data";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface IVC {
  encryptedKey: string;
  iv: string;
  ciphertext: string;
  tag: string;
}

type FormData = {
  cid: string;
};

export default function ImportCredential() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(importVC),
  });
  const cid = watch("cid");
  const [keys, setKeys] = useState<DidKeyStorage>({
    did: "",
    privateKeyHex: "",
    publicKeyHex: "",
  });

  useEffect(() => {
    const fetchKeys = async () => {
      const keys = await getDidKey();
      setKeys(keys!);
    };

    fetchKeys();
  }, []);

  const { data, error, isLoading } = useGetQuery<IVC>(
    "vc",
    `https://gateway.pinata.cloud/ipfs/${cid}`,
    {
      enabled: !!cid,
    }
  );

  console.log(error, "fetch error");

  const handleImportVC = async () => {
    console.log("hello");

    const decrypted = await decryptWithPrivateKey(
      data?.encryptedKey!,
      data?.iv!,
      data?.ciphertext!,
      data?.tag!,
      keys.privateKeyHex
    );

    if (decrypted) {
      await storeVC(decrypted, cid);

      router.push("/import-credential/view");
    } else {
      console.log("errorrr decrypting");
    }
  };

  https: return (
    <View className="flex-1 bg-primary">
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-5">
          <TouchableOpacity onPress={() => router.push("/home")}>
            <Image source={back} tintColor={"#fff"} />
          </TouchableOpacity>
          <Text className="text-light-100 text-4xl mt-10">
            Import Credential
          </Text>

          <View className="w-100 mt-5">
            <Controller
              control={control}
              name="cid"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Enter Credential ID (CID)"
                  placeholder="QmXyz123..."
                  onChangeText={onChange}
                  value={value}
                  errorText={errors.cid && errors.cid.message}
                />
              )}
            />
          </View>
          {isLoading && <Text className="text-light-100">Loading....</Text>}
        </View>
        <View className="w-full absolute bottom-10 border-t-2 border-secondary px-5 py-5 gap-5 bg-primary">
          <Button
            text="Import"
            onPress={handleSubmit(handleImportVC)}
            disabled={!data}
            // onPress={() => router.push("/import-credential/view")}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
