import axios from "axios";
export default function authLogin(props: {
  email: any;
  password: any;
  setAuthenticated: any;
}) {
  axios({
    method: "post",
    url: "http://localhost:8000/auth/",
    data: {
      email: props.email,
      password: props.password,
    },
  })
    .then(function (response) {
      props.setAuthenticated(response.data.response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
