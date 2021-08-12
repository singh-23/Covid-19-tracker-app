import React from "react";
import "./table.css";
function Table({ tdata }) {
  return (
    <>
      <div className="card" id="cardtable" style={{ width: "18rem" }}>
        <div className="card-body">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Countries</th>
                <th scope="col">Cases</th>
              </tr>
            </thead>
            <tbody>
              {tdata.map(({ country, cases }) => (
                <tr>
                  <td className="text-start">{country}</td>
                  <td className="text-end">{cases}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
