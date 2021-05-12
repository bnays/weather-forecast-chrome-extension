import React, { useEffect } from 'react';
import * as d3 from "d3";
import './HourlyGraph.css'
import CompareLocation from './CompareLocation/CompareLocation';


function HourlyGraph(props) {

    const { historyInfo, compareHistoryInfo, temperatureScale, getCompareByLocation, clearCompareByLocation } = props;
    
    useEffect(() => {
        let hourDataArray = [];
        let data = [];
        const temperatureUnit = temperatureScale === "celsius" ? "°C" : "°F";
        
        historyInfo.forecast.forecastday.map((item, index) => {
            return (
                    hourDataArray.push({
                        name: historyInfo.location.name+", "+historyInfo.location.country,
                        values: 
                            item.hour.map((v, i) => {
                                return (
                                    temperatureScale === "celsius" ?
                                { date: v.time, temp: v.temp_c } 
                                : { date: v.time, temp: v.temp_f } 
                                )
                            })
                })
            )
        });
        if(compareHistoryInfo !== "") {
            compareHistoryInfo.forecast.forecastday.map((item, index) => {
                return (
                        hourDataArray.push({
                            name: compareHistoryInfo.location.name+", "+compareHistoryInfo.location.country,
                            values: 
                                item.hour.map((v, i) => {
                                    return (
                                        temperatureScale === "celsius" ?
                                    { date: ""+v.time, temp: ""+v.temp_c } 
                                    : { date: ""+v.time, temp: ""+v.temp_f } 
                                    )
                                })
                    })
                )
            }); 
        }

        data = hourDataArray;

        if(data[0] && data[0] !== undefined) {
            var width = 900;
            var height = 400;
            var margin = 50;
            var marginTop = 70;
            
            var duration = 250;
    
            var lineOpacity = "0.25";
            var lineOpacityHover = "0.85";
            var otherLinesOpacityHover = "0.1";
            var lineStroke = "1.5px";
            var lineStrokeHover = "2.5px";
    
            var circleOpacity = "0.85";
            var circleOpacityOnLineHover = "0.25";
            var circleRadius = 3;
            var circleRadiusHover = 6;
    
            /* Format Data */
            var parseDate = d3.timeParse("%Y-%m-%d %H:%M");
            data.forEach(function(d) {
                d.values.forEach(function(d) {
                    d.date = parseDate(d.date.toString());
                    d.temp = +d.temp.toString();
                });
            });
    
            /* Scale */
            var xScale = d3
            .scaleTime()
            .domain(d3.extent(data[0].values, d => d.date))
            .range([0, width - margin]);
    
            var yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data[0].values, d => d.temp)])
            .range([height - margin, 0]);
    
            var color = d3.scaleOrdinal(d3.schemeCategory10);

            d3.select("#chart div").remove();
            d3.select("#chart svg").remove();
    
            /* Add SVG */
            var svg = d3
            .select("#chart")
            .append("svg")
            .attr("width", width + margin + "px")
            .attr("height", height + margin + "px")
            .append("g")
            .attr("transform", `translate(${margin}, ${margin})`);

            var div = d3.select("#chart").append("div")   
                .attr("class", "tooltip")               
                .style("opacity", 0);

            //format for tooltip
            //var formatTime = d3.time.format("%e %b");
            var formatTime = d3.timeFormat("%e %b %-I:%M %p");
            var formatCount = d3.format(",");
    
            /* Add line into SVG */
            var line = d3
            .line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.temp));
    
            let lines = svg.append("g").attr("class", "lines");
    
            lines
            .selectAll(".line-group")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "line-group")
            .on("mouseover", function(i, d) {
                svg
                .append("text")
                .attr("class", "title-text")
                .style("fill", "black")
                .text(d.name)
                .attr("text-anchor", "middle")
                .attr("x", (width - margin) / 2)
                .attr("y", height-80);
            })
            .on("mouseout", function(d) {
                svg.select(".title-text").remove();
            });

            var path = svg.selectAll(".line-group")
            .append("path")
            .attr("class", "line")
            .attr("d", d => line(d.values))
            .style("stroke", (d, i) => color(i))
            .style("opacity", lineOpacity)
            .on("mouseover", function(d) {
                d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
                d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
                d3.select(this)
                .style("opacity", lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
                .style("cursor", "pointer");
            })
            .on("mouseout", function(d) {
                d3.selectAll(".line").style("opacity", lineOpacity);
                d3.selectAll(".circle").style("opacity", circleOpacity);
                d3.select(this)
                .style("stroke-width", lineStroke)
                .style("cursor", "none");
            });

            var totalLength = [];
            if(path.nodes()[1]) {
                totalLength = [path.nodes()[0].getTotalLength(), path.nodes()[1].getTotalLength()];
            }
            else {
                totalLength = [path.nodes()[0].getTotalLength()];
            }

            d3.select(path.nodes()[0])
            .attr("stroke-dasharray", totalLength[0] + " " + totalLength[0] ) 
            .attr("stroke-dashoffset", totalLength[0])
            .transition()
                .duration(2000)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0);
            if(path.nodes()[1]) {
                d3.select(path.nodes()[1])
                .attr("stroke-dasharray", totalLength[1] + " " + totalLength[1] ) 
                .attr("stroke-dashoffset", totalLength[1])
                .transition()
                    .duration(2000)
                    .ease(d3.easeLinear)
                    .attr("stroke-dashoffset", 0);
            }
    
            /* Add circles in the line */
            lines
            .selectAll("circle-group")
            .data(data)
            .enter()
            .append("g")
            .style("fill", (d, i) => color(i))
            .selectAll("circle")
            .data(d => d.values)
            .enter()
            .append("g")
            .attr("class", "circle")
            .on("mouseover", function(event, d) {
                div.transition()		
                    .duration(200)		
                    .style("opacity", .9);
                    div.html(formatCount(d.temp) +temperatureUnit+ "<br/>" + formatTime(d.date))	
                    .style("left", (event.pageX - 0) + "px")
                        .style("top", (event.pageY + 0) + "px");
            })
            .on("mouseout", function(d) {		
                div.transition()		
                .duration(500)		
                .style("opacity", 0);
            })
            .append("circle")
            .attr("cx", d => xScale(d.date))
            .attr("cy", d => yScale(d.temp))
            .attr("r", circleRadius)
            .style("opacity", circleOpacity)
            .on("mouseover", function(d) {
                d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadiusHover);
            })
            .on("mouseout", function(d) {
                d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadius);
            });
    
            /* Add Axis into SVG */
            var xAxis = d3.axisBottom(xScale).ticks(5);
            var yAxis = d3.axisLeft(yScale).ticks(5);
    
            svg
            .append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height - margin})`)
            .style("font-size", "14px")
            .call(xAxis);
    
            svg
            .append("g")
            .attr("class", "y axis")
            .style("font-size", "14px")
            .call(yAxis)
            .append("text")
            .attr("y", -35)
            .attr("x", 90 - (height / 2))
            .attr("transform", "rotate(-90)")
            .attr("fill", "#000")
            .style("font-size", "16px")
            .text("Temperature("+temperatureUnit+")");

            svg.append("text")      // text label for chart Title
            .attr("x", width / 2 )
            .attr("y", 0 - (marginTop/2))
            .style("text-anchor", "middle")
            .style("font-size", "16px") 
            .style("text-decoration", "underline") 
            .text("Hourly Temperature Trend from the past 24 hours ("+temperatureUnit+")");

            svg.append("text")      // text label for the x-axis
            .attr("x", width / 2 )
            .attr("y",  height)
            .style("text-anchor", "middle")
            .text("Date Time");
        }

    
        }, [temperatureScale, historyInfo, compareHistoryInfo]);

    return (
        <div className="chart_wrapper">
            <CompareLocation getCompareByLocation={getCompareByLocation} clearCompareByLocation={clearCompareByLocation}/>
            <div id="chart" />
        </div>
    )
}

export default HourlyGraph
