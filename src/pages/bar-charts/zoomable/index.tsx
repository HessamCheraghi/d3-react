import React from "react";
import Layout from "@/components/Layout";
import { data } from "@/data/alphabet";
import { drawChart, deleteChart } from "./chart";

export default function ZoomableBarChart() {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const chartId = React.useId();

  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
  });

  const resizer = React.useCallback(() => {
    const parentSize = svgRef.current?.parentElement?.getBoundingClientRect();
    if (!parentSize) return;
    setSize({
      width: parentSize.width,
      height: parentSize.height,
    });
  }, []);

  React.useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;
    resizer();
    window.addEventListener("resize", resizer);
    drawChart({
      svgElement,
      chartId,
      data,
      width: size.width,
      height: size.height,
    });

    return () => {
      deleteChart(svgElement);
      window.removeEventListener("resize", resizer);
    };
  }, [chartId, resizer, size.height, size.width]);
  return (
    <Layout title="Zoomable Line Chart">
      <div className="h-[70vh] w-full">
        <svg ref={svgRef} />
      </div>
    </Layout>
  );
}
