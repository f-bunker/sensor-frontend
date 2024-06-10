import React from "react";
import ChartWraperHum from "../components/ChartWraperHum";
import ChartWraperTemp from "../components/ChartWraperTemp";
import style from "./live.module.css";

const Live = () => {
  return (
    <div className={style.container}>
      <h1>Wetterstation</h1>
      <h2>Live</h2>
      <div className={style.chartWraper}>
        <ChartWraperTemp chartClass={style.chart} />
        <ChartWraperHum chartClass={style.chart} />
      </div>
    </div>
  );
};

export default Live;
