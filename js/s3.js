/**
 * Created by kuangyou on 6/15/16.
 */
var imageBucketName = "keycynthia-image";

AWS.config.update({accessKeyId: 'AKIAID52G7HATYHNRHCA', secretAccessKey: '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'});
AWS.config.region = 'us-west-2';
var s3Client = new AWS.S3();

function getS3Images() {
    s3Client.listObjects({Bucket: imageBucketName}, function(error, data) {
        if (error) {
            alert(error); // an error occurred
        } else {
            // request succeeded
            var newDivChildNode = jQuery('<div>');
            newDivChildNode.attr('id', 'gallery-image-holder');
            $('#gallery').append(newDivChildNode);

            for (var i = 0; i < data.Contents.length; i++) {
                var currImageName = data.Contents[i].Key;
                loadS3Images(currImageName);
            }
        }
    });
}

function loadS3Images(currImageName) {
    s3Client.getSignedUrl('getObject', {Bucket: imageBucketName, Key: currImageName}, function(err, url) {
        if (err) {
            console.error(err);
        } else {
            var img = $('<img class="slide">');
            img.attr('src', url);
            img.click(function() {
                console.log(this.src);
                openSlideShow(this.src);
            });
            img.appendTo('#gallery-image-holder');

        }
    });

}

// open the slide show black box, with id as the marker point.
function openSlideShow(imageURL){
    var blackOverlay = document.createElement("div");
    blackOverlay.id = "overlay";
    blackOverlay.onclick = closeSlideShow;

    // close button
    var closeButton = document.createElement("p");
    closeButton.id = "closeButton";
    closeButton.onclick = closeSlideShow;
    closeButton.innerHTML = "&#215";

    // center image
    var imageBlock = document.createElement("img");
    imageBlock.id = "overlay-image";
    imageBlock.src = imageURL;

    blackOverlay.appendChild(closeButton);
    blackOverlay.appendChild(imageBlock);
    document.body.appendChild(blackOverlay);
}

function closeSlideShow(){
    var itself = document.getElementById("overlay");
    itself.parentNode.removeChild(itself);
}
