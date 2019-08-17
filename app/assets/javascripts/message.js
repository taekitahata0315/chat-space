$(document).on('turbolinks:load', function(){

$(function () {
  function buildHTML(data) {
    var image = data.image.url ? `<img src="${data.image.url}">` : "";
    var html = `<div class="message" data-message-id= "${data.id}">
            <div class="message__upper-info">
            <div class="message__upper-info__talker">
            ${data.user_name}
            </div>
              <div class="message__upper-info__date">
              ${data.created_at}
              </div>
              </div>
              <div class="message-list">
              <p class="message__text">
                ${data.content}</p>
                ${image}
              </div>`
              
      return html;
}


  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this). attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.submit-btn').attr('disabled',false);
    })
    .fail(function(){
      alert('error');
    })
  })
  var reloadMessages = function () {
    if(location.pathname.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $(".message:last").data('message-id');
      var group_id = $(".main-header__left-box__current-group").data("group-id");
      console.log(last_message_id);
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {last_id: last_message_id}
    })
    .done(function (messages) {
      var insertHTML ='';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
    });
  })
    .fail(function () {
      // alert('自動更新に失敗しました');
      console.log('error');
    });
  }
};
setInterval(reloadMessages, 5000);
  });
});