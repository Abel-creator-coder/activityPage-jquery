$(function(){
  $('.filter-status li').click(function() {
    if (this.className.indexOf('filter-status-active') > -1 ) return;
    $('.filter-status li').removeClass('filter-status-active');
    $(this).addClass('filter-status-active');
    var action = $(this).attr('key');
    switch (action) {
      case 'all':
        console.log('all');
        break;
      case 'new':
        console.log('new');
        break;
      case 'past':
        console.log('past');
        break;
      case 'review':
        console.log('review');
        break;
      default:
    }
  });
});
