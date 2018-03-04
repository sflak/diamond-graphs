
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


