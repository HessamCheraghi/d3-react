import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Links from "@/components/Links";
import SimpleLineChart from "./line-charts/simple";
import ResponsiveLineChart from "./line-charts/responsive";

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
            <Route path="responsive" element={<ResponsiveLineChart />} />
          </Routes>
        }
      />
    </Routes>
  );
}
