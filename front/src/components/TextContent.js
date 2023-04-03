import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

// This page will display the content of the text
const TextContent = () => {
  // state variable is the text content to display
  const { state } = useLocation();

  return (
    <div>
      <div class="container">
        <h1 class="text-center my-5">Text Content</h1>
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <p class="lead text-center">{state}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextContent;
