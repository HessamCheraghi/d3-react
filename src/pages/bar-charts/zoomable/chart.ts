// todo: get programmatic zoom
// todo: fix resetting issue when the container resizes (reset zoom on render)

import * as d3 from "d3";

type DatumType = { letter: string; frequency: number };

interface DrawChartProps {
  svgElement: SVGSVGElement;
  chartId: string;
  data: DatumType[];
  width: number;
  height: number;
}

export function drawChart({
  svgElement,
  chartId,
  data,
  width = 1280,
  height = 720,
}: DrawChartProps) {
  if (width === 0 || height === 0) return;

  // Declare the chart dimensions and margins.
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

  const xAxis = (
    g: d3.Selection<SVGGElement, DatumType, null, undefined>,
    x: d3.ScaleBand<string>,
  ) => g.call(d3.axisBottom(x).tickSizeOuter(0));
  // Declare the y (vertical position) scale.
  const y = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([height - marginBottom, marginTop])
    .nice();

  // Create the SVG container and call the zoom behavior.
  const svg = d3
    .select<SVGSVGElement, DatumType>(svgElement)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "width: 100%; height: 100%;")
    .call(zoom);

  // Create the clip-path for zoom behavior of the bars
  svg
    .append("clipPath")
    .attr("id", chartId)
    .append("rect")
    .attr("x", marginLeft)
    .attr("y", marginTop)
    .attr("width", width - marginLeft - marginRight)
    .attr("height", height - marginTop - marginBottom);

  svg
    .append("clipPath")
    .attr("id", chartId + "x-axis")
    .append("rect")
    .attr("x", marginLeft)
    .attr("y", 0)
    .attr("width", width - marginLeft - marginRight)
    .attr("height", marginBottom);

  // Append the bars.
  const bars = svg
    .append("g")
    .attr("class", "bars")
    .attr("clip-path", `url(#${chartId})`)
    .attr("fill", "steelblue")
    .selectAll<SVGRectElement, DatumType>("rect")
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d.letter) ?? 0)
    .attr("y", (d) => y(d.frequency))
    .attr("height", (d) => y(0) - y(d.frequency))
    .attr("width", x.bandwidth());

  // Append the axes.
  const gx = svg
    .append("g")
    .attr("class", "x-axis")
    .attr("clip-path", `url(#${chartId}x-axis)`)
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis, x);

  // Add the y-axis and label, and remove the domain line.
  svg
    .insert("g", ".bars")
    .attr("class", "y-axis")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y))
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
        .text("↑ Frequency (%)"),
    );

  function zoom(svg: d3.Selection<SVGSVGElement, DatumType, null, undefined>) {
    const extent: [[number, number], [number, number]] = [
      [marginLeft, marginTop],
      [width - marginRight, height - marginTop],
    ];

    svg.call(
      d3
        .zoom<SVGSVGElement, DatumType>()
        .scaleExtent([1, 8])
        .translateExtent(extent)
        .extent(extent)
        .on("zoom", zoomed),
    );

    function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, DatumType>) {
      const xz = x.range(
        [marginLeft, width - marginRight].map((d) => event.transform.applyX(d)),
      );
      bars.attr("x", (d) => x(d.letter) ?? 0).attr("width", x.bandwidth());
      gx.call(xAxis, xz);
    }
  }
}

export function deleteChart(svgElement?: SVGSVGElement | null) {
  if (!svgElement) return;

  // remove everything inside svg element
  svgElement.textContent = "";

  // remove all the attributes of the svg element
  [...svgElement.attributes].forEach((attr) =>
    svgElement.removeAttribute(attr.name),
  );
}
