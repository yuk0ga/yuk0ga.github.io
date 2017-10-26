$(function(){
  $('.hero-image').animate({ opacity: 1 }, { duration: 1700 });
  var numberOfPics = 14;
  var mypics = [];
  for (var i = 1; i < numberOfPics+1; i++) {
    mypics.push('images/bg'+[i]+'.JPG');
  }

  // change background-image on very access
  // var randomNum = Math.floor(Math.random() * mypics.length);
  // $('.hero-image').attr({
  //   style: "background-image: url(" +mypics[randomNum]+ ");"
  // });

  $(window).scroll(function(){
    var windowHeight = $(window).height();
    var profilePosition = $('.profile').offset().top - 20;
    var blogPosition = $('.blog').offset().top - 20;
    var projectsPosition = $('.projects').offset().top - 20 ;

    if ($(this).scrollTop() > 100) {
      $('.icon-scroll-top').fadeIn(300);
    } else {
      $('.icon-scroll-top').fadeOut(300);
      $(".nav > .container > nav > ul > li").removeClass('selected');
    }

    if ($(this).scrollTop() > windowHeight - 35) {
      $('.icon-menu').css('color', 'black');
    } else {
      $('.icon-menu').css('color', 'white');
    }

		if ($(this).scrollTop() > windowHeight) {
			$('.nav').addClass('fixed');
      $('.profile').addClass('topspace');
		} else {
			$('.nav').removeClass('fixed');
      $('.profile').removeClass('topspace');
		}

    if ($(this).scrollTop() > profilePosition) {
      $('#nav-profile').addClass('selected');
    } else {
      $('#nav-profile').removeClass('selected');
    }

    if ($(this).scrollTop() > blogPosition) {
      $('#nav-profile').removeClass('selected');
      $('#nav-blog').addClass('selected');
    } else {
      $('#nav-blog').removeClass('selected');
    }

    if ($(this).scrollTop() > projectsPosition) {
      $('#nav-blog').removeClass('selected');
      $('#nav-projects').addClass('selected');
    } else {
      $('#nav-projects').removeClass('selected');
    }
});

  $(".icon-scroll-top").click(function(){
    $("html, body").animate({scrollTop:0}, 300, "swing");
    return false;
  })

	$('a[href^=\\#]').click(function(){
    $(".nav > .container > nav > ul > li").not($(this).parent("li")).addClass('reset');
		var time = 1200;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, time, "swing", function() {
      $(".nav > .container > nav > ul > li").not($(this).parent("li")).removeClass('reset');
    });
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
