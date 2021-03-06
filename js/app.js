(function() {
  'use strict';
  
  var margin = {top: 20, right: 120, bottom: 20, left: 120};
  var width = 960 - margin.right - margin.left;
  var height = 800 - margin.top - margin.bottom;
  var radius = 960 / 2;
  var cluster = d3.layout.cluster().size([360, radius - 120]);
  var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });
  var svg = d3.select("#brackets").append("svg")
    .attr("width", radius * 2 )
    .attr("height", radius * 2)
    .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

  d3.json("data/teams_men.json", function(error, root) {
  var nodes = cluster.nodes(root);

  var link = svg.selectAll("path.link")
    .data(cluster.links(nodes))
    .enter().append("path")
    .attr("class", "link")
    .attr("d", diagonal);

  var node = svg.selectAll("g.node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; });

  node.append("circle")
    .attr("r", 4.5);

  node.append("text")
    .attr("dy", ".31em")
    .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
    .attr("transform", function(d) { return d.x < 180 ? "translate(10)" : "rotate(180)translate(-10)"; })
    .text(function(d) { return d.name; });
});
  d3.select(self.frameElement).style("height", radius * 2 + "px");
})();
