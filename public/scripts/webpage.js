(function() {
  var intializeSlides, moveSlide, moveSlideNext, moveSlidePrevious, resetSlideButtons;
  $(document).ready(function() {
    intializeSlides(".slides_container");
    $(".slides_previous").click(function() {
      moveSlide($(this));
      return false;
    });
    return $(".slides_next").click(function() {
      moveSlide($(this));
      return false;
    });
  });
  intializeSlides = function(slide_container) {
    return $(slide_container).each(function() {
      var container_width;
      container_width = $(this).find('li').size() * parseInt($(this).find('li').css('width').replace('px', ''));
      $(this).css('width', "" + container_width + "px");
      $(this).find("li:first").addClass("first");
      $(this).find("li:last").addClass("last");
      return $(this).parents('.slides_frame').find('.slides_previous').addClass('hide');
    });
  };
  moveSlide = function(slide_button) {
    var item_width, left_indent, project_slide;
    project_slide = slide_button.parents('.slides_frame');
    item_width = parseInt(project_slide.find('li').css('width').replace('px', ''));
    resetSlideButtons(project_slide);
    left_indent = 0;
    if (slide_button.hasClass('slides_previous')) {
      return moveSlidePrevious(item_width, project_slide, slide_button);
    } else if (slide_button.hasClass('slides_next')) {
      return moveSlideNext(item_width, project_slide, slide_button);
    }
  };
  moveSlidePrevious = function(item_width, project_slide, slide_button) {
    var left_indent, project_slide_container;
    project_slide_container = project_slide.find('.slides_container');
    left_indent = parseInt(project_slide_container.css("left")) + item_width;
    if (left_indent === 0) {
      slide_button.addClass('hide');
    } else {
      slide_button.removeClass('hide');
    }
    return project_slide_container.animate({
      left: left_indent
    }, 200);
  };
  moveSlideNext = function(item_width, project_slide, slide_button) {
    var left_indent, max_width, project_slide_container;
    project_slide_container = project_slide.find('.slides_container');
    left_indent = parseInt(project_slide_container.css("left")) - item_width;
    project_slide_container.animate({
      left: left_indent
    }, 200);
    max_width = parseInt(project_slide_container.css('width').replace('px', '')) - item_width;
    if (left_indent === -max_width) {
      return slide_button.addClass('hide');
    }
  };
  resetSlideButtons = function(button_container) {
    button_container.find('.slides_previous').removeClass('hide');
    return button_container.find('.slides_next').removeClass('hide');
  };
}).call(this);
