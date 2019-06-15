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

function postChat(chat){
  $("#input").height(50)
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
      // if asdf.imageurl value length = > 1 show asdf.imageurl
      // if else hide asdf.imageurl
      var imageElement
      if (asdf.imageurl && asdf.imageurl.length >= 1 && asdf.imageurl.includes("http")) {
        imageElement = `<img src="${asdf.imageurl}" />`
      } else {
        imageElement = `<div />`
      }
      var empty
      if (asdf.username == $("#name-input").val()) {
        empty = "right-chat"
      } else {
        empty = "left-chat"
      }
      console.log(imageElement)
      
      // var chatElement = $("<div class='alert alert-primary'></div>")
      var chatElement = $(`
        <div class="chat-container">
          <div class="${empty} ${asdf.box}">
            <div>${asdf.username}</div>
            <div>${new Date(asdf.timestamp)}</div>
            <div>${asdf.message}</div>
            ${imageElement}
          </div>
        </div>
      `)

      $("#chats").append(chatElement)
  }
}

// Run when the website loads up
$(document).ready(function(){
  
  // Connect to Cloudinary widget
  // If upload is successful, set the image-url input to have that value
	var myWidget = cloudinary.createUploadWidget({
    cloudName: 'plazachat', 
    uploadPreset: 'qf7dm0fr'}, (error, result) => {
      if (result && result.event === 'success') {
        const url = result.info.url
        $("#image-url").val(url)
      }
    })
  
  document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
  }, false);

  // Get chats right away
  getChats()

  // Get chats every 3 seconds
  setInterval(() => getChats(), 2500)

  // Do something when the chat button is pressed
  $("#chat-button").click(function() {

    // Check name input
    if ($("#name-input").val().trim().length < 1 ){
        return alert("Your username must be at least 1 character long!")
    }
  
    // You can't be named admin
    if ($("#name-input").val() == "Admin"){
      return alert("You can not be named Admin!")
    }
    // Check message input
    if ($("#input").val().trim().length < 1 ){
          return alert("Your message must be at least 1 character long!")
    }
    if ($("#image-url").val().length >= 1) {
      if (!$("#image-url").val().includes("http")) {
        return alert("Invalid URL!")
      }
    }

    if ($("#input").val().length > 20000 ){
      return alert("Your message must be less than 20000 characters!")
    }

    // Insert into chats array
    var newChat = {
        avatar: $("#avatar").val(),
        username: $("#name-input").val(),
        subject: $("#subject").val(),
        message: $("#input").val(),
        timestamp: new Date(),
        imageurl: $("#image-url").val(),
        box: $("#Colour").val()
    }

    console.log(newChat)

    // Submit chat to server
    postChat(newChat)

    // Disable your buttons
    $("#name-input").prop('disabled', true)
    $("#Colour").prop('disabled', true)

    // Clear message and subject input
    $("#input").val("")
    $("#subject").val("")
    $("#image-url").val("")
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

// Auto-Grow-TextArea script.
// Script copyright (C) 2011 www.cryer.co.uk.
// Script is free to use provided this copyright header is included.
function AutoGrowTextArea(textField)
{
  if (textField.clientHeight < textField.scrollHeight)
  {
    textField.style.height = textField.scrollHeight + "px";
    if (textField.clientHeight < textField.scrollHeight)
    {
      textField.style.height = 
        (textField.scrollHeight * 2 - textField.clientHeight) + "px";
    }
  }
}
