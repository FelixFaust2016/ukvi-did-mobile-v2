import { empty } from "@/assets/images";
import { Button, CredentialCard } from "@/components";
import { useBottomSheet } from "@/components/bottom-sheet";
import { DefaultVC, StoreVC } from "@/types/vc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { encode as btoa } from "base-64";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Home() {
  const [vc, setVC] = useState<StoreVC>(DefaultVC);

  const { open } = useBottomSheet();

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

  const openSheet = () => {
    const payload = {
      vc_summary: {
        visaID: vc.data.credentialSubject.visaID,
        firstName: vc.data.credentialSubject.firstName,
        lastName: vc.data.credentialSubject.lastName,
        nationality: vc.data.credentialSubject.nationality,
      },
      vc_hash: "0xa01bcde987...",
      signature: vc.data.proof.proofValue,
      holder_did: vc.data.issuer,
      issued_at: vc.data.proof.created,
      expires_at: vc.data.credentialSubject.passportExpiryDate,
    };

    const encoded = btoa(JSON.stringify(payload));
    const url = `http://localhost:3000/verify?data=${encodeURIComponent(
      encoded
    )}`;

    open(
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text className="text-center text-3xl mb-3">
          Scan to Verify Identity
        </Text>
        <QRCode value={url} size={250} backgroundColor="white" />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView>
        {vc.data.type.length > 0 ? (
          <View className="px-5">
            <Text className="text-light-100 text-4xl mt-10 mb-5">
              Credential
            </Text>
            <CredentialCard
              visa_type={vc.data.credentialSubject.visaType}
              cid={vc.cid}
              status={"active"}
              expiry_date={vc.data.credentialSubject.passportExpiryDate}
              onPress={openSheet}
            />
          </View>
        ) : (
          <View className="h-full justify-center items-center px-5">
            <Image source={empty} />
            <Text className="text-2xl text-center mt-3 text-light-100">
              No Credentials Imported{"\n"} at the Moment
            </Text>
            <View className="mt-5 w-7/12">
              <Button
                text="Import Credential"
                onPress={() => router.push("/import-credential/import")}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
