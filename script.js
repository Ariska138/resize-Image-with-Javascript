$(document).ready(function() {

    $('#imageFile').change(function(evt) {

        var files = evt.target.files;
        var file = files[0];

        if (file) {
            ShowImage(file, function(url){
                document.getElementById('preview').src = url;
            });
            ResizeImagebyFile(file, function(url){
                document.getElementById('output').src = url;
            });
        }
    });
});

function ShowImage(file, callback){
    var reader = new FileReader();
    reader.onload = function(e) {
        console.log(e.loaded/1000+" kB");
                if(e.loaded == e.total){
                    console.log("Tidak Rusak");
                }

        callback(e.target.result);
        // ResizeImage('imageFile', 'output');
    };
    reader.readAsDataURL(file);
}

function ResizeImagebyFile(file, callback) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
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
                callback(dataurl);
            }
            reader.readAsDataURL(file);

        }

    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}