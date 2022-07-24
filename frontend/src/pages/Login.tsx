import { useEffect } from "react";
import authLogin from "../utils/AuthLogin";
import {
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
export default function Login(props: {
  setAuthenticated: any;
  authenticated: any;
  setEmail: any;
  setPassword: any;
  email: any;
  password: any;
}) {
  useEffect(() => {
    let prev_session = localStorage.getItem("formit.sessionInfo");
    console.log(`${props.email}, ${props.password}, ${prev_session}`);
    console.log(process.env.REACT_APP_API)
    if (prev_session) {
      let session = JSON.parse(prev_session);
      props.setEmail(session.email);
      props.setPassword(session.password);
      console.log(session);
      authLogin(props);
    }
  });
  return (
    <Paper
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#487346",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg %3E%3Cpolygon fill='%234c8e43' points='100 57.1 64 93.1 71.5 100.6 100 72.1'/%3E%3Cpolygon fill='%236aac5f' points='100 57.1 100 72.1 128.6 100.6 136.1 93.1'/%3E%3Cpolygon fill='%234c8e43' points='100 163.2 100 178.2 170.7 107.5 170.8 92.4'/%3E%3Cpolygon fill='%236aac5f' points='100 163.2 29.2 92.5 29.2 107.5 100 178.2'/%3E%3Cpath fill='%2389CC7C' d='M100 21.8L29.2 92.5l70.7 70.7l70.7-70.7L100 21.8z M100 127.9L64.6 92.5L100 57.1l35.4 35.4L100 127.9z'/%3E%3Cpolygon fill='%23768c3a' points='0 157.1 0 172.1 28.6 200.6 36.1 193.1'/%3E%3Cpolygon fill='%2396ac58' points='70.7 200 70.8 192.4 63.2 200'/%3E%3Cpolygon fill='%23B6CC76' points='27.8 200 63.2 200 70.7 192.5 0 121.8 0 157.2 35.3 192.5'/%3E%3Cpolygon fill='%2396ac58' points='200 157.1 164 193.1 171.5 200.6 200 172.1'/%3E%3Cpolygon fill='%23768c3a' points='136.7 200 129.2 192.5 129.2 200'/%3E%3Cpolygon fill='%23B6CC76' points='172.1 200 164.6 192.5 200 157.1 200 157.2 200 121.8 200 121.8 129.2 192.5 136.7 200'/%3E%3Cpolygon fill='%23768c3a' points='129.2 0 129.2 7.5 200 78.2 200 63.2 136.7 0'/%3E%3Cpolygon fill='%23B6CC76' points='200 27.8 200 27.9 172.1 0 136.7 0 200 63.2 200 63.2'/%3E%3Cpolygon fill='%2396ac58' points='63.2 0 0 63.2 0 78.2 70.7 7.5 70.7 0'/%3E%3Cpolygon fill='%23B6CC76' points='0 63.2 63.2 0 27.8 0 0 27.8'/%3E%3C/g%3E%3C/svg%3E")`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Card
        style={{
          margin: "auto",
          top: "50%",
          left: "50%",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">LOGIN</Typography>
          <p
            style={{
              color: "red",
              fontSize: "12px",
            }}
          >
            {" "}
            {props.authenticated === false ? "Invalid Credentials" : ""}
          </p>
          <TextField
            label="Email Address"
            variant="standard"
            type={"email"}
            onChange={(e) => props.setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="standard"
            type={"password"}
            onChange={(e) => props.setPassword(e.target.value)}
          />
          <Button
            style={{ marginTop: "20px" }}
            variant="outlined"
            color="primary"
            onClick={() => authLogin(props)}
          >
            Login
          </Button>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              style={{
                textDecoration: "none",
                color: "blue",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
