import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

// export const storeVC = async (vcData: any, id: string) => {
//   try {
//     const newValue = { data: vcData, cid: id };

//     const value = JSON.stringify(newValue);
//     console.log('====================================');
//     console.log(value);
//     console.log('====================================');
//     await SecureStore.setItemAsync("vc-details", value, {
//       keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK, // optional
//     });
//     console.log("✅ VC stored securely");
//   } catch (error) {
//     console.error("❌ Error storing VC:", error);
//   }
// };

export const storeVC = async (vcData: any, id: string) => {
  try {
    const newValue = { data: vcData, cid: id };
    const json = JSON.stringify(newValue);

    // Store full VC in AsyncStorage
    await AsyncStorage.setItem("vc-details", json);

    // Optionally store a short ID or fingerprint in SecureStore
    await SecureStore.setItemAsync("vc-meta", id); // just an example

    console.log("✅ VC stored in AsyncStorage");
  } catch (error) {
    console.error("❌ Error storing VC:", error);
  }
};

export const getVC = async (): Promise<any | null> => {
  try {
    const value = await SecureStore.getItemAsync("vc-details");
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("❌ Error retrieving VC:", error);
    return null;
  }
};

export const deleteVC = async () => {
  try {
    await SecureStore.deleteItemAsync("vc-details");
    console.log("🗑️ VC deleted");
  } catch (error) {
    console.error("❌ Error deleting VC:", error);
  }
};
