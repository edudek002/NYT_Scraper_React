import React from "react";


const Jumbotron = ({ children }) => (
  <div
    style={{ height: 120, clear: "both", paddingTop: 40, textAlign: "center", background: "lightblue" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
