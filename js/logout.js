function logout(){
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++)
	  eraseCookie(cookies[i].split("=")[0]);
   
   window.location = "http://192.168.32.6:8382/hwrepository/1.0.0/";
}