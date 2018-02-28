
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

// if($('#driveLink').val()){
//     $('#fileInput').prop('disabled', true);
// }

let driveLink = $('#driveLink').change(function(event){
    console.log('change');
    console.log(event.target.value);
    let input = event.target.value;
    if(input.length > 0){
        console.log('set disabled')
        $('#fileInput').prop('disabled', true);
    }
    else {
        console.log('set enabled')
        $('#fileInput').prop('disabled', false);
    }
    
});
