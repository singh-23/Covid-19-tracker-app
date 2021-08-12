import React from "react";

function InfoBoxes({ tittle, cases, total }) {
  return (
    <div className="card" style={{ width: "15rem" }}>
      <div className="card-body">
        <h5 className="card-title">{tittle}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{cases}</h6>
        <h5 className="card-title">{total}</h5>
      </div>
    </div>
  );
}

export default InfoBoxes;
