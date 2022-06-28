import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import Layout from "./Layout";
import { Form, Formik } from "formik";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  useMutation,
} from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { CREATE_USER } from "../graphql/Mutations";
import { InputField } from "./InputField";

const Auth_Form = () => {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  return (
    <Layout variant="regular">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          await createUser({
            variables: { email: values.email, password: values.password },
          });
        }}

        // onSubmit={async (values, { setErrors }) => {
        //   const response = await login(values);
        //   if (response.data?.login.errors) {
        //     setErrors(toErrorMap(response.data.login.errors));
        //   } else if (response.data?.login.user) {
        //     if (typeof router.query.next === "string") {
        //       router.push(router.query.next || "/");
        //     } else {
        //       // worked
        //       router.push("/");
        //     }
        //   }
        // }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <InputField
                name="email"
                placeholder="email"
                id="email"
                label="Email"
                // error={!!error}
                // helperText={error?.message}
              />
            </FormControl>

            <Box mt={4}>
              <FormControl>
                <InputField
                  // error={}
                  // helperText="Incorrect password."
                  name="password"
                  id="password"
                  type="password"
                  label="Password"
                />
              </FormControl>
            </Box>
            {/* <Box mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto">Forgot password?</Link>
              </NextLink>
            </Box> */}
            <Button type="submit" variant="contained">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Auth_Form;
