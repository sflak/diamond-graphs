const createBarChart = (data1) => {
    console.log(data1);
    console.log("producing data") 
    var data = []
    var i = 0
    xTitle = "" 
    yTitle = ""
    var maxSize = 0
    var title = document.getElementById("title").value // getting the title
    for(var j = i; j < data1.length; j++){ 
        if(data1[j][0] == ""){
            data1.splice(j,1)
        }
    }

    if (typeof data1[0][1] == 'string' || data1[0][1] instanceof String){ 
        i = 1;
        xTitle = data1[0][0] 
        yTitle = data1[0][1] 
    }
    for(i; i < data1.length; i++){
        console.log(data1[i])
        ydata = Number(data1[i][1])  
        xdata = Number(data1[i][0]) 
        tempData = {hor: xdata, height: ydata} 
        data.push(tempData)
    }

    var hors = data.map(function(t) {
        return t.hor
    });

    var margin = {top: 20, right: 5, bottom: 50, left: 50};
    // here, we want the full chart to be 700x200, so we determine
    // the width and height by subtracting the margins from those values
    var fullWidth = 700;
    var fullHeight = 450;
    // the width and height values will be used in the ranges of our scales
    var width = fullWidth - margin.right - margin.left;
    var height = fullHeight - margin.top - margin.bottom;


    var svg = d3.select('div#graph-section').append('svg')
        .attr('width', fullWidth)
        .attr('height', fullHeight)
    // this g is where the bar chart will be drawn
    .append('g')
        // translate it to leave room for the left and top margins
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    // x value determined by month
    var horScale = d3.scaleBand()
        .domain(hors)
        .range([0, width])
        .paddingInner(0.1);
    
    // the width of the bars is determined by the scale
    var bandwidth = horScale.bandwidth();
    
    // y value determined by temp
    var maxSize = d3.max(data, function(d) { return d.height; });
    console.log(maxSize) 
    console.log("size")
    var tempScale = d3.scaleLinear()
        .domain([0, maxSize])
        .range([height, 0])
        .nice();
    
    var xAxis = d3.axisBottom(horScale);
    var yAxis = d3.axisLeft(tempScale);
    
    // draw the axes
    svg.append('g')
        .classed('x axis', true)
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);
    
    var yAxisEle = svg.append('g')
        .classed('y axis', true)
        .call(yAxis);
    
    // add a label to the yAxis
    var yText = yAxisEle.append('text')
        .attr('transform', 'rotate(-90)translate(-' + height/2 + ',0)')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('dy', '-2.5em')
        .style('font-size', 14)
        .text(yTitle);
    
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", (width/2) )
        .attr("y", height + 35)
        .style('font-size', 14)
        .text(xTitle); 

    var barHolder = svg.append('g')
    .classed('bar-holder', true);
    
    // draw the bars
    var bars = barHolder.selectAll('rect.bar')
        .data(data)
    .enter().append('rect')
        .classed('bar', true)
        .attr('x', function(d, i) {
            // the x value is determined using the
            // y of the datum
            return horScale(d.hor)
        })
        .attr('width', bandwidth)
        .attr('y', function(d) {
            // the y position is determined by the datum's temp
            // this value is the top edge of the rectangle
            return tempScale(d.height);
        })
        .attr('height', function(d) {
            // the bar's height should align it with the base of the chart (y=0)
            return height - tempScale(d.height);
        });

    svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text(title)
}   