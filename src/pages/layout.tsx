import Select from "react-dropdown-select";
import { Outlet, Link } from "react-router-dom";
import classes from "./layout.module.css"
import { Dispatch, SetStateAction, createContext, useMemo, useState } from "react";
import { sensor_api } from "../generated";

type SensorContext = {
  id: String;
  set: Dispatch<SetStateAction<string>> | null;
};

export const SensorIdCtx = createContext<SensorContext>({id: "",set: null});

const Layout = () => {
  let [sensorClient,setSensorClient] = useState<string[]>([])
  useMemo(async () => {
    const client = new sensor_api({ BASE: 'https://sensor.f-bunker.io' });
    setSensorClient((await client.id.getIds()).sensor_id);
  },[])

  const [sensorId,setSensorId] = useState("");
  return (
    <>
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to="/ui">Home</Link>
          </li>
          <li>
            <Link to="/ui/history">History</Link>
          </li>
        </ul>
      </nav>
      <Select options={array_to_list(sensorClient)} labelField="label" valueField="value" onChange={(id) => setSensorId(id[0].value)} values={array_to_list(sensorClient)} placeholder="Select an option" className={classes.dropdown} />
    </header>
    <SensorIdCtx.Provider value={{id: sensorId,set: setSensorId}}>
      <Outlet />
    </SensorIdCtx.Provider>
    </>
  )
};

type ListElement = {
  value: string;
  label: string;
}

const array_to_list = (array: string[]) => {
  let out: ListElement[] = []
  array.forEach((e) => {
    out.push({label: e, value: e})
  })
  return out
}

export default Layout;