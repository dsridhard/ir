jQuery.fn.liScroll = function (settings) {
  settings = jQuery.extend({
    travelocity: 0.03
  }, settings);
  return this.each(function () {
    var $strip = jQuery(this);
    $strip.addClass("newsticker")
    var stripHeight = 1;
    $strip.find("li").each(function (i) {
      stripHeight += jQuery(this, i).outerHeight(true); // thanks to Michael Haszprunar and Fabien Volpi
    });
    var $mask = $strip.wrap("<div class='mask'></div>");
    var $tickercontainer = $strip.parent().wrap("<div class='tickercontainer'></div>");
    var containerHeight = $strip.parent().parent().height(); //a.k.a. 'mask' width 	
    $strip.height(stripHeight);
    var totalTravel = stripHeight;
    var defTiming = totalTravel / settings.travelocity; // thanks to Scott Waye		
    function scrollnews(spazio, tempo) {
      $strip.animate({
        top: '-=' + spazio
      }, tempo, "linear", function () {
        $strip.css("top", containerHeight);
        scrollnews(totalTravel, defTiming);
      });
    }
    scrollnews(totalTravel, defTiming);
    $strip.hover(function () {
        jQuery(this).stop();
      },
      function () {
        var offset = jQuery(this).offset();
        var residualSpace = offset.top + stripHeight;
        var residualTime = residualSpace / settings.travelocity;
        scrollnews(residualSpace, residualTime);
      });
  });
};
window.updateClock = function () {

  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();
  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = (currentHours < 12) ? "AM" : "PM";
  // Convert the hours component to 12-hour format if needed
  currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
  // Convert an hours component of "0" to "12"
  currentHours = (currentHours == 0) ? 12 : currentHours;
  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
  $("#clockDash").html(currentTimeString);
}

$(function () {
  $("ul#ticker01").liScroll();
  $("ul#ticker02").liScroll();
  setInterval('updateClock()', 1000);
  $("#dateDash").html(new Date().toDateString());

  $('.dropdown-menu a.dropdown-toggle').on('mouseenter', function (e) {
    var $el = $(this);
    $el.toggleClass('active-dropdown');
    var $parent = $(this).offsetParent(".dropdown-menu");
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');

    $(this).parent("li").toggleClass('show');

    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
      $('.dropdown-menu .show').removeClass("show");
      $el.removeClass('active-dropdown');
    });

    if (!$parent.parent().hasClass('navbar-nav')) {
      console.log($el.next())
      $el.next().css({
        "top": $el[0].offsetTop,
        "left": $parent.outerWidth() - 10
      });
    }

    return false;
  });
  $(".megamenu").on("mouseleave", function () {
    // make sure it is shown:
    $(".dropdown-menu").find('.show').removeClass("show");
    $(".megamenu").slideUp(200);
  });
  $('.dropdown-menu').on("mouseleave", function () {
    $(".dropdown-menu").find('.show').removeClass("show");
  });
  animateValue("visitor", 500, 877, 10);
});
function animateValue(id, start, end, duration) {
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : +1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.getElementById(id);
  var timer = setInterval(function() {
      current += increment;
      obj.innerHTML = current;
      if (current == end) {
          clearInterval(timer);
      }
  }, stepTime);
}