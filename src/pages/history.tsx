import ChartWrapper, { ChartTypeEnum } from "../components/ChartWraper";
import style from "./history.module.css"

const history = () => {
  return (
    <div className={style.ChartContainer}>
      <ChartWrapper type={ChartTypeEnum.line} />
      <ChartWrapper type={ChartTypeEnum.line} />
    </div>
  )
};
  
  export default history;