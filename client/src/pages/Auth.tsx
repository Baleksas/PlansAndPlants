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

const Auth = () => {
  const [createUserFc, userObject] = useMutation(CREATE_USER);
  const [isLogin, setIsLogin] = useState(false);
  const [loginFc, loginObject] = useLazyQuery(LOGIN);

  // Redux
  const user = useSelector((state: RootState) => state.token);
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
            try {
              await loginFc({
                variables: {
                  email: values.email,
                  password: values.password,
                },
              }).then((loginData) => {
                dispatch(changeToken(loginData.data.login));
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
          <Box>
            {user.token ? `${user.token}` : "no token"}
            <br />
            {user.userId ? `${user.userId}` : "no userId"}
          </Box>
          <Box m={2}>
            <InputField name="email" label="email" id="email" />
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
