import {
  Paper,
  Box,
  TextField,
  Button,
  MenuItem,
  Modal,
  Typography,
  Select,
} from "@mui/material";
import ResponsiveAppBar from "../components/Appbar";
import { useEffect, useState } from "react";
import { Add, DeleteForever } from "@mui/icons-material";
import axios from "axios";
export default function Buildform(props: {
  setAuthenticated: any;
  authenticated: any;
  setEmail: any;
  setPassword: any;
  email: any;
  password: any;
}) {
  // const [profile, setProfile] = React.useState(localStorage.getItem("formit.userProfile") || "{}");
  function wipeUser() {
    localStorage.removeItem("formit.sessionInfo");
    window.location.reload();
  }
  const [open, setOpen] = useState(false);
  const handleclick = () => {
    setQuestionModel({
      ...questionModel,
      label: "",
      type: "chk",
      count: 1,
      options: ["Default"],
      required: false,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [formModel, setFormModel] = useState<{
    title: string;
    description: string;
    count: number;
    fields: [
      {
        label: string;
        type: string;
        count: number;
        options: string[];
        required: boolean;
      }
    ];
  }>({
    title: "DummyTitle",
    description: "DummyDescription",
    count: 1,
    fields: [
      {
        label: "Dummy",
        type: "chk",
        count: 1,
        options: ["Default"],
        required: false,
      },
    ],
  });
  function validate() {
    if (formModel.title.length < 4) {
      return "Need Title with at least 4 characters";
    } else if (formModel.description.length < 10) {
      return "Need Description with at least 10 characters";
    } else if (formModel.fields.length < 1) {
      return "Need at least one field";
    } else {
      return "OK";
    }
  }
  function saveForm() {
    console.log(formModel);
    let resp = validate();
    if (resp === "OK") {
      axios({
        method: "post",
        url: process.env.REACT_APP_API + "createForm/",
        data: {
          formData:formModel,
          email: props.email,
          password: props.password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.statusText === "OK") {
            alert("Form Created");
            window.location.reload();
          } else {
            alert("Bug");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error");
        });
    } else {
      alert(resp);
    }
  }
  const [questionModel, setQuestionModel] = useState<{
    label: string;
    type: string;
    count: number;
    options: string[];
    required: boolean;
  }>({
    label: "Dummy",
    type: "chk",
    required: false,
    count: 1,
    options: [""],
  });
  useEffect(() => {
    console.log("renr");
  }, [questionModel.options.length]);
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
            flexDirection: "column",
            width: "70%",
            maxWidth: "700px",
            margin: "auto",
            marginTop: "50px",
          }}
        >
          <TextField
            placeholder="Sample Title"
            InputProps={{ style: { fontSize: "30px" } }}
            fullWidth
            variant="standard"
            onChange={(e) => {
              setFormModel({ ...formModel, title: e.target.value });
            }}
          ></TextField>
          <TextField
            multiline
            placeholder="Sample Description"
            InputProps={{ style: { marginBottom: "50px" } }}
            fullWidth
            variant="standard"
            maxRows={2}
            onChange={(e) => {
              setFormModel({ ...formModel, description: e.target.value });
            }}
          ></TextField>
          <span
            style={{
              display: "flex",
              justifyContent: "centre",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {formModel.fields.map((field, index) => {
              return (
                <Box
                  sx={{
                    boxShadow: `rgba(0, 0, 0, 0.25) 0px 25px 50px -12px`,
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <Typography>{index + 1 + field.label}</Typography>
                  {field.options.map((option, i) => {
                    return (
                      <Box>
                        <Typography>
                          {"{" + String.fromCharCode(i + 65) + "}" + option}
                        </Typography>
                      </Box>
                    );
                  })}
                  <span>
                    <Button
                      onClick={() => {
                        formModel.fields.splice(index, 1);
                        setFormModel({
                          ...formModel,
                          fields: [...formModel.fields],
                        });
                      }}
                    >
                      <DeleteForever />
                    </Button>
                  </span>
                </Box>
              );
            })}
          </span>
          <span
            style={{
              display: "flex",
              justifyContent: "centre",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Button
              onClick={handleclick}
              sx={{
                width: "60%",
                margin: "10px auto",
              }}
              variant="contained"
              color="success"
            >
              <Add />
            </Button>
          </span>
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                minHeight: "70vh",
                // maxHeight: "70vh",
                overflowY: "auto",
                marginTop: "100px",
                marginBottom: "100px",
              }}
            >
              <TextField
                fullWidth
                variant="standard"
                placeholder="Question Label"
                onChange={(e) => {
                  setQuestionModel({ ...questionModel, label: e.target.value });
                }}
              />
              <Select
                size="small"
                variant="standard"
                fullWidth
                value={questionModel.type}
                onChange={(e) =>
                  setQuestionModel({ ...questionModel, type: e.target.value })
                }
              >
                <MenuItem value="chk">Checkbox</MenuItem>
                <MenuItem value="dpdn">Dropdown</MenuItem>
              </Select>
              {
                //loop
                Array.from({ length: questionModel.count }).map((_, i) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TextField
                      key={i}
                      sx={{
                        margin: "5px",
                      }}
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="Option"
                      onChange={(e) => {
                        questionModel.options[i] = e.target.value;
                        setQuestionModel({
                          ...questionModel,
                          options: [...questionModel.options],
                        });
                        // console.log(questionModel);
                      }}
                    ></TextField>
                    <Button
                      disabled={i === 0}
                      onClick={() => {
                        questionModel.options.splice(i, 1);
                        questionModel.count--;
                        setQuestionModel({ ...questionModel });
                        // console.log(questionModel);
                      }}
                    >
                      <DeleteForever />
                    </Button>
                  </div>
                ))
              }
              <Button
                onClick={() => {
                  setQuestionModel({
                    ...questionModel,
                    count: questionModel.count + 1,
                  });
                }}
                fullWidth
              >
                Add Options
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  formModel.fields.push(questionModel);
                  setFormModel({
                    ...formModel,
                    count: formModel.count + 1,
                    fields: [...formModel.fields],
                  });
                }}
                fullWidth
              >
                Confirm
              </Button>
            </Box>
          </Modal>
          <Button
            sx={{
              width: "60%",
              margin: "auto",
              marginTop: "300px",
              marginBottom: "100px",
            }}
            onClick={() => {
              saveForm();
            }}
            variant="contained"
            color="primary"
          >
            SAVE FORM
          </Button>
        </div>
      </Paper>
    </Paper>
  );
}
