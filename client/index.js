var apiUrl = 'https://zac-chat.herokuapp.com'

var chats = [
  {
      username: 'Admin',
      message: 'Welcome to Plaza Chatroom',
      timestamp: new Date(),
      color: '3w45d',
      face: 'fas fa-smile fa-3x'
  }
]

function getChats() {
  fetch(apiUrl + '/chats').then((response) => {
    chats = response.body
    this.render()
  })
}

function postChat(chat) {
  fetch(apiUrl + '/chat', {method: 'POST', body: chat}).then(() => {
    this.getChats()
  })
}

function render() {
  console.log('render')
  $("#chats").empty()
  for (var asdf of chats) {
      
      var chatElement = $("<div></div>")

      var leftElement = $("<div style='width: 50px; float: left;'></div>")
      var face = $("<div></div>")
      face.addClass(asdf.face)
      leftElement.append(face)

      chatElement.append(leftElement)
  
      var rightElement = $("<div></div>")

      rightElement.append("<div>" + asdf.username +  "</div>")
      rightElement.append("<div>" + asdf.timestamp +  "</div>")
      rightElement.append("<div>" + asdf.message +  "</div>")

      chatElement.append(rightElement)

      chatElement.append("<hr />")

      console.log(chatElement)

      $("#chats").append(chatElement)
  }
}

$(document).ready(function(){

  getChats()

  $("#chat-button").click(function() {

      if ($("#name-input").val().length < 3 ){
          return alert(" Your username must be at least 3 characters long!")
      }

      // Insert into chats array
      var newChat = {
          username: $("#name-input").val(),
          message: $("#input").val(),
          timestamp: new Date(),
          face: $("#Icon").val()
      }
      postChat(newChat)
      $("#name-input").prop('disabled', true)
      $("#Icon").prop('disabled', true)
  })

})
function Walloftext(){
  var x = document.getElementById("initial-text");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
