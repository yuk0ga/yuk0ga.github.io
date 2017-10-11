$(function(){
  var numberOfPics = 15;
  var mypics = [];
  for (var i = 1; i < numberOfPics+1; i++) {
    mypics.push("images/bg"+[i]+".JPG");
  }

  // change background-image on very access
  // var randomNum = Math.floor(Math.random() * mypics.length);
  // $('.hero-image').attr({
  //   style: "background-image: url(" +mypics[randomNum]+ ");"
  // });

	$('a[href^=\\#]').click(function(){
		var time = 1200;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, time, "swing");
		return false;
	});

  $('.name').click(function(){
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
