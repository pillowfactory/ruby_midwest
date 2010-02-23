$(function() {
  $('.speaker').each(function(i) {
    var index = $(this).index(this);
    $(this).attr('id', 'speaker_' + i).hide();
  });

  $('.speaker .mugshot').each(function() {
    var speakerLink = $(this).parent().attr('id');
    var speakerName = $(this).siblings('.desc').children('.name').text();
    $(this).appendTo('#speakers #image_list').wrap('<a href="#' + speakerLink + '" class="speakerLink"></a>').parent('a').attr('name', speakerName);
  });

  $('.speakerLink').click(function() {
    var target = $(this).attr('href');
    $('.speakerLink').removeClass('active');
    $(this).addClass('active');
    $('#speakers .content .loader').html($(target).html());
    return false;
  });

  $('.speakerLink').hover(
    function () {
      var name = $(this).attr('name');
      $(this).prepend($('<span class="tip">' + name + '</span>'));
    }, 
    function () {
      $(this).find("span:last").remove();
    }
  );

});