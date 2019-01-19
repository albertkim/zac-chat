var apiUrl = 'https://zac-chat.herokuapp.com'

var chats = []

function getChats() {
  fetch(apiUrl + '/chats')
    .then((response) => response.json())
    .then((networkChats) => {
      chats = networkChats
      console.log(chats)
      render()
     //window.scrollTo(0,document.body.scrollHeight)
    })
}

function postChat(chat) {
  fetch(apiUrl + '/chat', {
    method: 'POST',
    body: JSON.stringify(chat),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  }).then(() => {
    getChats()
  })
}

function render() {
  console.log('render')
  $("#chats").empty()
  for (var asdf of chats) {
      
      // var chatElement = $("<div class='alert alert-primary'></div>")
      var chatElement = $("<div class='" + asdf.box + "'></div>")
    

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

      $("#chats").append(chatElement)
  }
}

$(document).ready(function(){

  getChats()

  setInterval(() => getChats(), 1000)

  $("#chat-button").click(function() {

      if ($("#name-input").val().length < 1 ){
          return alert(" Your username must be at least 1 character long!")
      }

      // Insert into chats array
      var newChat = {
          username: $("#name-input").val(),
          message: $("#input").val(),
          timestamp: new Date(),
          face: $("#Icon").val(),
          box: $("#Colour").val()
      }
      postChat(newChat)
      $("#name-input").prop('disabled', true)
      $("#Icon").prop('disabled', true)
      $("#Colour").prop('disabled', true)
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
