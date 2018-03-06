const createBubble = (data) => {
    
    var dataArray = {
        "name": "data",
        "children":[]
    };
    
    for(let i = 0; i < data.length; i++){
        childContent = {"name":data[i][0], "cr":data[i][1]};
        dataArray.children.push(childContent);
    }
    
    var W = 500;
    var H = 700;
    
    var maxDomain;
    var minDomain;
    var i = 0;
    
    var dataNumbers = [];
    while(i < dataArray.children.length){
        dataNumbers.push(dataArray.children[i].cr);
        i = i + 1;
    }
    
    var minDomain = Math.min(...dataNumbers);
    var maxDomain = Math.max(...dataNumbers);
    
    var format = oldD3.format(",d");
    
    var color = oldD3.scale.category10();

    var fontScale = oldD3.scale.linear().domain([minDomain, maxDomain]).range([10, 16]);
    var displayMargins = {top: 20, left:220};
    
    var canvas =  oldD3.select(document.getElementById("graph-section")).append("svg")
                .attr("width", W)
                .attr("height", H);
                //.attr('transform', 'translate(' + displayMargins.left + ','  + displayMargins.top + ')');
    
    var pack = oldD3.layout.pack()
                .size([W, W])
                .sort(null)
                .padding(8)
                .value(function(d){return d.cr;}); 
    
    var nodes = canvas.datum(dataArray)
                .selectAll(".node")
                .data(pack.nodes)
                .enter()
                .append("g")
                .attr("transform", function(d){return "translate(" + d.x  + displayMargins.left + "," + d.y + ")";});      //+ displayMargins.left
    
    nodes.append("circle")
                .attr("r", function(d) {return d.r; } )
                .attr("fill", function(d,i) { return !d.children ? color(i) : "white"; });
                //.attr("stroke", "grey");    
    
    nodes.append("text")
                .attr("dy", "0em")
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", function(d){ return fontScale(d.cr)})
                .text(function(d){return d.children ? "" : d.cr;});
    
    nodes.append("text")
                .attr("dy", "1em")
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", function(d){ return fontScale(d.cr)})
                .text(function(d){return d.children ? "" : d.name;});
    
    canvas.append("svg:title").text("hello");  
    
    canvas.append("title").attr("x", (W/2)).attr("y", 0 - (displayMargins.top)/2).attr("text-anchor", "middle").text("Hello");
}
