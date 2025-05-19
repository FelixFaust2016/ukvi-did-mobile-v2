import { FC } from "react";
import { TouchableOpacity, Text } from "react-native";

interface IButton {
  onPress?: () => void;
  text: string;
  type?: string;
  disabled?: boolean;
}

export const Button: FC<IButton> = ({ onPress, text, type, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      className={`w-full ${
        type === "secondary"
          ? "bg-secondary"
          : type === "danger"
          ? "bg-danger"
          : "bg-light-100"
      } rounded-md px-2 h-14 flex items-center justify-center disabled:opacity-70`}
    >
      <Text
        className={`${
          type === "secondary" || type === "danger"
            ? "text-light-100"
            : "text-primary"
        } text-2xl text-center font-medium`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
