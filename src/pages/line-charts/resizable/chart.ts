import React from "react";
import * as d3 from "d3";

type DatumType = { date: Date; close: number };

export function drawChart(
  svgRef: React.RefObject<SVGSVGElement>,
  data: DatumType[],
  width: number = 1280,
  height: number = 720,
) {
  // don't show the chart on the first render of react
  // and wait until react gives you the container dimensions.
  if (width === 0 || height === 0) return;

  // Declare the chart dimensions and margins.
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;
  const [minX, maxX] = d3.extent(data, (d) => d.date);
  const [minY, maxY] = d3.extent(data, (d) => d.close);
  if (!minX || !minY) return;

  // Declare the x (horizontal position) scale.
  const x = d3
    .scaleTime()
    .domain([minX, maxX])
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([height - marginBottom, marginTop]);

  // Declare the line generator.
  const line = d3
    .line<DatumType>()
    .x((d) => x(d.date))
    .y((d) => y(d.close));

  // Create the SVG container.
  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "width: 100%; height: 100%;");

  // Add the x-axis.
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0),
    );

  // Add the y-axis, remove the domain line, add grid lines and a label.
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1),
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Daily close ($)"),
    );

  // Append a path for the line.
  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line(data));
}

// clean up function used by react
export function deleteChart(svgRef: React.RefObject<SVGSVGElement>) {
  const svgElement = svgRef.current;
  if (!svgElement) return;

  // remove everything inside svg element
  svgElement.textContent = "";

  // remove all the attributes of the svg element
  [...svgElement.attributes].forEach((attr) =>
    svgElement.removeAttribute(attr.name),
  );
}
