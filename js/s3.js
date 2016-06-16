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
            var divNumberNeeded = data.Contents.length / 10;

            // Append enough divs to hold the images
            // 10 images sliding per page.
            for (var i = 0; i < divNumberNeeded; i++) {
                var newDivChildNode = jQuery('<div>');
                newDivChildNode.attr('id', 'div-line-' + i);
                $('#gallery').append(newDivChildNode);
            }

            for (var i = 0; i < data.Contents.length; i++) {
                var currImageName = data.Contents[i].Key;
                loadS3Images(currImageName, parseInt(i / 10));
            }
        }
    });
}

function loadS3Images(currImageName, i) {
    s3Client.getSignedUrl('getObject', {Bucket: imageBucketName, Key: currImageName}, function(err, url) {
        if (err) {
            console.error(err);
        } else {
            var img = $('<img class="slide">');
            img.attr('src', url);
            img.appendTo('#div-line-' + i);
            console.log(i);
        }
    });

}
