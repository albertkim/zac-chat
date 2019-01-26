var apiUrl = 'https://zac-chat.herokuapp.com'

var chats = []

// var myWidget = cloudinary.createUploadWidget({
//   cloudName: 'plazachat', 
//   uploadPreset: 'qf7dm0fr'
// },
//   (error, result) => {
//     console.log(error, result)
//   })

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

// Create the chat HTML elements
function render() {
  console.log('render')
  $("#chats").empty()
  for (var asdf of chats) {
      
      // var chatElement = $("<div class='alert alert-primary'></div>")
      var chatElement = $(`
        <div class="${asdf.box}">

        </div>
      `)
    
      var leftElement = $(`
        <div style='width: 50px; float: left;'>

        </div>
      `)

      var face = $(`<div></div>`)
      leftElement.append(face)

      chatElement.append(leftElement)
  
      var rightElement = $("<div></div>")

      rightElement.append("<div>" + asdf.username +  "</div>")
      rightElement.append("<div>" + new Date(asdf.timestamp) +  "</div>")
      rightElement.append("<div>" + asdf.subject +  "</div>")
      rightElement.append("<div>" + asdf.message +  "</div>")


      chatElement.append(rightElement)

      $("#chats").append(chatElement)
  }
}

// Run when the website loads up
$(document).ready(function(){

  // Get chats right away
  getChats()

  // Get chats every 10 seconds
  setInterval(() => getChats(), 10000)

  // Upload image
  // $("#image-upload").click(function() {
  //   myWidget.open();

  // })

  // Do something when the chat button is pressed
  $("#chat-button").click(function() {

      // Check name input
      if ($("#name-input").val().length < 1 ){
          return alert(" Your username must be at least 1 character long!")
      }
      // Check message input
      if ($("#input").val().length < 1 ){
            return alert(" Your message must be at least 1 character long!")
      }
      if ($("#subject").val().length < 1 ){
        return alert(" Your subject must be at least 1 character long!")
      }

      // Insert into chats array
      var newChat = {
          username: $("#name-input").val(),
          subject: $("#subject").val(),
          message: $("#input").val(),
          timestamp: new Date(),
          box: $("#Colour").val()
      }

      // Submit chat to server
      postChat(newChat)

      // Disable your buttons
      $("#name-input").prop('disabled', true)
      $("#Colour").prop('disabled', true)

      // Clear message and subject input
      $("#input").val("")
      $("#subject").val("")

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



