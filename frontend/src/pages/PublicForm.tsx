import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Card,
  Checkbox,
  TextField,
  Toolbar,
  List,
  MenuItem,
  ListItem,
  ListItemText,
  Button,
  Select,
  AppBar,
  SelectChangeEvent,
} from "@mui/material";
import { AdbRounded } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
export default function PublicForm() {
  const [form, setForm] = useState<any>({});
  const [response, setResponse] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [checked, setChecked] = useState<any>(true);//eslint-disable-line
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  useEffect(() => {
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "getFormById/",
      data: {
        id: id,
      },
    })
      .then((res) => {
        setForm(res.data.data[0]);
        console.log(res.data.data[0]);
        let arr: Array<any> = [];
        for (let i = 0; i < res.data.data[0].fields.length; i++) {
          if (res.data.data[0].fields[i].type === "chk") {
            arr.push([]);
            for (
              let j = 0;
              j < res.data.data[0].fields[i].options.length;
              j++
            ) {
              arr[i].push(false);
            }
          } else {
            arr.push("");
          }
        }
        setResponse(arr);
        console.log(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);// eslint-disable-line
  useEffect(() => {
    // console.log(response);
  }, [response]);
  function validate() {
    let valid = true;
    if (name === "") {
      valid = false;
      return valid;
    }
    for (let i = 0; i < form.fields.length; i++) {
      if (form.fields[i].required === true) {
        if (form.fields[i].type === "chk") {
          let count = 0;
          for (let j = 0; j < form.fields[i].options.length; j++) {
            if (response[i][j] === true) {
              count++;
            }
          }
          if (count === 0) {
            valid = false;
            return valid;
          }
        } else {
          if (response[i] === "") {
            valid = false;
            return valid;
          }
        }
      }
    }
    return true;
  }
  function submitForm() {
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "submitForm/",
      data: {
        id: id,
        name: name,
        submission: response,
      },
    })
      .then((res) => {
        console.log(res);
        alert("Form submitted successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
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
          maxWidth: "800px",
          width: "95%",
          minHeight: "95vh",
        }}
      >
        <AppBar position="relative" color="transparent">
            <Toolbar>
            <Link to="/" style={{
                textDecoration: "none",
                margin:"auto"
            }}>
                <AdbRounded  htmlColor="#487346"></AdbRounded>
            </Link>
            </Toolbar>
        </AppBar>
        <Card
          sx={{
            margin: "10px",
            padding: "10px",
          }}
        >
          <Typography variant="h4" component={"h4"} align="left">
            {form.title}
          </Typography>
          <Typography variant="h5" component={"h5"} align="left">
            {form.description}
          </Typography>
        </Card>
        <Card
          sx={{
            margin: "10px",
            padding: "10px",
          }}
        >
          <Typography variant="body1" component={"p"} align="left">
            <>
              {" "}
              Name <span style={{ color: "red" }}>*</span>
            </>
          </Typography>
          <TextField
            required
            sx={{ float: "left" }}
            fullWidth
            size="small"
            onChange={(e) => {
              setName(e.target.value);
            }}
            variant="filled"
          ></TextField>
        </Card>
        {form?.fields?.map((field: any, i: number) => {
          return (
            <Card
              sx={{
                margin: "10px",
                padding: "10px",
              }}
            >
              <Typography variant="body1" component={"p"} align="left">
                {field.label}{" "}
                {field.required ? (
                  <span style={{ color: "red" }}>*</span>
                ) : (
                  <></>
                )}
              </Typography>
              {field.type === "chk" ? (
                <List>
                  {field.options.map((option: string, j: number) => {
                    return (
                      <ListItem>
                        <Checkbox
                          size="small"
                          sx={{ padding: "0px" }}
                          edge="start"
                          onChange={() => {
                            setChecked(!response[i][j]);
                            response[i][j] = !response[i][j];
                          }}
                          checked={response[i][j]}
                        />
                        &nbsp;
                        <ListItemText primary={option} >
                          {option}
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <Select
                  fullWidth
                  size="small"
                  value={response[i]}
                  onChange={(e: SelectChangeEvent) => {
                    setChecked(false);
                    response[i] = e.target.value;
                  }}
                >
                  {field.options.map((option: any, j: number) => {
                    return <MenuItem value={option}>{option}</MenuItem>;
                  })}
                </Select>
              )}
            </Card>
          );
        })}
        <Button
          variant="contained"
          sx={{ float: "left", left: "15px" }}
          onClick={() => {
            console.log(response);
            if (validate()) {
              submitForm();
            } else {
              alert("Please Fill all the required fields");
            }
          }}
        >
          SUBMIT
        </Button>
      </Paper>
    </Paper>
  );
}
