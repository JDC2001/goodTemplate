$(document).ready(function () {


// init Isotope
var $grid = $('#gallery-content-center').isotope({
  // options
});
// filter items on button click
$('.gallery-header-center-right-links').on( 'click', function() {
  
  $(".gallery-header-center-right-links").removeClass("gallery-header-center-right-links-current");
  $(this).addClass("gallery-header-center-right-links-current");

  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});


});