const createLineGraph = (data1) => {
    console.log(data1);
    console.log("producing data")
    var title = document.getElementById("title").value // getting the title
    var margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = 700 - margin.left - margin.right // Use the window's width 
    , height = 450 - margin.top - margin.bottom; // Use the window's height

    var yData = [] 
    var xData = [] 
    var yTitle = "hello"
    var xTitle = "billy"

    if (typeof data1[0][1] == 'string' || data1[0][1] instanceof String){ 
        i = 1;
        xTitle = data1[0][0] 
        yTitle = data1[0][1] 
    }
    for(var j = i; j < data1.length; j++){ 
        if(data1[j][0] == ""){
            data1.splice(j,1)
        }
    }

    for(i; i < data1.length; i++){
        ydata = Number(data1[i][1])  
        xdata = Number(data1[i][0]) 
        xData.push(xdata)
        yData.push(ydata)
    }
    console.log(xData)
    console.log(yData)
    // The number of datapoints
    var n = data1.length;
    var maxDomain = 0
    var maxY = 0 

    for (var i = 0 ; i < n ; i++){
        if (maxDomain < xData[i]) {
            maxDomain = xData[i] 
        }
        if (maxY < yData[i]) { 
            maxY = yData[i] 
        }
    }
    console.log(maxDomain)
    console.log(maxY)

    var xScale = d3.scaleLinear()
        .domain([0, maxDomain-1]) // input
        .range([0, width]); // output

    var yScale = d3.scaleLinear()
        .domain([0, maxY]) // input 
        .range([height, 0]); // output 

    // d3's line generator
    var line = d3.line()
        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line


    var dataset = []
    for (var i = 0 ; i < yData.length; i++){
        tempData = {y: yData[i]}
        dataset.push(tempData) 
    }

    console.log(dataset) 
    console.log("dataset is up there") 


    // Add the SVG to the page and employ #2
    var svg = d3.select("div#graph-section").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom
  
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", (width/2) )
        .attr("y", height + 35)
        .style('font-size', 14)
        .text(xTitle); 

    // 4. Call the y axis in a group tag
    var yAxisEle = svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    var yText = yAxisEle.append('text')
        .attr('transform', 'rotate(-90)translate(-' + height/2 + ',0)')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('dy', '-2.5em')
        .style('font-size', 14)
        .text(yTitle);

    // Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

    // Appends a circle for each datapoint 
    svg.selectAll(".dot")
        .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return xScale(i) })
        .attr("cy", function(d) { return yScale(d.y) })
        .attr("r", 5);

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(title)
    

}