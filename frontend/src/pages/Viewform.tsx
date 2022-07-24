import { DeleteForever, LinkSharp } from "@mui/icons-material";
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  Typography,
  SelectChangeEvent,
  Chip,
  Card,
  Badge,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/Appbar";

type FormData = {
  title: string;
  description: string;
  fields: Array<{
    label: string;
    type: string;
    opts: Array<string>;
  }>;
  submissions: Array<{
    name: string;
    responses: Array<any>;
  }>;
};

export default function Viewform(props: {
  setAuthenticated: any;
  authenticated: any;
  setEmail: any;
  setPassword: any;
  email: any;
  password: any;
}) {
  const [value, setValue] = useState("0");
  const [reload, setReload] = useState(false);
  const [data, setData] = useState<FormData>({
    title: "",
    description: "",
    fields: [],
    submissions: [],
  });
  const [formId, setFormId] = useState("");
  function wipeUser() {
    localStorage.removeItem("formit.sessionInfo");
    window.location.reload();
  }
  function handleDelete() {
    data.submissions.splice(Number(value), 1);
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "deleteResponse/",
      data: {
        id: formId,
        index: Number(value),
      },
    })
      .then((res) => {
        console.log(res);
        setValue(`${Number(value) === 0 ? Number(value) : Number(value) - 1}`);
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    setFormId(
      window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
    );
    console.log(formId);
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "getFormById/",
      data: {
        id: formId,
      },
    }).then(function (response) {
      setData(response.data.data[0]);
      console.log(response.data.data[0]);
    });
  }, [formId, reload]);
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
        <h1>
          {data.title}
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `https://code-soham.github.io/React-Form-Builder/#/form/${formId}`
              );
            }}
          >
            <LinkSharp />
          </Button>
        </h1>
        <p>{data.description}</p>
        {data.submissions.length > 0 ? (
          <>
            <Badge
             badgeContent={data.submissions.length}
             max={9}
             color="success"
              >
            <FormControl
              style={{
                width: "50%",
                minWidth: "250px",
              }}
            >
              <InputLabel id="dropdown">Select Submission</InputLabel>
              <Select
                autoFocus={true}
                labelId="dropdown-label"
                id="dropdown"
                value={value}
                label="Select Submission"
                onChange={(e: SelectChangeEvent) => {
                  setValue(e.target.value);
                  console.log(e.target.value);
                }}
              >
                {data.submissions.map((submission: any, i: number) => (
                  <MenuItem value={"" + i}>{submission.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            </Badge>
            <Button>
              <DeleteForever fontSize="large" onClick={() => handleDelete()} />
            </Button>
            <div>
              {data.fields.map((field: any, i: number) => (
                <div
                  style={{
                    minWidth: "250px",
                    width: "50%",
                    backgroundColor: "#00000014",
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    margin: "15px auto",
                    padding: "10px",
                    boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 12px`,
                    borderRadius: "5px",
                  }}
                >
                  <Typography variant="h6" overflow={"hidden"} textAlign="left">
                    {i + 1 + ".  " + field.label}
                  </Typography>
                  {field.type === "chk" ? (
                    <>
                      {data.submissions[parseInt(value)].responses[i].map(
                        (res: any, j: number) => {
                          return (
                            <Chip
                              color={res === true ? "success" : "error"}
                              size={"small"}
                              style={{
                                width: "fit-content",
                                margin: "5px auto",
                                padding: "10px",
                                boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 12px`,
                              }}
                            >
                              {field.options[j]}
                            </Chip>
                          );
                        }
                      )}
                    </>
                  ) : (
                    <>
                      <Card
                        sx={{
                          width: "fit-content",
                          margin: "5px auto",
                          padding: "10px",
                          boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 12px`,
                        }}
                      >
                        {data.submissions[parseInt(value)].responses[i]}
                      </Card>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h3>No Submissions Yet!</h3>
          </div>
        )}
      </Paper>
    </Paper>
  );
}
