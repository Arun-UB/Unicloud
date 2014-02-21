

	app = null;	
	function getStoreToken(store){
	var boxToken="7f24ae465248f27d815f7ddec7568e60";
	var dropboxToken="7f24ae465248f27d815f7ddec7568e60";
	var driveToken="7851eec514cdc9b63127ead15d43c4a7";
	
	switch(store){
		case "box": return boxToken;
		case "dropbox": return dropboxToken;
		case "drive": return driveToken;
	}
	}
	
	
	function fileExplorer(store,path){
	var token=getStoreToken(store);
	var dataObj={'path':path};
	
	var url="https://console.cloud-elements.com/elements/api-v1/document/list";
	$.ajax({
    type: 'GET',
    url: url,
    beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Element '+token);},
	data:dataObj,
	success: (function(data) { 
		app = data.results.records;
		$rootScope= app;
    console.debug(data.results.records);
	}),
	failure: (function(data){
	console.log(data);
	})
});
}

//dummy call
fileExplorer('box','/');




