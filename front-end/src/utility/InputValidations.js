import * as yup from "yup";

export let registerInputValidation = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required!")
    .min(3, "First name must be at least 3 characters long"),
  lastName: yup.string().required("Last Name is required!"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required!"),
  password: yup
    .string()
    .required("password is required")
    .min(6)
    .min(6, "Password must be at least 6 characters long "),
});

export let loginInputValidation = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required!"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "Password must be at least 6 characters long "),
});

export let blogInputValidation = yup.object().shape({
  title: yup.string().required("Title is required!"),
  content: yup
    .string()
    .required("content is required")
    .min(10, "content must be at least 10 characters long "),
    tags: yup.string().required("tags are required!"),
});

