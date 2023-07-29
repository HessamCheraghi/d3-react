import React from "react";
import Layout from "@/components/Layout";
import { data } from "@/data/alphabet";
import { drawChart, deleteChart } from "./chart";

export default function ResizableBarChart() {
  const chartRef = React.useRef<SVGSVGElement>(null);

  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
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
    const svgElement = chartRef.current;
    if (!svgElement) return;
    resizer();
    window.addEventListener("resize", resizer);
    drawChart(svgElement, data, size.width, size.height);

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
