import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

interface Props {
  onAuthenticated: () => void;
}

export const AuthGate: React.FC<Props> = ({ onAuthenticated }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authenticate = async () => {
    setLoading(true);
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to continue',
    });

    if (result.success) {
      onAuthenticated();
    } else {
      setError('Authentication failed. Try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    authenticate();
  }, []);

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator />
        <Text>Authenticating...</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 justify-center items-center'>
      {error && <Text>{error}</Text>}
      <Button title="Retry" onPress={authenticate} />
    </View>
  );
};
