$(function(){


  $('.video-toggle-item-a').click(function() {
    $('.video-toggle-item-a').removeClass('video-toggle-item-a-active');
    $(this).addClass('video-toggle-item-a-active');
    if (this.innerHTML === '寺庙相关'){
      $('.video-about').show();
      $('.video-temple').hide();
    } else {
      $('.video-about').hide();
      $('.video-temple').show();
    }
  });

});
