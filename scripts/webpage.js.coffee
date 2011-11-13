$(document).ready ->
  #--------------------------------------
  # Slides
  #-------------------------------------

  # intialize the slide containers
  intializeSlides(".slides_container")

  $(".slides_previous").click ->
    moveSlide($(this))
    false

  $(".slides_next").click ->
    moveSlide($(this))
    false

#--------------------------------------
#       Slides
#-------------------------------------

# intialize the slide width based on the number of slides x the width of the slides
# also hiding the previous button (showing slide #1 by default)
intializeSlides= (slide_container) ->
  $(slide_container).each ->
    container_width = $(this).find('li').size() * parseInt($(this).find('li').css('width').replace('px', ''))
    $(this).css('width', "#{container_width}px" )
    $(this).find("li:first").addClass("first")
    $(this).find("li:last").addClass("last")
    $(this).parents('.slides_frame').find('.slides_previous').addClass('hide')


# moves a slide left or right dep
moveSlide = (slide_button) ->
  project_slide = slide_button.parents('.slides_frame')
  item_width = parseInt(project_slide.find('li').css('width').replace('px', ''))
  resetSlideButtons(project_slide)
  # depending on the class of the button animate left or right (add or remove width from the indent)
  left_indent = 0

  if (slide_button.hasClass('slides_previous'))
    moveSlidePrevious(item_width, project_slide, slide_button)

  else if (slide_button.hasClass('slides_next'))
    moveSlideNext(item_width, project_slide, slide_button)


# move slide left
moveSlidePrevious = (item_width, project_slide, slide_button) ->
  project_slide_container = project_slide.find('.slides_container')
  left_indent = parseInt(project_slide_container.css("left")) + item_width

  if (left_indent == 0)
    slide_button.addClass('hide')
  else
    slide_button.removeClass('hide')
  project_slide_container.animate left: left_indent, 200
  # if you hit the "first" element remove the project_slides_previous buttons


# move slide right
moveSlideNext = (item_width, project_slide, slide_button) ->
  project_slide_container = project_slide.find('.slides_container')
  left_indent = parseInt(project_slide_container.css("left")) - item_width
  project_slide_container.animate left: left_indent, 200
  max_width = parseInt(project_slide_container.css('width').replace('px', '')) - item_width
  if (left_indent == -(max_width))
    slide_button.addClass('hide')


# show button container controls (reset hide)
resetSlideButtons = (button_container) ->
  button_container.find('.slides_previous').removeClass('hide')
  button_container.find('.slides_next').removeClass('hide')
