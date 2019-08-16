$(document).on('turbolinks:load',function(){

var user_list = $("#user-search-result");


function appendUser(user) {
  var html =
                `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</div>
                </div>`;
                user_list.append(html);
}

function apppendErrMsgToHTML(msg) {
  var html = 
              `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${ msg }</p>
              </div>`;
              user_list.append(html);
}

function AddChatMembers(userName, userId){

var html =
          `<div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${userId}'>
                <p class='chat-group-user__name'>${userName}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>`
            $(".chat-group-users ").append(html);
}



  $("#user-search-field").on("keyup",function(e){
    var input = $("#user-search-field").val();
  
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
  
    .done(function(users){

      if(input.length === 0){
        $('#user-search-result').empty();
        }

      else if (input.length !== 0){
        $('#user-search-result').empty();
        users.forEach(function(user){
          appendUser(user)
        });
      }
      else{
        $('#user-search-result').empty();
        apppendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');

  });
});

$(document).on("click", ".chat-group-user__btn--add", function () {
  $(this).parent().remove();
  var userName = $(this).data('userName');
  var userId =$(this).data('userId');
  AddChatMembers(userName, userId);
});

$(document).on('click',".chat-group-user__btn--remove", function() {
  $(this).parent().remove();
  })
});

