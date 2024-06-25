import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Live from "./pages/live";
import History from "./pages/history"
import NoPage from "./pages/nopage"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
<BrowserRouter>
  <Routes>
    <Route path="/ui" element={<Layout />}>
      <Route index element={<Live />} />
      <Route path="/ui/history" element={<History />} />
      <Route path="*" element={<NoPage />} />
    </Route>
  </Routes>
</BrowserRouter>
);
