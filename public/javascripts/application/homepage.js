var $chatRoomMessageList, $messageInput, $sendMessage;

$(document).ready(function () {
  $chatRoomMessageList = $('#chatRoomMessageList');
  $messageInput = $('#messageInput');
  $sendMessage = $('#sendMessage');

  var pusher = new Pusher('3a3c2397786ded7d42aa', {
    encrypted: true
  });

  var channel = pusher.subscribe('chat_room');
  channel.bind('chat_message', function (data) {
    var messageHTML = '<li class="media list-group-item">' +
      '<a class="media-left" href="#">' +
      '<img class="media-object img-circle" src="' + data.image + '">' +
      '</a>' +
      '<div class="media-body">' +
      '<div class="media-body-text">' +
      '<div class="media-heading">' +
      '<small class="pull-right text-muted">' + moment(data.at).fromNow(Boolean) + '</small>' +
      '<h5>' + data.name + '</h5>' +
      '</div>' +
      '<p>' +
      data.message +
      '</p>' +
      '</div>' +
      '</div>' +
      '</li>';

    $chatRoomMessageList.append(messageHTML);
  });

  $sendMessage.click(function () {
    $.post("/messages", {room: "chat_room", body: $messageInput.val()})
      .done(function () {
        $messageInput.val('');
      });
  })
});

$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});