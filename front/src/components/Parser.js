import { text } from "./text.js";

import React, { useState, useEffect } from "react";

import { dbApi } from "../hooks/dp_api";
import JSON5 from "json5";
import { useLocation } from "react-router-dom";

const Parser = () => {
  const [tokens, setTokens] = useState({});
  const { sendText } = dbApi();
  const { state } = useLocation();

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <div>
      <div class="container">
        <h1 class="text-center my-5">Text Content</h1>
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <p class="lead text-center">{state}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parser;
