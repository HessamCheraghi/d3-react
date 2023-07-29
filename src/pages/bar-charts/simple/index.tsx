import React from "react";
import Layout from "@/components/Layout";
import { drawChart, deleteChart } from "./chart";
import { data } from "@/data/alphabet";

export default function SimpleBarChart() {
  const chartRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const svgElement = chartRef.current;
    if (!svgElement) return;
    drawChart(svgElement, data);

    return () => {
      deleteChart(chartRef);
    };
  }, []);
  return (
    <Layout title="Simple Bar Chart">
      <svg ref={chartRef} />
    </Layout>
  );
}
