import React from "react";
import Layout from "@/components/Layout";
import { drawChart, deleteChart } from "./chart";
import { refined as data } from "@/data/apple";

export default function ResponsiveLineChart() {
  const chartRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    drawChart(chartRef, data);

    return () => {
      deleteChart(chartRef);
    };
  }, []);
  return (
    <Layout title="Responsive Line Chart">
      <svg ref={chartRef} />
    </Layout>
  );
}
