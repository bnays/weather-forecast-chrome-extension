import React, { useEffect, useRef, useState } from 'react';
import * as d3 from "d3";
import './HourlyG2.css'
import CompareLocation from './CompareLocation/CompareLocation';

function HourlyG2(props) {

    const { data, temperatureScale, getCompareByLocation } = props;

    const ref = useRef();

    useEffect(() => {

        const temperatureUnit = temperatureScale === "celsius" ? "°C" : "°F";

        const datae = [
            "2014-11-15 22:23:22,789",
            "2014-11-16 00:09:29,850",
            "2014-11-16 22:42:34,880",
            "2014-11-18 06:02:57,1086",
            "2014-11-19 21:34:40,1218",
            "2014-11-20 19:00:17,1285",
            "2014-11-21 15:27:45,1379",
            "2014-11-21 18:26:53,1398"
        ]

        // function for the y grid lines
        const make_y_axis = () => {
            return d3.svg.axis()
            .scale(y)
            .orient("left")
        }

        const wrap = (text, width) => {

            text.each(function() {
              var text = d3.select(this);
                var  words = text.text().split(/\s+/).reverse(),
                  word,
                  line = [],
                  lineNumber = 0,
                  lineHeight = 1.1, // ems
                  y = text.attr("y"),
                  dy = parseFloat(text.attr("dy")),
                  tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
              while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                  line.pop();
                  tspan.text(line.join(" "));
                  line = [word];
                  tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
              }
            });
        }


        if(data[0] && data[0] !== undefined) {
            var margin = {top: 50, right: 20, bottom: 60, left: 90},
                width = 900 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            var x = d3.time.scale()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var xMinorAxis = d3.svg.axis()
                .scale(x)
                .ticks(d3.time.hours,12)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var line = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.temp); });

            d3.select("#chart div").remove();
            d3.select("#chart svg").remove();

            var div = d3.select("#chart").append("div")   
                .attr("class", "tooltip")               
                .style("opacity", 0);

            var svg = d3.select("#chart").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var parseDate = d3.time.format("%Y-%m-%d %X");

            //format for tooltip
            //var formatTime = d3.time.format("%e %b");
            var formatTime = d3.time.format("%e %b %-I:%M %p");
            var formatCount = d3.format(",");

            data[0].values.forEach(function(d) {
                if(d.date) {
                    d.date = parseDate.parse(d.date);
                    d.temp = +d.temp;
                }
            });

        //using data to define extent of x and y domains
        x.domain(d3.extent(data[0].values, function(d) { return d.date; }));
        y.domain(d3.extent(data[0].values, function(d) { return d.temp; }));

        // Draw the y Grid lines
        svg.append("g")            
                .attr("class", "grid")
                .call(make_y_axis()
                    .tickSize(-width, 0, 0)
                    .tickFormat("")
                )
        
                var path = svg.append("path")
            .datum(data[0].values)
            .attr("class", "line")
            .attr("d", line);

            console.log(path[0][0], "path");

            var totalLength = [path[0][0].getTotalLength()];

                console.log(totalLength[0]);
                // Animate Path
                d3.select(path[0][0])
                .attr("stroke-dasharray", totalLength[0] + " " + totalLength[0] ) 
                .attr("stroke-dashoffset", totalLength[0])
                .transition()
                    .duration(2000)
                    .ease("linear")
                    .attr("stroke-dashoffset", 0);

            var color = d3.scale.ordinal(d3.schemeCategory10);

        //creating a group(g) and will append a circle and 2 lines inside each group
        var g = svg.selectAll()
                .data(data[0].values).enter().append("g");

        //The markers on the line
            g.append("circle")
                .attr("r", 4)
                .style("fill", (d, i) => color(i))
                .attr("cx", function(d) { return x(d.date); })
                .attr("cy", function(d) { return y(d.temp); });
        
        //The horizontal dashed line that appears when a circle marker is moused over
            g.append("line")
                .attr("class", "x")
                .attr("id", "dashedLine")
                .style("stroke", "steelblue")
                .style("stroke-dasharray", "3,3")
                .style("opacity", 0)
                .attr("x1", function(d) { return x(d.date); })
                .attr("y1", function(d) { return y(d.temp); })
                    //d3.min gets the min date from the date x-axis scale
                    .attr("x2", function(d) { return x(d3.min(x)); })
                .attr("y2", function(d) { return y(d.temp); });

        //The vertical dashed line that appears when a circle marker is moused over
            g.append("line")
                .attr("class", "y")
                .attr("id", "dashedLine")
                .style("stroke", "steelblue")
                .style("stroke-dasharray", "3,3")
                .style("opacity", 0)
                .attr("x1", function(d) { return x(d.date); })
                .attr("y1", function(d) { return y(d.temp); })
                    .attr("x2", function(d) { return x(d.date); })
                .attr("y2", height);
            
        //circles are selected again to add the mouseover functions
            g.selectAll("circle")
                    .on("mouseover", function(d) {		
                    div.transition()		
                    .duration(200)		
                    .style("opacity", .9);	
                    div.html(formatCount(d.temp) + " "+temperatureUnit+"" + "<br/>" + formatTime(d.date))	
                    .style("left", (d3.event.pageX - 0) + "px")
                        .style("top", (d3.event.pageY + 0) + "px");
                    //selects the horizontal dashed line in the group
                        d3.select(this.nextElementSibling).transition()		
                        .duration(200)		
                        .style("opacity", .9);
                    //selects the vertical dashed line in the group 
                        d3.select(this.nextElementSibling.nextElementSibling).transition()		
                        .duration(200)		
                        .style("opacity", .9);	
                    })	
                        
            .on("mouseout", function(d) {		
                    div.transition()		
                    .duration(500)		
                    .style("opacity", 0);

                        d3.select(this.nextElementSibling).transition()		
                        .duration(500)		
                        .style("opacity", 0);

                        d3.select(this.nextElementSibling.nextElementSibling).transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
                .selectAll(".tick text")
            .call(wrap, 35);

        svg.append("g")
            .attr("class","xMinorAxis")
            .attr("transform", "translate(0," + height + ")")
            .style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
            .call(xMinorAxis)
            .selectAll("text").remove();

        //http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
        svg.append("text")      // text label for the x-axis
                .attr("x", width / 2 )
                .attr("y",  height + margin.bottom)
                .style("text-anchor", "middle")
                .text("Date Time");

        svg.append("text")      // text label for the y-axis
                .attr("y",30 - margin.left)
                .attr("x",50 - (height / 2))
                .attr("transform", "rotate(-90)")
                .style("text-anchor", "end")
                .style("font-size", "16px")
                .text("Temperature ("+temperatureUnit+")");

        svg.append("text")      // text label for chart Title
                .attr("x", width / 2 )
                .attr("y", 0 - (margin.top/2))
                .style("text-anchor", "middle")
                .style("font-size", "16px") 
                .style("text-decoration", "underline") 
                .text("Hourly Temperature Trend from the past X hours ");


        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            //text label for the y-axis inside chart
            /*
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-size", "16px") 
            .style("background-color","red")
            .text("road length (km)");
            */

        }
    }, [data]);

    return (
        <div>
            <CompareLocation getCompareByLocation={getCompareByLocation}/>
            <div id="chart"></div>
        </div>
    )
}

export default HourlyG2
