/* Get data */
var dataset = [];

let getData = (() => {
  let obj = [];
  let dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      dataset = obj.data;
      main(dataset);
    }
  }
  xhttp.open("GET", dataUrl, true);
  xhttp.send();
})()

/* Main function */
let main = data => {

  /* Constants */
  const w = 1000;
  const h = 500;
  const padding = 60;
  const barWidth = w / 275;

  /* Tooltip */
  var tooltip = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

  /* SVG */
  const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  /* X Scale */
  let yearsDate = data.map(function (item) {
    return new Date(item[0]);
  });

  //let xMax = new Date(d3.max(yearsDate));
  //xMax.setMonth(xMax.getMonth() + 3);

  const xScale = d3.scaleTime()
    .domain([d3.min(yearsDate), d3.max(yearsDate)])
    .range([padding, w - padding]);

  /* Y Scale */
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([h - padding, padding]);

  /* Axis */
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);;

  svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .attr('id', 'x-axis')
    .call(xAxis);

  svg.append("g")
    .attr("transform", "translate(" + padding + ", 0)")
    .attr('id', 'y-axis')
    .call(yAxis);

  /* Rect */
  d3.select('svg').selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(yearsDate[i]))
    .attr("y", (d, i) => yScale(d[1]))
    .attr("width", barWidth)
    .attr("height", (d, i) => d[1])
    .attr('fill', 'navy')
    .attr('class', 'bar')
    .attr('data-date', function (d, i) {
      return data[i][0]
    })
    .attr('data-gdp', function (d, i) {
      return data[i][1]
    })
    .on('mouseover', function (d, i) {
      tooltip.attr('data-date', data[i][0])
        .transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.text(data[i][0] + ' ' + data[i][1])

    })

    .on('mouseout', function (d) {
      tooltip.transition()
        .duration(200)
        .style('opacity', 0)
    })

    .append("title")
    .text(d => d[0] + ' ' + d[1])

  //Tooltip

}//End main
