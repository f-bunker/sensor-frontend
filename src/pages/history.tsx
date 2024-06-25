import React from "react";
import ChartWraperMonthTemp from "../components/ChartWraperMonthTemp";
import ChartWraperMonthHum from "../components/ChartWraperMonthHum";
import style from "../pages/history.module.css"

const History = () => {
  return (
  <>
    <header>
      <h2>Zeitraum eines Monats</h2>
    </header>
    <div className={style.ChartContainer}>
      <ChartWraperMonthTemp chartClass={style.chart} />
      <ChartWraperMonthHum chartClass={style.chart} />
    </div>
  </>
  );
};
  
export default History;