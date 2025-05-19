// components/BttmSheetProvider.tsx

import { cancel } from "@/assets/images";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

type BottomSheetContextType = {
  open: (content: ReactNode) => void;
  close: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const useBottomSheet = () => {
  const ctx = useContext(BottomSheetContext);
  if (!ctx)
    throw new Error("useBottomSheet must be used within BttmSheetProvider");
  return ctx;
};

export const BttmSheetProvider = ({ children }: { children: ReactNode }) => {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const open = (newContent: ReactNode) => {
    setContent(newContent);
    setOpenBottomSheet(true);
  };

  const close = () => {
    setOpenBottomSheet(false);
    setContent(null);
  };

  return (
    <BottomSheetContext.Provider value={{ open, close }}>
      {children}
      {openBottomSheet && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              height: 400,
              backgroundColor: "white",
              padding: 20,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <View className="flex-row items-flex-end">
              <TouchableOpacity onPress={close}>
                <Image
                  source={cancel}
                  // className="w-[150px] h-[150px] mx-auto object-cover object-center"
                />
              </TouchableOpacity>
            </View>
            {content}
          </View>
        </View>
      )}
    </BottomSheetContext.Provider>
  );
};
