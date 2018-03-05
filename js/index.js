
// File Upload interaction
let fileInfoArea = $('#filename');
let deleteFile = $('#deleteFile');
let fileInput = $('#file').change(function(event){
    let name = event.target.value.split('\\').pop();
    deleteFile.css('display', 'inline-block');
    fileInfoArea.css('display', 'inline-block');
    fileInfoArea.text(name);
    $('#driveLink').prop('disabled', true);
});

deleteFile.click(function(event) {
    
    deleteFile.css('display', 'none');
    fileInfoArea.css('display', 'none');
    $('#file').val('');
    console.log($('#file').val());
    $('#driveLink').prop('disabled', false);
});

let driveLink = $('#driveLink').change(function(event){
    let input = event.target.value;
    if(input.length > 0){
        $('#fileInput').prop('disabled', true);
    }
    else {
        $('#fileInput').prop('disabled', false);
    }
    
});



// Form Submit
$('#graphForm').submit(function(event){
    event.preventDefault();

    let rawData = {};
    let graphType = event.target[2].value;

    let fileUpload = event.target[0];
    let url = event.target[1];

    if (fileUpload.value !== ''){
       rawData['file'] = fileUpload.files[0];
    }
    else {
        if(url.value){
            
            rawData['url'] = url.value;
        }
        else {
            console.log("nothing in url input");
        }
    }

    if(Object.keys(rawData)[0] === 'url'){
        Papa.parse(rawData['url'], {
            download: true,
            complete: function(results) {
                console.log('url callback')
                console.log(results.data)
                createViz(results.data, graphType)
            }
        });
    }
    else {
        Papa.parse(rawData['file'], {
            complete: function(results) {
                createViz(results.data, graphType)
            }
        });
    }
    
});


var script3 = document.createElement("script"),
    script5 = document.createElement("script"),
    oldD3;

function noConflict() {
    oldD3 = d3;
    script5.type = "text/javascript";
    script5.src= "https://d3js.org/d3.v5.js";
    script5.addEventListener("load", ready, false);
    document.head.appendChild(script5);
}

function ready(){
    document.getElementById("version3").textContent = oldD3.version;
    document.getElementById("version5").textContent = d3.version;
}

script3.type="text/javascript";
script3.src="http://d3js.org/d3.v3.min.js";
script3.addEventListener("load", noConflict, false);
document.head.appendChild(script3);


// USE THESE SWITCH STATEMENTS TO PASS [data] TO YOUR VISUALIZATION
const createViz = (data, type) => {
    document.getElementById("graph-section").innerHTML = "";
    switch(type){
        case 'bar':
            console.log('bar graph');
            createBarChart(data);
            break;
        case 'line':
            console.log('line graph');
            // createLineGraph(data);
            break;
        case 'map':
            console.log('map graph');
            break;
        case 'bubble':
            console.log('bubble graph');
            createBubble(data);
            break;
        case 'timeseries':
            console.log('timeseries graph');
            break;
        case 'piechart':
            console.log('pie chart');
            createPieChart(data);
            break;
    }


}


