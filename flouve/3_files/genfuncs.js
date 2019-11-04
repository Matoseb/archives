// General functions
// For UER
// Coded by av on Apr 13 2005
// Updated Feb 7 2006

xMousePos = 0;
yMousePos = 0;
xMousePosMax = 0;
yMousePosMax = 0;
xMousePosMin = 0;
yMousePosMin = 0;

hideInterval = null;
dontshow = false;
dontshowurl = "";
lastURL = null;



function pOver(txtURL, wid, hig)
{
	if (dontshow) return;
	if (!document.getElementById) return;
	if (dontshowurl == txtURL) return;
	
	lastURL = txtURL;
	
	
	if (wid > 800)
	{
		// resize if too large
		var w2 = 800;
		hig = Math.floor((w2 / wid) * hig);
		wid = w2;
		
	}
	
	clearInterval(hideInterval);
	
	//alert("debugging! " + txtURL);	
	var picHolder = document.getElementById("popPicHolder");
	
	if (picHolder)
	{
		picHolder.style.display = "block";
		
		// Put in right place.
		
		var halfWay = ((yMousePosMax - yMousePosMin) / 2) + yMousePosMin;
		
		if (yMousePos > halfWay)
		{
			// put it above.	
			picHolder.style.top = yMousePosMin + 10;	
		}
		else
		{
			// put it below	
			picHolder.style.top = yMousePosMax - hig - 30;	
		}
		
		picHolder.style.left = ((xMousePosMax - xMousePosMin) / 2) - (wid / 2);
		
		picHolder.style.width = wid;
		picHolder.style.height = hig;
		
		picHolder.style.border = "10px solid black";
		
		var imgHolder = document.getElementById("popPicImg");
		
		imgHolder.src = "https://web.archive.org/web/20190608222221/http://www.uer.ca/picload.gif";
		imgHolder.width = wid;
		imgHolder.height = hig;
		imgHolder.src = txtURL;
	}
	
}

function pOut()
{
	// pOut: The mouse moved off the thumbnail or off the big picture.
	// Hide in 500 ms.
	clearInterval(hideInterval);
	hideInterval = setInterval("pOut2()", 500);
	dontshowurl = lastURL;
}

function pOut2()
{
	// Hide now.
	if (!document.getElementById) return;
	
	clearInterval(hideInterval);
	
	dontshowurl = "";
	
	var picHolder = document.getElementById("popPicHolder");
	if (picHolder)
	{
		picHolder.style.display = "none";
		
		var imgHolder = document.getElementById("popPicImg");
		imgHolder.src = "https://web.archive.org/web/20190608222221/http://www.uer.ca/picload.gif";
	}
}

function pOut3()
{
	// Click on the big picture. Hide it IMMEDIATLY.
	pOut2();
	// Don't show this again for 500 ms.
	dontshowurl = lastURL;
	clearInterval(hideInterval);
	hideInterval = setInterval("pOut2()", 500);
}

function pNoHide()
{
	// The mouse is on the BIG picture. Don't hide it now.
	clearInterval(hideInterval);
}


// Used to figure out where the mouse is:
if (document.layers) 
{ 
	// Netscape
    document.captureEvents(Event.MOUSEMOVE);
    document.onmousemove = captureMousePosition;
} 
else if (document.all) 
{ 
	// Internet Explorer
    document.onmousemove = captureMousePosition;
} 
else if (document.getElementById) 
{ 
	// Netcsape 6
    document.onmousemove = captureMousePosition;
}

function captureMousePosition(e) 
{
    if (document.layers) 
    {
        // When the page scrolls in Netscape, the event's mouse position
        // reflects the absolute position on the screen. innerHight/Width
        // is the position from the top/left of the screen that the user is
        // looking at. pageX/YOffset is the amount that the user has
        // scrolled into the page. So the values will be in relation to
        // each other as the total offsets into the page, no matter if
        // the user has scrolled or not.
        xMousePos = e.pageX;
        yMousePos = e.pageY;
        xMousePosMax = window.innerWidth + window.pageXOffset;
        yMousePosMax = window.innerHeight + window.pageYOffset;
        xMousePosMin = window.pageXOffset;
        yMousePosMin = window.pageYOffset;
    } 
    else if (document.all) 
    {
        // When the page scrolls in IE, the event's mouse position
        // reflects the position from the top/left of the screen the
        // user is looking at. scrollLeft/Top is the amount the user
        // has scrolled into the page. clientWidth/Height is the height/
        // width of the current page the user is looking at. So, to be
        // consistent with Netscape (above), add the scroll offsets to
        // both so we end up with an absolute value on the page, no
        // matter if the user has scrolled or not.
        xMousePos = window.event.x + document.body.scrollLeft;
        yMousePos = window.event.y + document.body.scrollTop;
        xMousePosMax = document.body.clientWidth + document.body.scrollLeft;
        yMousePosMax = document.body.clientHeight + document.body.scrollTop;
        xMousePosMin = document.body.scrollLeft;
        yMousePosMin = document.body.scrollTop;
    } 
    else if (document.getElementById) 
    {
        // Netscape 6 behaves the same as Netscape 4 in this regard
        xMousePos = e.pageX;
        yMousePos = e.pageY;
        xMousePosMax = window.innerWidth + window.pageXOffset;
        yMousePosMax = window.innerHeight + window.pageYOffset;
        xMousePosMin = window.pageXOffset;
        yMousePosMin = window.pageYOffset;
        
    }
    
    
    if (window.santaname)
    {
	    var dd1 = document.getElementById(santaname);
	    if (dd1)
	    {
	    	dd1.style.top = yMousePos + 10;
	    	dd1.style.left = xMousePos + 10;	
	     	
	    }
	}
	
	
    
}


function frenchtr(msgid)
{
	var d = document.getElementById("post" + msgid);
	
	d.innerHTML = "Please wait while translating...";
	
	var jsel = document.createElement("SCRIPT");
	jsel.type = "text/javascript";
	jsel.src = "/frenchtr.asp?rnd=" + Math.random() + "&id=" + msgid;
	document.body.appendChild(jsel);
	
}

function frenchtr2(msgid)
{
	var d = document.getElementById("post" + msgid);
	
	d.innerHTML = "Patientez s'il vous plaît...";
	
	var jsel = document.createElement("SCRIPT");
	jsel.type = "text/javascript";
	jsel.src = "/engtr.asp?rnd=" + Math.random() + "&id=" + msgid;
	document.body.appendChild(jsel);
	
}

/*
     FILE ARCHIVED ON 22:22:21 Jun 08, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:59:11 Nov 04, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 27.992 (3)
  load_resource: 60.119
  RedisCDXSource: 1.298
  exclusion.robots: 0.312
  captures_list: 69.208
  CDXLines.iter: 24.895 (3)
  PetaboxLoader3.datanode: 30.149 (4)
  esindex: 0.018
  exclusion.robots.policy: 0.29
  PetaboxLoader3.resolve: 40.89
*/