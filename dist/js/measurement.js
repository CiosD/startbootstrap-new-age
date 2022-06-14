// task 1 - check if user visited the website in last 7 days
function setCookie(name,value,exdays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=name + "=" + value;
    
}

function getCookie(name){
    var value = document.cookie;
    var start = value.indexOf(" " + name + "=");
    if (start == -1){
        start = value.indexOf(name + "=");
        
    }if (start == -1){
        value = null;
        
    }else{
        start = value.indexOf("=", start) + 1;
        var end = value.indexOf(";", start);
        if (end == -1){
            end = value.length;
            
        } value = unescape(value.substring(start,end));
        
    }return value;
    
};

checkSession();

function checkSession(){
   var cookie = getCookie("first_visit");
   if (cookie === "no") {
     console.log("Už jsem tady byl.");
   } else {
     console.log("Jsem tady poprvé za posledních 7 dní.");
   }
   setCookie("first_visit", "no", 7); 
}
       
// task 2 - user visited website - info about page and timestamp
// var dataLayer = window.dataLayer = window.dataLayer || []; // I defined dataLayer here. I believe it's because of my current job. I'm using' it for faster testing since I have some extension in my browser that are checking DL.

document.addEventListener("DOMContentLoaded", function saveInfo() {

    var visitedUrl = document.location.href; 
    var visitDate = new Date;
    var visitedDate = visitDate.toUTCString(); 
    
    console.log("Page visit:" + " " + visitedUrl + " " + "on:" + " " + visitedDate);
    //dataLayer.push({"event": "page visit", "url": visitedUrl , "visit_date": visitedDate}) // again - DL is here for no reason, just for tests. Please ignore.
  });

// task 3 - track user's link clicks
document.addEventListener('click', () => {
    var elements = document.getElementsByTagName('a');
    var time = new Date().getTime();
    for(var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = function () {
            var links = window.location.href;
            console.log("clink on link:"+ " " + links);
            // dataLayer.push({ "event": "click on link", "url": links , "timestamp": time });
        }
    }
    
});

// task 4 - track where the user leaves the website

window.addEventListener("beforeunload", function() {
    var exitPage = window.location.href;
    var exitTime = new Date().getTime();

    console.log("exit page:" + " " + exitPage + " " + "timestamp: " + exitTime);
    // dataLayer.push({ "event": "exit page", "url": exitPage, "exit_time": exitTime});;
});

