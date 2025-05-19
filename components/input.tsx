import { FC } from "react";
import { Text, TextInput } from "react-native";

interface IInput {
  label?: string;
  placeholder: string;
  onChangeText?: () => void;
  onBlur?: () => void;
  value?: string;
  errorText?: string;
}

export const Input: FC<IInput> = ({
  label,
  placeholder,
  onChangeText,
  onBlur,
  value,
  errorText,
}) => {
  return (
    <>
      <Text className="text-lg mb-3 text-light-100 font-medium">{label}</Text>
      <TextInput
        className="w-full rounded-md bg-secondary h-12 px-5 placeholder:text-light-200 text-light-100"
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
      {errorText && <Text className="mt-2 text-danger">{errorText}</Text>}
    </>
  );
};
