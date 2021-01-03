$(document).ready(function() {

    $('#imageFile').change(function(evt) {

        var files = evt.target.files;
        var file = files[0];

        if (file) {
            // ShowImage(file);
            ResizeImagebyFile(file);
        }
    });
});

function ShowImage(file){
    var reader = new FileReader();
    reader.onload = function(e) {
        console.log(e);

        document.getElementById('preview').src = e.target.result;
        // ResizeImage('imageFile', 'output');
    };
    reader.readAsDataURL(file);
}

function ResizeImagebyFile(file) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var filesToUploads = document.getElementById('imageFile').files;
        var file = filesToUploads[0];
        if (file) {

            var reader = new FileReader();
            // Set the image once loaded into file reader
            reader.onload = function(e) {

                var img = document.createElement("img");
                img.src = e.target.result;

                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var MAX_WIDTH = 400;
                var MAX_HEIGHT = 400;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                dataurl = canvas.toDataURL(file.type);
                console.log(dataurl);
                document.getElementById('output').src = dataurl;
            }
            reader.readAsDataURL(file);

        }

    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}