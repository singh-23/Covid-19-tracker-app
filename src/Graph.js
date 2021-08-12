import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
const casesTypeColors = {
  cases: {
    fill: "#f7b239",
    stroke: "#f29e0a",
  },
  recovered: {
    fill: "#7dd71d",
    stroke: "#7ef005",
  },
  deaths: {
    fill: "#fb4443",
    stroke: "#c71110",
  },
};
function Graph({ colour }) {
  let api = "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
  const [data, setData] = useState();
  const [casetype, setCase] = useState("cases");
  const fetchData = async () => {
    await fetch(api)
      .then((response) => response.json())
      .then((data1) => setData(data1));
  };

  const mydata = [];
  let lastdata;
  if (data && colour) {
    let data2 = data[colour];
    console.log(data2);
    for (let keys in data2) {
      if (lastdata) {
        let tempdata = {
          Date: keys,
          Cases: data2[keys] - lastdata,
        };
        mydata.push(tempdata);
      }
      lastdata = data2[keys];
    }
  }
  console.log(mydata);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ResponsiveContainer style={{ margin: "0" }} width={270} height={150}>
      <AreaChart data={mydata}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Area
          type="monotone"
          dataKey="Cases"
          stroke={casesTypeColors[colour].stroke}
          fill={casesTypeColors[colour].fill}
        />
        <XAxis dataKey="Date" tickFormatter={(string) => string[0]} />
        <YAxis
          dataKey={"Cases"}
          tickFormatter={(number) => Math.round(number / 1000) + "k"}
        />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Graph;
