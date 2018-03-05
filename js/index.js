
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


// IIFE sets the correct instructions even on re-load
(function(){
    setDataFormatInstructions()
}());
// Change instructions on select
$('#graph-type').change(function(){
    setDataFormatInstructions()
});

function setDataFormatInstructions (){
    let currentGraphType = $('#graph-type').val()
    let instr = '';
    let options = $('<div class="inputs__options"><p>Graph options...</p></div>');
    switch(currentGraphType){
        case('bar'):
            instr = $('<p class="inputs__main__instruc">[BAR INSTRUCTIONS HERE]</p>');
            options.append($('<input id="title" type="text" name="title" placeholder="Title" value="">'))
            break;
        case('line'):
            instr = $('<p class="inputs__main__instruc">[LINE INSTRUCTIONS HERE]</p>');
            options.append($('<p>none</p>'));
            break;
        case('map'):
            instr = $('<p class="inputs__main__instruc">[MAP INSTRUCTIONS HERE]</p>');
            options.append($('<p>none</p>'));
            break;
        case('bubble'):
            instr = $('<p class="inputs__main__instruc">[BUBBLE INSTRUCTIONS HERE]</p>');
            options.append($('<input id="title" type="text" name="title" placeholder="Title" value="">'));
            break;
        case('timeseries'):
            instr = $('<p class="inputs__main__instruc">[TIME INSTRUCTIONS HERE]</p>');
            options.append($('<p>none</p>'));
            break;
        case('piechart'):
            instr = $('<p class="inputs__main__instruc">[PIE INSTRUCTIONS HERE]</p>');
            options.append($('<input id="title" type="text" name="title" placeholder="Caption" value="">'));
            break;
      
    }
    $('#dataFormatInst').html(instr);
    $('#wrapper').html(options);
}
$('#graph-type').change(setDataFormatInstructions());



deleteFile.click(function(event) {
    
    deleteFile.css('display', 'none');
    fileInfoArea.css('display', 'none');
    $('#file').val('');
    $('#driveLink').prop('disabled', false);
});

let driveLink = $('#driveLink').change(function(event){
    let input = event.target.value;
    
    let valid = null;
    if(input.length > 0){
        $('#fileInput').prop('disabled', true);

        let regEx = /https:\/\/docs.google.com\/spreadsheets\/d\/e\/(.*?\/)pub[?]output=csv/;
        valid = regEx.test(input);

        if(!valid){
            $('<p class="inputs__errorText">Must be a valid sheets link</p>').insertAfter($('#driveLink'));
            $('#driveLink').addClass('invalid');
        }
        else{
            $('#driveLink').removeClass('invalid');
            $('#driveLink').next().remove();
        }

    }
    else {
        $('#fileInput').prop('disabled', false);
    }
    
});


var script3 = document.createElement("script"),
    script5 = document.createElement("script"),
    oldD3;

function noConflict() {
    oldD3 = d3;

    window.d3 = null;

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

