$(function () {
  function buildHTML(data) {
    var image
      data.image.url == null ? image = "" : image = `<img src="${data.image.url}">`
    var html = `<div class="message">
            <div class="message__upper-info">
            <div class="message__upper-info__talker">
            ${data.user_name}
            </div>
              <div class="message__upper-info__date">
              ${data.created_at}
              </div>
              </div>
              <div class="message">
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
});