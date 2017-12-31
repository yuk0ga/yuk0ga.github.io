$(function(){
  var heroImage = $('.hero-image');
  heroImage.animate({ opacity: 1 }, { duration: 1700 });
  var numberOfPics = 21;
  var mypics = [];
  for (var i = 1; i < numberOfPics+1; i++) {
    mypics.push('images/bg'+[i]+'-min.JPG');
  }
  window.sr = ScrollReveal({ duration: 1000 });
  sr.reveal('#hero-name');
  sr.reveal('.menu3');
  sr.reveal('.hero-text > .row > h6');

  // change background-image on very access
  var randomNum = Math.floor(Math.random() * mypics.length);
  heroImage.attr({
    style: "background-image: url(" +mypics[randomNum]+ ");"
  });

  $(window).scroll(function(){
    var windowHeight = $(window).height();
    var profilePosition = $('.profile').offset().top - 30;
    var blogPosition = $('.blog').offset().top - 30;
    var projectsPosition = $('.projects').offset().top - 30;
    var iconScrollTop = $('.icon-scroll-top');

    if ($(this).scrollTop() > 100) {
      iconScrollTop.fadeIn(300);
      iconScrollTop.addClass('icon-scroll-top-appear');
    } else {
      iconScrollTop.addClass('icon-scroll-top-disappear');
      iconScrollTop.fadeOut(400, function(){
        iconScrollTop.removeClass('icon-scroll-top-clicked');
        iconScrollTop.removeClass('icon-scroll-top-appear');
        iconScrollTop.removeClass('icon-scroll-top-disappear');
      });
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

    if ($(this).scrollTop() > windowHeight/4) {
      sr.reveal('.profile > .container > .section-heading');
      sr.reveal('.mypic');
      sr.reveal('.profiletext');
    }

    if ($(this).scrollTop() > profilePosition) {
      $('#nav-profile').addClass('selected');
    } else {
      $('#nav-profile').removeClass('selected');
    }

    if ($(this).scrollTop() > profilePosition/4) {
      sr.reveal('.blog > .container > .section-heading');
      sr.reveal('.most-recent > h5');
      sr.reveal('#featuredImg');
      sr.reveal('#content');
      sr.reveal('.otherPosts > h5');
      sr.reveal('#recent-posts');
    }

    if ($(this).scrollTop() > blogPosition) {
      $('#nav-profile').removeClass('selected');
      $('#nav-blog').addClass('selected');
    } else {
      $('#nav-blog').removeClass('selected');
    }

    if ($(this).scrollTop() > blogPosition/4) {
      sr.reveal('.projects > .container > .section-heading');
      sr.reveal('.card');
    }

    if ($(this).scrollTop() > projectsPosition) {
      $('#nav-blog').removeClass('selected');
      $('#nav-projects').addClass('selected');
    } else {
      $('#nav-projects').removeClass('selected');
    }
});

  $(".icon-scroll-top").click(function(){
    $(this).addClass('icon-scroll-top-clicked');
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

    heroImage.fadeOut(500, function() {
            $(this).attr({
              style: "background-image: url(" +mypics[randomNum]+ ");"
            });
            $(this).fadeIn(1);
        });
     heroImage.animate({ opacity: 1 }, { duration: 1700 });
  });

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

var touch = 'ontouchstart' in document.documentElement
            || navigator.maxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;

if (touch) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}

});
