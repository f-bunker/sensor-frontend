import React from "react";
import ChartWraperMounth from "../components/ChartWraperMounth";
import style from "./history.module.css"

const History = () => {
  return (
    <div className={style.ChartContainer}>
      <ChartWraperMounth />
    </div>
  );
};
  
export default History;