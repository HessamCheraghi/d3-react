import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Links from "@/components/Links";
import SimpleLineChart from "./line-charts/simple";
import ResponsiveLineChart from "./line-charts/responsive";
import ResizableLineChart from "./line-charts/resizable";
import ZoomableLineChart from "./line-charts/zoomable";
import SimpleBarChart from "./bar-charts/simple";
import ResponsiveBarChart from "./bar-charts/responsive";
import ResizableBarChart from "./bar-charts/resizable";
import ZoomableBarChart from "./bar-charts/zoomable";

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
            <Route path="responsive" element={<ResponsiveBarChart />} />
            <Route path="resizable" element={<ResizableBarChart />} />
            <Route path="zoomable" element={<ZoomableBarChart />} />
          </Routes>
        }
      />
    </Routes>
  );
}
