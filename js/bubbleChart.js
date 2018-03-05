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
    var H = 480;
    
    var format = oldD3.format(",d");
    
    var color = oldD3.scale.category10();
    
    var canvas =  oldD3.select("body").append("svg")
                .attr("width", W)
                .attr("height", H)
                .attr("transform", "translate(500,350)");  
    
    var pack = oldD3.layout.pack()
                .size([W, W])
                .sort(null)
                .padding(10)
                .value(function(d){return d.cr;}); 
    
    var nodes = canvas.datum(dataArray)
                .selectAll(".node")
                .data(pack.nodes)
                .enter()
                .append("g")
                .attr("transform", function(d){return "translate(" + d.x + "," + d.y + ")";});      
    
    nodes.append("circle")
                .attr("r", function(d) {return d.r; } )
                .attr("fill", function(d,i) { return !d.children ? color(i) : "white"; })
                .attr("stroke", "grey");    
    
    nodes.append("text")
                .text(function(d){return d.children ? "" : d.cr;})
                .appendChild(function(d){return d.children ? "" : d.name;});//<!-- if statement, if has children dont display name else display it -->     
}
