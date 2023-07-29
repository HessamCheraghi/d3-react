import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Links from "@/components/Links";
import SimpleLineChart from "./line-charts/simple";
import ResponsiveLineChart from "./line-charts/responsive";
import ResizableLineChart from "./line-charts/resizable";
import ZoomableLineChart from "./line-charts/zoomable";
import SimpleBarChart from "./bar-charts/simple";

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
            <Route path="resizable" element={<ResizableLineChart />} />
            <Route path="zoomable" element={<ZoomableLineChart />} />
          </Routes>
        }
      />
      <Route
        path="bar/*"
        element={
          <Routes>
            <Route path="simple" element={<SimpleBarChart />} />
          </Routes>
        }
      />
    </Routes>
  );
}
