
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
    $('#driveLink').prop('disabled', false);
});

let driveLink = $('#driveLink').change(function(event){
    console.log('change');
    console.log(event.target.value);
    let input = event.target.value;
    if(input.length > 0){
        $('#fileInput').prop('disabled', true);
    }
    else {
        $('#fileInput').prop('disabled', false);
    }
    
});

const parseFile = (file) => {
    let data = [];
    Papa.parse(file, {
        complete: function(results) {
            console.log("Finished:", results.data);
            data = results
            return data;
        }
    });

    
}



// Form Submit
$('#graphForm').submit(function(event){
    event.preventDefault();

    let rawData = {};
    let graphType = event.target[2].value;

    let fileUpload = event.target[0];
    let url = event.target[1];
    


    if (fileUpload.value){
       rawData['file'] = fileUpload.files[0];
    }
    else {
        console.log('url pasted');
        if(url.value){
            rawData['url'] = url.value;
        }
        else {
            console.log("nothing in url input");
        }
    }

    createViz(rawData, graphType);

    console.log(event);
});


const createViz = (data, type) => {

    console.log('rawdata');
    console.log(data);
    console.log('graphType');
    console.log(type);

}


