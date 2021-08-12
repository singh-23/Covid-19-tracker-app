import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBoxes from "./InfoBoxes";
import Table from "./Table";
import { sortData } from "./util";
import Maps from "./Maps";
import Graph from "./Graph";

import "leaflet/dist/leaflet.css";
function App() {
  const [countries, setCountries] = useState(["India", "USA", "UK"]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapcenter, setCenter] = useState([40.5, 47.5]);
  const [mapzoom, setZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [colour, setColour] = useState("cases");
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  useEffect(() => {
    const fetch_data = async () => {
      let api = "https://disease.sh/v3/covid-19/countries";
      await fetch(api)
        .then((respone) => respone.json())
        .then((data) => {
          const data1 = data.map((country1) => ({
            name: country1.country,
            value: country1.countryInfo.iso2,
          }));
          setCountries(data1);
          let sorted = sortData(data);
          setTableData(sorted);
          setMapCountries(data);
        });
    };
    fetch_data();
  }, []);

  const changeData = async (event) => {
    let value1 = event.target.value;
    let api2 =
      value1 === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${value1}`;
    await fetch(api2)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        if (value1 !== "worldwide") {
          setCenter([data.countryInfo.lat, data.countryInfo.long]);
          setZoom(4);
        }
      });
  };
  const Recovered = (e) => {
    console.log("Hello World");
  };
  return (
    <div className="App">
      <div className="left_box">
        <div className="row1">
          <div className="heading">
            <h2>Covid-19 Tracker</h2>
          </div>
          <div className="drop_down">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={changeData}
            >
              <option value="worldwide">WorldWide</option>
              {countries.map((country) => (
                <option value={country.value}>{country.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div id="row2" className="row2 ">
          <div
            onClick={(e) => {
              setColour("cases");
            }}
          >
            <InfoBoxes
              tittle="Reported Cases"
              cases={countryInfo.todayCases}
              total={countryInfo.cases}
            />
          </div>
          <div
            onClick={(e) => {
              setColour("recovered");
            }}
          >
            <InfoBoxes
              tittle="Recovered Cases"
              cases={countryInfo.todayRecovered}
              total={countryInfo.recovered}
            />
          </div>
          <div
            onClick={(e) => {
              setColour("deaths");
            }}
          >
            <InfoBoxes
              tittle="Deaths Cases"
              cases={countryInfo.todayDeaths}
              total={countryInfo.deaths}
            />
          </div>
        </div>
        <div className="row3">
          <div className="col-12">
            <div className="card" style={{ width: "60rem", height: "20rem" }}>
              <div className="card-body">
                <Maps Center={mapcenter} Zoom={mapzoom} colour={colour} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right_box ">
        <div className="row">
          <div className="col-12">
            <Table tdata={tableData} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card" style={{ width: "18rem", height: "11rem" }}>
              <h10 className="text-center">
                <b>Last 120 Days {colour}</b>
              </h10>
              <div className="map_container">
                <Graph colour={colour} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
