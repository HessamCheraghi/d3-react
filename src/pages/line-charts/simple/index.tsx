import React from "react";
import Layout from "@/components/Layout";

export default function SimpleLineChart() {
  const chartRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    console.log(chartRef.current);
  }, []);
  return (
    <Layout title="SimpleLineChart">
      <svg ref={chartRef}></svg>
    </Layout>
  );
}
