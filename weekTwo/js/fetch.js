$(document).ready(() => {
    $("#cat1").hide();

    $('#homeMenu').click(function(){
        $('#home').show();
        $("#cat1").hide();
    });

  });

( function()
 {// Initialize Firebase
   var config = {
    apiKey: "AIzaSyDT-K_4Xkw4a-kbF7OFLdv9TT0mh7dh3oc",
    authDomain: "blog-c5747.firebaseapp.com",
    databaseURL: "https://blog-c5747.firebaseio.com",
    projectId: "blog-c5747",
    storageBucket: "blog-c5747.appspot.com",
    messagingSenderId: "30673458227"
  };
  firebase.initializeApp(config);
})();

var blogPost = firebase.database().ref('UserPost');

var userId = sessionStorage.getItem('key');
if(userId===null)
  userId = localStorage.getItem("id");

var i=0;
blogPost.on("value",(doc) => {
  $("#sec1").empty();
  $("#load").css('display','none');
    doc.forEach((data) =>
    {
      var get = data.val();
      if(get.uid===userId)
      {
       var div = document.createElement('div');
       div.setAttribute('id','p'+i);
       div.setAttribute('class','container');
       document.getElementById('sec1').appendChild(div); 
       document.getElementById('p'+i).innerHTML = "<strong>"+get.title + "<br/>" + get.shortDescription + "<br/> Author :" + get.author + "</strong><br/> <i class='fas fa-calendar-alt' style='color:grey;font-size:15px;'>"+get.date+"</i>";
       i++;
      }
    });
    if(i===0)
        document.getElementById('sec1').innerHTML = "<h3>No Recent Posts</h3>";
});

var filter = (type) => {
  i=0;
  $("#type").text(type);
  $("#sec2").empty();
  blogPost.on("value",(doc) => {
    doc.forEach((data) =>
    {
      var get = data.val();
      if(get.uid===userId&&get.category===type )
      {

       var div = document.createElement('div');
       div.setAttribute('id','cp'+i);
       div.setAttribute('class','container');
       document.getElementById('sec2').appendChild(div);
       document.getElementById('cp'+i).innerHTML = "<div style='margin-left:200px;'><i class='far fa-edit' style='padding-right:15px;' onclick='fetch(\""+get.pid+"\");'></i><i class='fas fa-trash-alt' onclick='del(\""+get.pid+"\");'></i></div><br/>"+
       "<strong>"+get.title + "<br/>" + get.shortDescription + "<br/> Author :" + get.author + "</strong><br/> <i class='fas fa-calendar-alt' style='color:grey;font-size:15px;'>"+get.date+"</i>";

       var idiv = document.createElement('div');
       idiv.setAttribute('id','t'+i);
      // idiv.setAttribute('class','panel');
       document.getElementById('cp'+i).appendChild(idiv);
       document.getElementById('t'+i).innerHTML = "<hr/><br/><p style='text-align:justify;font-family:Ruluko;font-size:20px;'>"+get.content+"</p><br/>";
       i++;
      }
    });
    if(i===0)
        document.getElementById('sec2').innerHTML = "<h3>No Posts available</h3>";
    $("#home").hide();
    $("#cat1").show();
});
}


var fetch = (pid) =>
{
  blogPost.on("value",(doc) => {
    doc.forEach((data) =>
    {
      var get = data.val();
      if(get.uid===userId&&get.pid===pid)
      {
       /* document.getElementById('title').setAttribute('value',get.title);
        document.getElementById('shortDescription').setAttribute('value',get.shortDescription);
        document.getElementById('category').innerHTML = "<option value="+get.category+" selected>"+get.category+"</option>"
        document.getElementById('author').setAttribute('value',get.author);
        document.getElementById('content').innerHTML = get.content;
        editPost = get.pid;*/
        localStorage.setItem("pid",pid);
        console.log("success");
        console.log(get.title+" "+get.author+" "+get.shortDescription+" "+get.category+" "+get.content);
        //flag =1;
      }
    });
    if(localStorage.getItem('pid')!=null)
        window.location.href = "edit.html";
});
}

var del = (pid) =>
{
  firebase.database().ref().child('/UserPost/'+pid).remove();
   window.location.reload();
}


// ===== Scroll to Top ==== 
$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
      $('#return-to-top').fadeIn(200);    // Fade in the arrow
  } else {
      $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  }
});
$('#return-to-top').click(function() {      // When arrow is clicked
  $('body,html').animate({
      scrollTop : 0                       // Scroll to top of body
  }, 500);
});
  
