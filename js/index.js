
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
    switch(currentGraphType){
        case('bar'):
            instr = $('<p class="formatInstructions">[BAR INSTRUCTIONS HERE]</p>');
            break;
        case('line'):
            instr = $('<p class="formatInstructions">[LINE INSTRUCTIONS HERE]</p>');
            break;
        case('map'):
            instr = $('<p class="formatInstructions">[MAP INSTRUCTIONS HERE]</p>');
            break;
        case('bubble'):
            instr = $('<p class="formatInstructions">[BUBBLE INSTRUCTIONS HERE]</p>');
            break;
        case('timeseries'):
            instr = $('<p class="formatInstructions">[TIME INSTRUCTIONS HERE]</p>');
            break;
        case('piechart'):
            instr = $('<p class="formatInstructions">[PIE INSTRUCTIONS HERE]</p>');
            break;
      
    }
    $('#dataFormatInst').html(instr);
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

