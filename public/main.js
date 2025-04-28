const socket = io();

const clientTotal = document.getElementById('client-total')
const messageContainer = document.getElementById('message-container')
const nameInput  = document.getElementById('name-input')
const messageForm =document.getElementById('message-form')
const messageInput = document.getElementById('message-input')



messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    sendMessage()
})
socket.on('client-total',(data)=>{
    clientTotal.innerText = `Total Clients Connected: ${data}` 
})


function sendMessage(){
    console.log(messageInput.value)
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data)
}

socket.on('chat-message',(data)=>{
    console.log(data)
})


function addMessageToUI(isOwnMessage,data){
   const element = `
    <li class="${isOwnMessage ? "" : " "}>
          <p class="message">
            lorem impsun
            <span>bluebird ● 26 July 10:40</span>
          </p>
        </li>` 
}