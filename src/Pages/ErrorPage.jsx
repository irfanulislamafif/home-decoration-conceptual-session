import React from "react";
import { useRouteError } from "react-router"; // or "react-router-dom"

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Oops! Something went wrong.</h1>
      <p style={{ color: "red", fontSize: "20px" }}>
        {error.statusText || error.message}
      </p>
    </div>
  );
};

export default ErrorPage;
