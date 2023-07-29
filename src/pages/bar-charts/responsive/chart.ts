import React from "react";
import * as d3 from "d3";

type DatumType = { letter: string; frequency: number };

export function drawChart(svgElement: SVGSVGElement, data: DatumType[]) {
  // Declare the chart dimensions and margins.
  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;
  const [minY, maxY] = d3.extent(data, (d) => d.frequency);
  if (!minY) return;
  // Declare the x (horizontal position) scale.
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.letter))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  // Declare the y (vertical position) scale.
  const y = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3
    .select<SVGSVGElement, DatumType>(svgElement)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add a rect for each bar.
  svg
    .append("g")
    .attr("fill", "steelblue")
    .selectAll()
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d.letter) ?? 0)
    .attr("y", (d) => y(d.frequency))
    .attr("height", (d) => y(0) - y(d.frequency))
    .attr("width", x.bandwidth());

  // Add the x-axis and label.
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add the y-axis and label, and remove the domain line.
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickFormat((y) => (+y * 100).toFixed()))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Frequency (%)"),
    );
}

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
