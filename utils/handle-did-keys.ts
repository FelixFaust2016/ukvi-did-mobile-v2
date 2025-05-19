import * as SecureStore from 'expo-secure-store';

export interface DidKeyStorage {
  did: string;
  privateKeyHex: string;
  publicKeyHex: string;
}

export const storeDidKey = async (keyData: DidKeyStorage) => {
  try {
    const value = JSON.stringify(keyData);
    await SecureStore.setItemAsync('did_identity', value, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK, // optional
    });
    console.log('✅ DID key stored securely');
  } catch (error) {
    console.error('❌ Error storing DID key:', error);
  }
};


export const getDidKey = async (): Promise<DidKeyStorage | null> => {
  try {
    const value = await SecureStore.getItemAsync('did_identity');
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('❌ Error retrieving DID key:', error);
    return null;
  }
};


export const deleteDidKey = async () => {
  try {
    await SecureStore.deleteItemAsync('did_identity');
    console.log('🗑️ DID key deleted');
  } catch (error) {
    console.error('❌ Error deleting DID key:', error);
  }
};

