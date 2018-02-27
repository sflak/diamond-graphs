
let fileInfoArea = $('#filename');
let fileInput = $('#file').change(function(event){
    let name = event.target.value.split('\\').pop();
    fileInfoArea.text(name);
});

