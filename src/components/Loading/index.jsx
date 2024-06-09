import React from "react";
import localization from "../../localization/en/index.json";

function Loading({ isLoading, error, children }) {

  return isLoading ? (
    <div className="loading-container"> {localization.loading_text} </div>
  ) : error ? (
    <div className="loading-container" > {localization.error_text} </div>
  ) : (
    <div className="content-container">{children}</div>
  );
}

export default Loading;
