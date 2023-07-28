import React from "react";
import Layout from "@/components/Layout";
import { refined as data } from "@/data/apple";
import { drawChart, deleteChart } from "./chart";

export default function ResizableLineChart() {
  const chartRef = React.useRef<SVGSVGElement>(null);

  const [size, setSize] = React.useState({
    width: 1280,
    height: 720,
  });

  const resizer = React.useCallback(() => {
    const parentSize = chartRef.current?.parentElement?.getBoundingClientRect();
    if (!parentSize) return;
    setSize({
      width: parentSize.width,
      height: parentSize.height,
    });
  }, []);

  React.useEffect(() => {
    resizer();
    window.addEventListener("resize", resizer);
    drawChart(chartRef, data, size.width, size.height);

    return () => {
      deleteChart(chartRef);
      window.removeEventListener("resize", resizer);
    };
  }, [resizer, size.height, size.width]);
  return (
    <Layout title="Resizable Line Chart">
      <div className="h-[70vh] w-full">
        <svg ref={chartRef} />
      </div>
    </Layout>
  );
}
