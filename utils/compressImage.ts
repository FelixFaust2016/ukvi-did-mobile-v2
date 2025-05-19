import * as ImageManipulator from "expo-image-manipulator";

export const compressAndConvertToBase64 = async (uri: string) => {
  try {
    const manipulated = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }], // no resize actions
      {
        compress: 0.1, // Reduce size (0.1–1.0)
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );

    console.log("Compressed + base64 size:", manipulated.base64?.length);
    return manipulated.base64 ?? null;
  } catch (err) {
    console.error("Image manipulation error:", err);
  }
};
