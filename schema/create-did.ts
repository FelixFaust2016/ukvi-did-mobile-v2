import * as Yup from "yup";

export const create_did_schema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required").min(3)
    .matches(/^[A-Za-z]+$/, "Only letters allowed").trim(),
  middleName: Yup.string()
    .required("Middle name is required").min(3)
    .matches(/^[A-Za-z]*$/, "Only letters allowed").trim(),
  lastName: Yup.string()
    .required("Last name is required").min(3)
    .matches(/^[A-Za-z]+$/, "Only letters allowed").trim(),
});
