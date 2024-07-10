import React from "react";
import { Link } from "react-router-dom";
import "../styles/Breadcrumb.scss";

const Breadcrumb = ({ paths }) => {
  return (
    <div className="breadcrumb">
      {paths.map((path, index) => (
        <span key={index}>
          {path.url ? (
            <Link to={path.url}>{path.name}</Link>
          ) : (
            <span>{path.name}</span>
          )}
          {index < paths.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
