import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { useState } from "react";

function Spinner() {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <div className="spinner-container">
        <HashLoader
          color={"white"}
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Spinner;
