(function(global) {

	//set up a namespace for our utility
	var ajaxUtils = {} ;

	//Returns an HTTP request object
	function getRequestObject() {
		if(window.XMLHttpRequest) {
			return ( new XMLHttpRequest()) ;
		}

		else if ( window.ActiveXObject) {
			//For very old IE browsers (optional)
			return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
		}

		else
		{
			global.alert("Ajax is not supported") ;
			return null ;
		}
	}

	// Make an Ajax GET request to 'requestURL'

	ajaxUtils.sendGetRequest =
		function(requestURL , responseHandler , isJsonResponse) {
			var request = getRequestObject() ;
			request.onreadystatechange =
				function() {
					handleResponse(request , responseHandler , isJsonResponse )
				};

			request.open("GET" , requestURL , true);
			request.send() ;

		};

		//Only calss user provided 'responseHandler'

		function handleResponse( request , responseHandler
			        				, isJsonResponse) {

			if ( (request.readyState == 4) &&
				  (request.status==200)) {

				//Default to isJsonResponse = true
			if (isJsonResponse == undefined)
				isJsonResponse == true ;

			if(isJsonResponse)
					responseHandler(JSON.parse(request.responseText));
			else
					responseHandler(request.responseText) ;
			}
		}

		//Expose utility to the global object
		global.$ajaxUtils = ajaxUtils ;
})(window);