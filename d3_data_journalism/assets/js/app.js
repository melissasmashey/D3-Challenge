var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv("assets/data/data.csv").then(function(journalismData) {

    
    journalismData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.num_hits = +data.healthcare;
      data.abbr =data.abbr;
    });

    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(journalismData, d => d.poverty)*1.2])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(journalismData, d => d.healthcare)*2.8])
      .range([height, 0]);

      var bottomAxis = d3.axisBottom(xLinearScale).ticks(10);
      var leftAxis = d3.axisLeft(yLinearScale);
  
  
 
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
          
  
      chartGroup.append("g")
        .call(leftAxis);

        var circlesGroup = chartGroup.selectAll("circle")
        .data(journalismData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("opacity", ".8")
        .classed("stateCircle", true)

    
        var circlesText = chartGroup.selectAll(".stateText")
         .data(journalismData)
         .enter()
        .append("text")
        .classed("stateText", true)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("dy", 3)
        .attr("font-size", "10px")
        .text(function(d) { return d.abbr });
 
  
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 10)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
   
    });