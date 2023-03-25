import React, { useState } from "react";
import { dbApi } from "../hooks/dp_api";
import JSON5 from "json5";
import Image from "./wordsearch.jpg";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { searchWord } = dbApi();

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `newPath`;
    navigate(path);
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
                        {results.map((item) => (
                          <tr key={item.texte_title}>
                            <td class="text-truncate">{item.texte_title}</td>
                            <td class="text-truncate">{item.frequences}</td>
                            <td class="text-truncate">
                              {" "}
                              <button
                                className="btn btn-success"
                                type="button"
                                onClick={handleSearch}
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
