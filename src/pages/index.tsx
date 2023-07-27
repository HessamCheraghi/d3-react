import { Route, Routes } from "react-router-dom";
import SimpleLineChart from "./line-charts/simple";
import Layout from "@/components/Layout";
import Links from "@/components/Links";

export default function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <Layout title="List Of Charts">
            <Links />
          </Layout>
        }
      />
      <Route
        path="line/*"
        element={
          <Routes>
            <Route path="simple" element={<SimpleLineChart />} />
          </Routes>
        }
      />
    </Routes>
  );
}
