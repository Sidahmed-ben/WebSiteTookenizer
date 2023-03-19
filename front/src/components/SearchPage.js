import React, { useState } from "react";
import axios from "axios";
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
          console.log(" Received data => ", data);
        })
        .catch((error) => {
          console.error(error);
        });
      setResults([{ id: 0, name: "Sidahmed", count: 10 }]);
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

      {results.length > 0 && (
        <div className="row mt-5">
          <div className="col-md-6">
            <ul className="list-group">
              {results.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={() => handleItemClick(item)}
                >
                  {item.name}
                  <span className="badge badge-primary badge-pill">
                    {item.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
