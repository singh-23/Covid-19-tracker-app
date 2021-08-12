import React, { useState, useEffect } from "react";
import {
  Map as LeafletMap,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
function Maps({ Center, Zoom, colour }) {
  let api = "https://disease.sh/v3/covid-19/countries";
  let [data, setData] = useState([]);
  let [current, setCurrent] = useState(null);
  const fetchData = async () => {
    await fetch(api)
      .then((response) => response.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const casesTypeColors = {
    cases: {
      hex: "#f7b239",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
  };
  return (
    <div className="map">
      <LeafletMap
        center={Center}
        zoom={Zoom}
        boxZoom={30}
        scrollWheelZoom={true}
        style={{ height: "18rem", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((data1) => (
          <CircleMarker
            key={data1.countryInfo._Id}
            center={[data1.countryInfo.lat, data1.countryInfo.long]}
            radius={Math.sqrt(data1[colour]) / 35}
            color={casesTypeColors[colour].hex}
            onClick={() => setCurrent(data1)}
          >
            {current && (
              <Popup
                position={[current.countryInfo.lat, current.countryInfo.long]}
                onClose={() => {
                  setCurrent(null);
                }}
              >
                <div
                  className="card"
                  style={{ width: "7.5rem", heigh: "12rem", padding: "3px" }}
                >
                  <img
                    src={current.countryInfo.flag}
                    className="card-img-top"
                    alt="no image"
                    style={{
                      padding: "4px",
                      borderRadius: "12px",
                      height: "10vh",
                      marginTop: "1px",
                    }}
                  />
                  <div
                    className="cardbody"
                    style={{
                      margin: ".7px",
                      padding: "3.3px",
                      marginBottom: ".5px",
                    }}
                  >
                    <h10 className="card-title">
                      <span>
                        <b>{current.country}</b>
                      </span>
                    </h10>
                    <br />
                    <h10 className="card-title">
                      <span>
                        <b>Cases:</b>
                      </span>
                      <h12 class="card-text">{current.cases}</h12>
                    </h10>
                    <br />
                    <h10 className="card-title">
                      <span>
                        <b>Recorvered:</b>
                      </span>
                      <h12 class="card-text">{current.recovered}</h12>
                    </h10>
                    <br />
                    <h10 className="card-title">
                      <span>
                        <b>Deaths:</b>
                      </span>
                      <h12 class="card-text">{current.deaths}</h12>
                    </h10>
                  </div>
                </div>
              </Popup>
            )}
          </CircleMarker>
        ))}
      </LeafletMap>
    </div>
  );
}

export default Maps;
