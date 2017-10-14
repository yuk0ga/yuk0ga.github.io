$(function(){
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
    if ($(this).scrollTop() > 100) {
      $(".icon-scroll-top").fadeIn(300);
    } else {
      $(".icon-scroll-top").fadeOut(300);
    }

    var windowHeight = $(window).height(),
        pos = windowHeight - 35;
    if ($(this).scrollTop() > pos) {
      $(".icon-menu").css("color", "black");
    } else {
      $(".icon-menu").css("color", "white");
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

    $(".hero-image")
        .fadeOut(400, function() {
          //load new image
            $(".hero-image").attr({
              style: "background-image: url(" +mypics[randomNum]+ ");"
            });
        })
        .fadeIn(600);
  })
});
