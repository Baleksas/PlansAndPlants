import { useLazyQuery, useMutation } from "@apollo/client";
import { Box, Button, Link } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { CREATE_USER } from "../graphql/Mutations";
import { LOGIN } from "../graphql/Queries";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import { RootState } from "../utils/reduxStore";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeToken } from "../features/tokenSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { toErrorMap } from "../utils/toErrorMap";

const Auth = () => {
  const navigate = useNavigate();

  const [createUserFc, userObject] = useMutation(CREATE_USER);
  const [isLogin, setIsLogin] = useState(false);
  const [loginFc, loginObject] = useLazyQuery(LOGIN);

  const dispatch = useDispatch();

  const changeStatus = () => {
    setIsLogin((prev: any) => !prev);
  };

  return (
    <Layout variant="regular">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (isLogin) {
            // login
            
              // Graphql login function. Returns authdata if sucessfull
              const response= await loginFc({
                variables: {
                  email: values.email,
                  password: values.password,
                },
                // Changes redux state to current logged in user details (userid, token and expiresIn)
              })
              if (!response.data){
                console.log("There was an error. Please try again")
              }
              else{
                dispatch(changeToken(response.data.login));
                navigate("/")
              }
          } else {
            // register
            try {
              // creates user in database
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
            <InputField name="email" label="Email" id="email" />
          </Box>
          <Box m={2}>
            <InputField
              name="password"
              id="password"
              label="Password"
              type="password"
            />
          </Box>
          <Box m={1}>
            <Button type="submit" variant="contained">
              {isLogin ? "Login" : "Register"}
            </Button>
            <Link
              component="button"
              type="button"
              m={1}
              variant="body2"
              onClick={changeStatus}
            >
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

export default Auth;

// TODO: implement redux, store token, route pages with react-router-redux
