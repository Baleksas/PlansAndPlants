import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, {useEffect} from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import Layout from "./Layout";
import { Form, Formik } from "formik";
import { InputField } from "./InputField";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  useMutation,
} from "@apollo/client";
import {useQuery,gql} from '@apollo/client'
import { onError } from "@apollo/client/link/error";
import {CREATE_USER} from  '../graphql/Mutations'
import { GET_EVENTS } from "../graphql/Queries";


const Auth_Form = () => {
  
  const [mutateFunction, { data, loading, error }]= useMutation(CREATE_USER)
  // const {data,loading,error}=useQuery(GET_EVENTS)

  return (
    <Layout variant="regular">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={
          async ()=>{
            console.log('submitting')
            await mutateFunction({variables: {email: "alexas3", password:"alexas3"}})
            console.log('after')

          }
        }
        
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
            <InputField
              name="email"
              placeholder="email"
              // id="email"
              label="Email"
            />
            <Box mt={4}>
              <InputField
                // error={}
                // helperText="Incorrect password."
                name="password"
                // id="password"
                type="password"
                label="Password"
              />
            </Box>
            {/* <Box mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto">Forgot password?</Link>
              </NextLink>
            </Box> */}
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Auth_Form;
