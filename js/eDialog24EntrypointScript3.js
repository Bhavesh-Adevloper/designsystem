function includeJS(jsPath){
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", jsPath);
    document.getElementsByTagName("head")[0].appendChild(script);
}
function addDiv(id)
{
	var el = document.createElement("div");	
	el.id = id;
	el.style.cursor="pointer";
	el.style.display="none";
	document.body.appendChild(el);	
}

function ed24LoadLibs()
{
	if(document.body != undefined)
	{	
		if (typeof jQuery === "undefined") {
            includeJS(''+ed24ChatObj.webserverAddress+'/ChatClient3/jquery-latest.js');			
        }
		loadJsonp();		
	}
	else
	{setTimeout('ed24LoadLibs()',200);}
}
function ed24CheckDivs()
{
	if(document.body != undefined)
	{	
		if(document.getElementById("ed24DivOnline") == undefined)
		{
			addDiv("ed24DivOnline");
		}	
		if(document.getElementById("ed24DivOffline") == undefined)
		{
			addDiv("ed24DivOffline");		
		}
		if(document.getElementById("ed24DivBusy") == undefined)
		{
			addDiv("ed24DivBusy");		
		}
	}
	else
	{setTimeout('ed24CheckDivs()',200);}
}
function loadJsonp()
{
	if(typeof jQuery != "undefined")
	{
		includeJS(''+ed24ChatObj.webserverAddress+'/ChatClient3/jquery.jsonp.js');
	}
	else
	{
		setTimeout('loadJsonp()',100);
	}
}

rnd.today=new Date();
rnd.seed=rnd.today.getTime();
function rnd() {
	rnd.seed = (rnd.seed*9301+49297) % 233280;
	return rnd.seed/(233280.0);
}
function genUQ() {
	var tmp = Math.ceil(rnd()*100);
	return rnd.today.getTime() + tmp.toString();
}
function getInternetExplorerVersion()
{
   var rv = -1; // Return value assumes failure.
   if (navigator.appName == 'Microsoft Internet Explorer')
   {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
         rv = parseFloat( RegExp.$1 );
   }
   return rv;
}
function checkEntryPointStatus()
{
	
		var req = ed24ChatObj.webserverAddress+'/cmd?OP=ENTRYPOINTSTATUS&mainid='+ed24ChatObj.mainid+'&ver=3&epname='+ed24ChatObj.entrypoint+'&uq='+genUQ();	
		if(getInternetExplorerVersion() == 10)
		{
			$.ajax({
			url: req+"&callback=?",
			type: "get",
			dataType: "jsonp",
			cache: false,
			success: function(data) {
			}
		});

		}
		else
		{
			jQuery.jsonp({url: req+"&callback=?"});	
		}

}
function divClick()
{
	if(curAvailability != "Busy")
		{	
			if(ed24ChatObj.windowSettings != undefined)
			{					
				window.open(ed24ChatObj.urlToOpen,'_blank',ed24ChatObj.windowSettings);
			}
			else
			{
				window.open(ed24ChatObj.urlToOpen,'_blank');
			}
		}
}
function ed24go()
{
	if(document.getElementById("ed24DivOnline") != undefined && document.getElementById("ed24DivOffline") != undefined && typeof jQuery !== "undefined" && typeof jQuery.jsonp != "undefined")
	{
		curAvailability = "Busy";
		document.getElementById("ed24DivOnline").innerHTML = ed24ChatObj['Online'];				
		document.getElementById("ed24DivOnline").onclick= divClick;
		if(ed24ChatObj['Offline'].length > 0)
		{
			document.getElementById("ed24DivOffline").onclick= divClick;
			document.getElementById("ed24DivOffline").innerHTML = ed24ChatObj['Offline'];
		}
		if(ed24ChatObj['Busy'].length > 0)
		{
			document.getElementById("ed24DivBusy").onclick= divClick;
			document.getElementById("ed24DivBusy").innerHTML = ed24ChatObj['Busy'];
		}
		checkEntryPointStatus();
	}
	else{setTimeout('ed24go()',200);}
}


function availabilityCallback(jsonData)
{

	if (curAvailability != jsonData.Availability)
	{
		document.getElementById("ed24DivOnline").style.display = 'none';
		document.getElementById("ed24DivOffline").style.display = 'none';
		document.getElementById("ed24DivBusy").style.display = 'none';
		curAvailability = jsonData.Availability;
		document.getElementById("ed24Div"+curAvailability).style.display = 'block';
	}
	setTimeout('checkEntryPointStatus()',10000);
}
function ed24jQueryReady()
{
	if (typeof jQuery != 'undefined') {
		$( document ).ready(function() {
		ed24CheckDivs();
		ed24go();
		});
	}
	else
	{
		setTimeout('ed24jQueryReady()',50);
	}
}

ed24LoadLibs();
ed24jQueryReady();


