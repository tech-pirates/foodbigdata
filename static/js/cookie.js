function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
	}
	return "";
}

function randomCookie(length) {
    var str = Math.random().toString(36).substr(2);
    if (str.length>=length) {
        return str.substr(0, length);
    }
    str += random(length-str.length);
    return str;
}

function checkCookie(){
	var user=getCookie("username");
	if (user!=""){

	}
	else {
		user = randomCookie(32);
  		if (user!="" && user!=null){
    		setCookie("username",user,30);
    	}
	}
}