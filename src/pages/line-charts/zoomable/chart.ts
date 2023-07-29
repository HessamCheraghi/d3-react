import * as d3 from "d3";

type DatumType = { date: Date; close: number };

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
  // don't show the chart on the first render of react
  // and wait until react gives you the container dimensions
  if (width === 0 || height === 0) return;

  // Declare the chart dimensions and margins.
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;
  const [minX, maxX] = d3.extent(data, (d) => d.date);
  const [minY, maxY] = d3.extent(data, (d) => d.close);
  if (minX == null || minY == null) return;

  // Declare the x (horizontal position) scale.
  const x = d3
    .scaleTime()
    .domain([minX, maxX])
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3
    .scaleLinear()
    .domain([minY, maxY])
    .range([height - marginBottom, marginTop])
    .nice();

  // Create the horizontal axis generator, called at startup and when zooming.
  const xAxis = (
    g: d3.Selection<SVGGElement, DatumType, null, undefined>,
    x: d3.ScaleTime<number, number, never>,
  ) =>
    g.call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0),
    );
  const yAxis = (
    g: d3.Selection<SVGGElement, DatumType, null, undefined>,
    y: d3.ScaleLinear<number, number, never>,
  ) => g.call(d3.axisLeft(y).ticks(height / 40));

  // Declare the line generator.
  const line = d3
    .line<DatumType>()
    .curve(d3.curveLinear)
    .x((d) => x(d.date))
    .y((d) => y(d.close));

  // Create the zoom behavior.
  const zoom = d3
    .zoom<SVGSVGElement, DatumType>()
    .scaleExtent([1, 1000])
    .extent([
      [marginLeft, marginTop],
      [width - marginRight, height - marginBottom],
    ])
    .translateExtent([
      [marginLeft, marginTop],
      [width - marginRight, height - marginBottom],
    ])
    .on("zoom", zoomed);

  // Create the SVG container.
  const svg = d3
    .select<SVGSVGElement, DatumType>(svgElement)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: 100%;");

  svg
    .append("clipPath")
    .attr("id", chartId)
    .append("rect")
    .attr("x", marginLeft)
    .attr("y", marginTop)
    .attr("width", width - marginLeft - marginRight)
    .attr("height", height - marginTop - marginBottom);

  // Add the x-axis.
  const gx = svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis, x);

  // Add the y-axis, remove the domain line, add grid lines and a label.
  const gy = svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis, y)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
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
  const path = svg
    .append("g")
    .attr("clip-path", `url(#${chartId})`)
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 0.9)
    .attr("d", line(data));

  svg.call(zoom);

  function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, DatumType>) {
    const xz = event.transform.rescaleX(x);
    const yz = event.transform.rescaleY(y);
    path
      .attr("transform", event.transform.toString())
      .attr("stroke-width", 0.9 / event.transform.k);
    gx.call(xAxis, xz);
    gy.call(yAxis, yz)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1),
      );
  }
}

// clean up function used by react
export function deleteChart(svgElement?: SVGSVGElement | null) {
  if (!svgElement) return;

  // remove everything inside svg element
  svgElement.textContent = "";

  // remove all the attributes of the svg element
  [...svgElement.attributes].forEach((attr) =>
    svgElement.removeAttribute(attr.name),
  );
}
