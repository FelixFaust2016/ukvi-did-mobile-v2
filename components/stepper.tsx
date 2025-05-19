import { FC, Fragment } from "react";
import { View, Text } from "react-native";

interface IStepper {
  noOfSteps: number;
  currentStep: number;
}

export const Stepper: FC<IStepper> = ({ noOfSteps, currentStep }) => {
  const steps = Array.from({ length: noOfSteps }, (_, index) => index + 1);

  return (
    <View className="flex-row items-center w-full">
      {steps.map((_, index) => (
        <Fragment key={index}>
          <View
            className={`w-[50px] h-[50px] ${
              currentStep === index + 1
                ? "bg-light-100"
                : index + 1 < currentStep
                ? "bg-disabled"
                : "bg-secondary"
            } rounded-full gap-3 flex items-center justify-center`}
          >
            <Text
              className={`${
                currentStep === index + 1
                  ? "text-primary"
                  : index + 1 < currentStep
                  ? "text-light-100"
                  : "text-light-100"
              } font-medium text-lg`}
            >
              {index + 1}
            </Text>
          </View>
          {index + 1 < steps.length && (
            <View className="h-2 w-14 bg-secondary" />
          )}
        </Fragment>
      ))}
    </View>
  );
};
