import React, { useState } from "react";
import JSON5 from "json5";
import Image from "./wordsearch.jpg";
import { useNavigate } from "react-router-dom";
import { dbApi } from "../hooks/dp_api";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [disabled, setDisabled] = useState("");
  const [results, setResults] = useState([]);
  const { searchWord } = dbApi();

  let navigate = useNavigate();
  const routeChange = (key) => {
    // console.log("key => ", key);
    const content = results[key].content;
    const path = `/parser`;
    navigate(path, { state: content });
  };
  const { sendText } = dbApi();

  const startIndexation = () => {
    setDisabled("true");
    sendText()
      .then((data) => {
        setDisabled("");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSearch = async () => {
    try {
      searchWord(query)
        .then((data) => {
          const object = JSON5.parse(data);
          console.log(" Received data => ", object);
          setResults(object);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClick = (item) => {
    console.log(item);
  };

  return (
    <div className="container">
      <button
        class="btn btn-danger btn-lg position-absolute top-0 end-0 m-5"
        disabled={disabled}
        onClick={startIndexation}
      >
        Index
      </button>

      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="input-group" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center mt-5">
              <img
                src={Image}
                style={{ marginTop: "50px", borderRadius: "50px" }}
                alt="wordsSearchImg"
              ></img>
              <input
                style={{ marginTop: "30px", borderRadius: "50px" }}
                type="text"
                className="col-md-6 form-control"
                placeholder="Search for something..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  style={{
                    width: "150px",
                    marginTop: "20px",
                    borderRadius: "50px",
                  }}
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div class="col-8 col-sm-8 col-md-8">
          <div class="card">
            <div class="card-body">
              <div class="media-list position-relative">
                <div
                  class="table-responsive"
                  id="project-team-scroll"
                  tabindex="1"
                >
                  {results.length > 0 && (
                    <table class="table table-hover table-s ">
                      <thead>
                        <tr>
                          <th>File Name</th>
                          <th>Word Frequence</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((item, key) => (
                          <tr key={item.texte_title}>
                            <td class="text-truncate">{item.texte_title}</td>
                            <td class="text-truncate">{item.frequences}</td>
                            <td class="text-truncate">
                              {" "}
                              <button
                                className="btn btn-success"
                                type="button"
                                onClick={() => routeChange(key)}
                              >
                                Content
                              </button>{" "}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
