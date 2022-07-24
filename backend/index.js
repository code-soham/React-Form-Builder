const express = require("express");
require("dotenv").config();
require("./db/dbconfig");
const User = require("./models/user");
const Form = require("./models/form");
var cors = require("cors");
const bcrypt = require("bcrypt");
ObjectId = require("mongodb").ObjectID;
const saltRounds = 10;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("formIt Backend");
});
app.post("/auth/", async (req, res) => {
  //authenticate user
  var response = await authenticate(req.body);
  res.send({ response: response });
});
app.post("/addUser/", async (req, res) => {
  //add user
  var response = await findUser(req.body.email);
  console.log(response);
  if (response === true) {
    res.send({
      success: false,
      msg: "User Exists",
    });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      name: req.body.name,
    });
    newUser.save((err) => {
      if (err) {
        res.send({
          success: false,
          msg: "Failed to Save",
        });
        console.log(err);
      } else {
        res.send({
          success: true,
          msg: "User Created",
        });
      }
    });
  }
});
app.post("/createForm/", async (req, res) => {
  //create form
  let valid = await authenticate(req.body);
  if (valid === true) {
    let response = await makeForm(req.body);
    console.log(response, "id");
    res.send({
      success: true,
      msg: "Form Created",
    });
  } else {
    res.send({
      success: false,
      msg: "Invalid Credentials",
    });
  }
});

app.post("/getFormById/", async (req, res) => {
  //get form by id
  var response = await getForm(req.body.id);
  console.log(response);
  if (response.length === 0) {
    res.send({
      success: false,
      data: response,
    });
  } else {
    res.send({
      success: true,
      data: response,
    });
  }
});
app.post("/submitForm/", async (req, res) => {
  //submit form

  try {
    let response = await submitForm(req.body);
    res.send({
      msg: response,
    });
  } catch (err) {
    res.send({
      msg: err,
    });
  }
});
app.post("/getUser/", async (req, res) => {
  //get user "
  var response = await getUser(req.body.email);
  if (response.length === 0) {
    res.send({
      success: false,
      data: response,
    });
  } else {
    response[0].password = "";
    res.send({
      success: true,
      data: response,
    });
  }
});
app.post("/deleteResponse/", async (req, res) => {
  //delete response
  var response = await deleteResponse(req.body);
  console.log(req.body);
  res.send({
    msg: response,
  });
});
app.listen(process.env.PORT || 8000, async () => {
  console.log(`Listening on PORT ${process.env.PORT || 8000}`);
});
app.post("/deleteForm/", async (req, res) => {
  let valid = await authenticate(req.body);
  if (valid === true) {
    let response = (await deleteForm(req.body)) && (await unlink(req.body));

    console.log(response, req.body.id);
    if (response === "Form Deleted") {
      res.send({
        success: true,
        msg: "Form Deleted",
      });
    } else {
      res.send({
        success: false,
        msg: "Failed to Delete",
      });
    }
  } else {
    res.send({
      success: false,
      msg: "Invalid Credentials",
    });
  }
});
//functions
async function deleteForm(obj) {
  console.log(obj);
  let data = await Form.find({
    _id: obj.id,
  });
  if (data.length === 0) return "Form Not Found";
  else {
    let resp = await Form.find({
      _id: obj.id,
    }).deleteOne();
    return resp ? "Form Deleted" : "Failed to Delete";
  }
}
async function unlink(obj) {
  let data = await User.find({
    email: obj.email,
  }).updateOne({
    $pull: {
      forms: { id: obj.id, name: obj.name },
    },
  });
  console.log("data:", data);
  return data;
}
async function deleteResponse(obj) {
  try {
    let response = await Form.findOne({ _id: obj.id });
    console.log(response);
    response.submissions.splice(obj.index, 1);
    let resp = await Form.find({ _id: obj.id }).updateOne({
      $set: {
        submissions: response.submissions,
      },
    });
    if (resp) return "Success";
    else return "Error";
  } catch (err) {
    return err;
  }
}
async function getUser(obj) {
  return await User.find({ email: obj });
}
async function submitForm(obj) {
  let data = await Form.find({
    _id: obj.id,
  });
  if (data.length === 0) return "Form Not Found";
  else {
    let resp = await Form.find({
      _id: obj.id,
    }).updateOne({
      $push: {
        submissions: {
          responses: obj.submission,
          name: obj.name,
          date: Date.now(),
        },
      },
    });
    if (resp) return "Success";
    else return "Error";
  }
}
async function getForm(obj) {
  let data = await Form.find({
    _id: obj,
  });
  return data;
}
async function makeForm(obj) {
  let uid;
  const newForm = new Form({
    title: obj.formData.title,
    description: obj.formData.description,
    fields: obj.formData.fields,
  });
  newForm.save(async (err, form) => {
    if (err) {
      console.log(err);
      return "err";
    } else {
      var cnf = await tagUser(obj.email, form._id, form.title);
      console.log(cnf);
      if (cnf !== null) return cnf;
      else return "Cant Link";
    }
  });
}
async function tagUser(user, uid, title) {
  let resp = await User.find({
    email: user,
  }).updateOne({
    $push: {
      forms: { id: uid.toString(), title },
    },
  });
  if (resp) return uid.toString();
  else return null;
}
async function authenticate(obj) {
  let data = await User.find({
    email: obj.email,
  });
  return data.length === 1 && bcrypt.compare(obj.password, data[0].password);
}
async function findUser(obj) {
  let data = await User.find({
    email: obj,
  });
  //   console.log(data.length);
  if (data.length !== 0) return true;
  else return false;
}
