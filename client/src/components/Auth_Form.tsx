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
  Link,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { LOGIN } from "../graphql/Queries";

const Auth_Form = ({email, password}:any) => {
  // const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const [isLogin, setIsLogin]=useState(false)

  const {data, loading,error, refetch} = useQuery(LOGIN,{
    variables: {
       email:email, password:password
    }
  });
  
  const changeStatus=()=>{
     setIsLogin((prev)=>!prev)
  }

  return (
    <Layout variant="regular">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (!isLogin){
            // register
            // await createUser({
            //   variables: { email: values.email, password: values.password },
            // });
          }
          else {
            // login
            await refetch({
              email:values.email, password:values.password
            })
            console.log("data:",data)
            console.log("error:",error)

          }
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
          <Form >
            <Box m={2}>
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
            </Box>
            <Box m={2}>
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
            <Box m={1}>
            <Button type="submit" variant="contained">
              {isLogin? "Login" : "Register"}
            </Button>
            <Link m={1} variant="body2" onClick={changeStatus}>
              {isLogin? "Don't have an account yet? Register" : "Already have an account? Login"}
            </Link>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Auth_Form;
