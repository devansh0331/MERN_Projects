import React, { useState } from "react";
import "./ErrorWorld.css";

function ErrorWorld() {
  const [openSearch, setopenSearch] = useState(false);
  const toggleOpenSearch = (e) => {
    e.preventDefault();
    setopenSearch(!openSearch);
  };
  return (
    <div className="bg-container">
      <div className="inner-container">
        <div className="searchBar">
          <form id="content">
            <input
              type="text"
              name="input"
              className={openSearch ? "input square" : "input"}
              id="search-input"
              placeholder="Enter your error"
            />
            <button
              type="reset"
              className={openSearch ? "search close" : "search"}
              onClick={toggleOpenSearch}
              id="search-btn"
            ></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ErrorWorld;
