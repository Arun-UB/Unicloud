 function Main($scope, $http) {

     $scope.getFiles = function (path) {

         console.log($scope.store)
         console.log(token)
         var token;
         var boxToken = "39ba59d638a9695aa6cdc1f990e248b3";
         var dropboxToken = "7f24ae465248f27d815f7ddec7568e60";
         var driveToken = "7851eec514cdc9b63127ead15d43c4a7";

         switch ($scope.store) {
         case "box":
             token = boxToken;
             break;
         case "dropbox":
             token = dropboxToken;
             break;
         case "drive":
             token = driveToken;
             break;
         }
         $scope.fileList = null;
         console.log(token)
         $http({
             method: 'GET',
             url: 'https://console.cloud-elements.com/elements/api-v1/document/list',
             params: {
                 'path': path
             },
             headers: {
                 'Authorization': 'Element ' + token
             }
         }).success(function (data, status) {
             $scope.fileList = data.results.records;
         });
     }

     $scope.getURLs = function (store, path, dwn) {
         var token;
         var boxToken = "39ba59d638a9695aa6cdc1f990e248b3";
         var dropboxToken = "7f24ae465248f27d815f7ddec7568e60";
         var driveToken = "7851eec514cdc9b63127ead15d43c4a7";
         console.log(store);
         switch (store) {
         case "box":
             token = boxToken;
             break;
         case "dropbox":
             token = dropboxToken;
             break;
         case "drive":
             token = driveToken;
             break;
         };
         $http({
             method: 'GET',
             url: 'https://console.cloud-elements.com/elements/api-v1/document/getAccessUrls',
             params: {
                 'path': path
             },
             headers: {
                 'Authorization': 'Element ' + token
             }
         }).success(function (data, status) {
                 console.info(data);
                 var durl = data.links.download;
                 console.log(dwn)
                 if (dwn === 'dwn') {
                    SaveToDisk(durl);
                 }
                else {
                     $scope.viewUrl = data.links.view;
                     console.log($scope.viewUrl);
                     bootbox.dialog({
                        message: data.links.view,
                        title: "Here's your link to share.",
                        buttons: {
                            success: {
                                label: "Ok.",
                                className: "btn-success",
                                callback: function () {
                                    console.log("Ok Button Clicked.");
                                }
                            }
                        }
                    });
                 }
             }
             //$scope.fileList = data.results.records;
         );
     }

 }

 function SaveToDisk(fileURL, fileName) {
                         // for non-IE
                         if (!window.ActiveXObject) {
                             var save = document.createElement('a');
                             save.href = fileURL;
                             save.target = '_blank';
                             save.download = fileName || fileURL;
                             var evt = document.createEvent('MouseEvents');
                             evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
                                 false, false, false, false, 0, null);
                             save.dispatchEvent(evt);
                             (window.URL || window.webkitURL).revokeObjectURL(save.href);
                         }

                         // for IE
                         else if ( !! window.ActiveXObject && document.execCommand) {
                             var _window = window.open(fileURL, "_blank");
                             _window.document.close();
                             _window.document.execCommand('SaveAs', true, fileName || fileURL)
                             _window.close();
                         }
                     }
                 