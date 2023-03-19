import { text } from "./text.js";

import React, { useState, useEffect } from "react";

import { dbApi } from "../hooks/dp_api";
import { Utils } from "../utils/utils.js";
import JSON5 from "json5";

const Parser = () => {
  const [tokens, setTokens] = useState({});
  const { sendText } = dbApi();
  const { readDirectory } = Utils();

  useEffect(() => {
    const titre = "monTitre";
    sendText(titre, text)
      .then((data) => {
        const object = JSON5.parse(data);
        setTokens(object);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>
        <br></br>
        Paragraphe :<br></br>
        <br></br>
        {text}
      </h2>
      <br></br>
      <br></br>
      <br></br>
      <table
        style={{ width: "500px", margin: "auto" }}
        className="table table-bordered table-striped"
      >
        <thead>
          <tr>
            <th>Mots</th>
            <th>Fréquences</th>
          </tr>
        </thead>
        <tbody>
          {tokens &&
            Object.entries(tokens).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Parser;
