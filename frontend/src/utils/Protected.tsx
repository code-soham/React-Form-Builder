import { Navigate } from "react-router-dom";
function Protected(props: { redirect: any; path: any; children: any}) {
  if (props.redirect) {
    return <Navigate to={props.path} replace />;
  } else {
    return props.children;
  }
}
export default Protected;
