import React, { useState } from "react";
import { dbApi } from "../hooks/dp_api";
import JSON5 from "json5";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { searchWord } = dbApi();

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
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for something..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-12 col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="media-list position-relative">
              <div
                class="table-responsive"
                id="project-team-scroll"
                tabindex="1"
                style={{ height: "400px", overflow: "hidden", outline: "none" }}
              >
                {results.length > 0 && (
                  <table class="table table-hover table-xl mb-0">
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
                          <td class="text-truncate"> Content </td>
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
  );
}

export default SearchPage;
