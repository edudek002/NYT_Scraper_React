import React from "react";


const Jumbotron = ({ children }) => (
  <div
    style={{ height: 150, clear: "both", paddingTop: 120, textAlign: "center", background: "lightblue" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
