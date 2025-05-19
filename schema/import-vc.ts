import * as Yup from "yup";

export const importVC = Yup.object().shape({
  cid: Yup.string().required("Content Identifier is required").trim(),
});
