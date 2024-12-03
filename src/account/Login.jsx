import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Grid,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem as ManuI,
  Paper,
  Typography,
  TextField,
  Modal,
  Autocomplete,
  Button,
  Box,
  createFilterOptions,
} from "@mui/material";
import animationData from "../Assets/Login.json";
import Lottie from 'react-lottie';
import * as Yup from "yup";

import { accountService, alertService } from "@/_services";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  color: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "0 30px",
  },
}));

function Login({ history, location }) {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  function onSubmit({ email, password }, { setSubmitting }) {
    alertService.clear();
    accountService
      .login(email, password)
      .then(() => {
        const { from } = location.state || { from: { pathname: "/" } };
        history.push(from);
        debugger;
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const classes = useStyles();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <div className={classes.root}>
            <Grid
              container
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item={12} xs>
              <Lottie options={defaultOptions}
              height={400}
              width={400}
             />
              </Grid>
              <Grid item={12} xs className={classes.color}>
                <div className="card-body">
                  <div className="form-group">
                    <label>Email</label>
                    <Field
                      name="email"
                      type="text"
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                        {isSubmitting && (
                          <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        Login
                      </button>
                      <Link to="register" className="btn btn-link">
                        Register
                      </Link>
                    </div>
                    <div className="form-group col text-right">
                      <Link to="forgot-password" className="btn btn-link pr-0">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { Login };
