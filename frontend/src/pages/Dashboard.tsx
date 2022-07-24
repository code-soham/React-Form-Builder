import { useState, useEffect } from "react";
import { Card, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import ResponsiveAppBar from "../components/Appbar";
import { DeleteOutline } from "@mui/icons-material";
export default function Dashboard(props: {
  setAuthenticated: any;
  authenticated: any;
  setEmail: any;
  setPassword: any;
  email: any;
  password: any;
}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("Dashboard");
    if (props.authenticated) {
      localStorage.setItem(
        "formit.sessionInfo",
        JSON.stringify({ email: props.email, password: props.password })
      );
    }
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "getUser/",
      data: {
        email: props.email,
      },
    })
      .then(function (response) {
        localStorage.setItem(
          "formit.userProfile",
          JSON.stringify(response.data.data[0])
        );
        setData(response.data.data[0]["forms"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); // eslint-disable-line
  function wipeUser() {
    localStorage.removeItem("formit.sessionInfo");
    window.location.reload();
  }
  function deleteForm(id: string, name: string) {
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "deleteForm/",
      data: {
        id,
        email: props.email,
        password: props.password,
        name,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert("Form deleted successfully");
          window.location.reload();
        } else {
          alert("Error deleting form");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Paper
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#487346",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg %3E%3Cpolygon fill='%234c8e43' points='100 57.1 64 93.1 71.5 100.6 100 72.1'/%3E%3Cpolygon fill='%236aac5f' points='100 57.1 100 72.1 128.6 100.6 136.1 93.1'/%3E%3Cpolygon fill='%234c8e43' points='100 163.2 100 178.2 170.7 107.5 170.8 92.4'/%3E%3Cpolygon fill='%236aac5f' points='100 163.2 29.2 92.5 29.2 107.5 100 178.2'/%3E%3Cpath fill='%2389CC7C' d='M100 21.8L29.2 92.5l70.7 70.7l70.7-70.7L100 21.8z M100 127.9L64.6 92.5L100 57.1l35.4 35.4L100 127.9z'/%3E%3Cpolygon fill='%23768c3a' points='0 157.1 0 172.1 28.6 200.6 36.1 193.1'/%3E%3Cpolygon fill='%2396ac58' points='70.7 200 70.8 192.4 63.2 200'/%3E%3Cpolygon fill='%23B6CC76' points='27.8 200 63.2 200 70.7 192.5 0 121.8 0 157.2 35.3 192.5'/%3E%3Cpolygon fill='%2396ac58' points='200 157.1 164 193.1 171.5 200.6 200 172.1'/%3E%3Cpolygon fill='%23768c3a' points='136.7 200 129.2 192.5 129.2 200'/%3E%3Cpolygon fill='%23B6CC76' points='172.1 200 164.6 192.5 200 157.1 200 157.2 200 121.8 200 121.8 129.2 192.5 136.7 200'/%3E%3Cpolygon fill='%23768c3a' points='129.2 0 129.2 7.5 200 78.2 200 63.2 136.7 0'/%3E%3Cpolygon fill='%23B6CC76' points='200 27.8 200 27.9 172.1 0 136.7 0 200 63.2 200 63.2'/%3E%3Cpolygon fill='%2396ac58' points='63.2 0 0 63.2 0 78.2 70.7 7.5 70.7 0'/%3E%3Cpolygon fill='%23B6CC76' points='0 63.2 63.2 0 27.8 0 0 27.8'/%3E%3C/g%3E%3C/svg%3E")`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Paper
        style={{
          margin: "15px auto",
          width: "95%",
          minHeight: "95vh",
        }}
      >
        <ResponsiveAppBar wipeUser={wipeUser} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "auto",
          }}
        >
          {data.length > 0 ? (
            data.map((item: any) => (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "50px",
                  flexDirection: "column",
                }}
              >
                <Link
                  key={item.id}
                  to={`/dashboard/viewform/${item.id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Card
                    style={{
                      width: "150px",
                      height: "150px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      backgroundColor: "#2DB604",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%235AFF24' stroke-width='70.5' stroke-opacity='0.06' %3E%3Ccircle fill='%232DB604' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%232cac06' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%232ba307' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%232a9a08' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23299009' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%2328870a' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23267e0a' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%2325750b' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23236d0b' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%2321640b' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%231f5b0b' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%231d530a' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%231b4b0a' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23194309' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23173b08' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23153307' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23132b04' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23112401' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundAttachment: "fixed",
                      backgroundSize: "cover",
                      color: "white",
                    }}
                  >
                    <h3>{item.title}</h3>
                  </Card>
                </Link>
                <Button
                  style={{
                    backgroundColor: "purple",
                    width: "100%",
                    padding: "0",
                    margin: "0",
                  }}
                  onClick={() => {
                    deleteForm(item.id, item.name);
                  }}
                >
                  <DeleteOutline htmlColor="#fff" />
                </Button>
              </span>
            ))
          ) : (
            <h1>No Forms</h1>
          )}
        </div>
      </Paper>
    </Paper>
  );
}
