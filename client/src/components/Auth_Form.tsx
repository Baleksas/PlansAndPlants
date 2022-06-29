import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Box,
  Button, Link
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { CREATE_USER } from "../graphql/Mutations";
import { LOGIN } from "../graphql/Queries";
import { InputField } from "./InputField";
import Layout from "./Layout";

const Auth_Form = () => {
  const [createUserFc, userObject] = useMutation(CREATE_USER);
  const [isLogin, setIsLogin] = useState(false);

  const [loginFc, loginObject] = useLazyQuery(LOGIN);

  const changeStatus = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Layout variant="regular">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (isLogin) {
            // login
            try {
              await loginFc({
                variables: {
                  email: values.email,
                  password: values.password,
                },
              });
            } catch (error) {
              throw error;
            }
          } else {
            // register
            try {
              await createUserFc({
                variables: { email: values.email, password: values.password },
              });
            } catch (error) {
              throw error;
            }
          }
        }}
      >
          <Form>
            <Box m={2}>
              <InputField
                name="email"
                label="email"
                id="email"
              />
            </Box>
            <Box m={2}>
              <InputField
                name="password"
                id="password"
                label="password"
                type="password"
              />
            </Box>
            <Box m={1}>
              <Button type="submit" variant="contained">
                {isLogin ? "Login" : "Register"}
              </Button>
              <Link m={1} variant="body2" onClick={changeStatus}>
                {isLogin
                  ? "Don't have an account yet? Register"
                  : "Already have an account? Login"}
              </Link>
            </Box>
          </Form>
      </Formik>
    </Layout>
  );
};

export default Auth_Form;
