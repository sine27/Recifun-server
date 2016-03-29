window.onload=function(){
    var buttonsShouldHide = document.getElementsByClassName("remove image");
    for(var i = 0; i < buttonsShouldHide.length; i++) {
        buttonsShouldHide[i].style.visibility = 'hidden';
    }
}

$(document).ready(function() {
    $.uploadPreview({
        input_field: "#image-upload",
        preview_box: "#image-preview",
        label_field: "#image-label"
    });
});


/*function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // This is where to load image
            // id is different with different image, if add more image, you should change id of image
            // and $('#step1') as well
            $('#step1').attr('src', e.target.result);
            console.log(e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
        document.getElementById('remove image1').style.visibility = 'visible';
    }
}
function removeImage(){
    document.getElementById("remove image1").style.visibility="hidden";
    $('#step1').attr('src', "");
}

function readURLRI(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#recipeImg').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
        document.getElementById('remove image1').style.visibility = 'visible';
    }
}
*/

(function (module) {

    var fileReader = function ($q, $log) {

        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };

        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };
    };

    module.factory("fileReader",
                   ["$q", "$log", fileReader]);

}(angular.module("plunker")));
