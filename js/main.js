$(function(){
  $(".hero-image").animate({ opacity: 1 }, { duration: 1700 });
  var numberOfPics = 14;
  var mypics = [];
  for (var i = 1; i < numberOfPics+1; i++) {
    mypics.push("images/bg"+[i]+".JPG");
  }

  // change background-image on very access
  // var randomNum = Math.floor(Math.random() * mypics.length);
  // $('.hero-image').attr({
  //   style: "background-image: url(" +mypics[randomNum]+ ");"
  // });

  $(window).scroll(function(){
    var windowHeight = $(window).height(),
        pos = windowHeight;

    if ($(this).scrollTop() > 100) {
      $(".icon-scroll-top").fadeIn(300);
    } else {
      $(".icon-scroll-top").fadeOut(300);
    }

    if ($(this).scrollTop() > pos - 35) {
      $(".icon-menu").css("color", "black");
    } else {
      $(".icon-menu").css("color", "white");
    }

		if ($(this).scrollTop() > pos) {
			$('.nav').addClass('fixed');
      $(".section-profile").addClass("topspace");
		} else {
			$('.nav').removeClass('fixed');
      $(".section-profile").removeClass("topspace");
		}
});

  $(".icon-scroll-top").click(function(){
    $("html, body").animate({scrollTop:0}, 300, "swing");
    return false;
  })

	$('a[href^=\\#]').click(function(){
		var time = 1200;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, time, "swing");
		return false;
	});

  $('#hero-name').click(function(){
    var randomNum = Math.floor(Math.random() * mypics.length);

    $(".hero-image").fadeOut(500, function() {
            $(this).attr({
              style: "background-image: url(" +mypics[randomNum]+ ");"
            });
            $(this).fadeIn(1);
        });
     $(".hero-image").animate({ opacity: 1 }, { duration: 1700 });
  })

  var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://public-api.wordpress.com/wp/v2/sites/yukogablog.wordpress.com/posts?per_page=4');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    var data = JSON.parse(ourRequest.responseText);
    createHTML(data);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();

function createHTML(postsData) {
  var featuredImg = '<img class="mainimg" src="' + postsData[0].featured_media_url + '"/>';
  var content = "";
  content += '<h4>' + postsData[0].title.rendered + '</h4>';
  content += '<p>' + postsData[0].excerpt.rendered + '</p>';
  $("#featuredImg").html(featuredImg);
  $("#content").html(content);

  var otherPosts = "";
  for (i=1; i<postsData.length; i++) {
    otherPosts += '<h5>' + postsData[i].title.rendered + '</h5>';
    otherPosts += postsData[i].excerpt.rendered;
    otherPosts += '<hr>';
  }
  $("#recent-posts").html(otherPosts);
}
});
