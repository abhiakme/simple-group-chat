const socket=io();
const form=document.getElementById('sendcont');
const messageInput=document.getElementById('send_msg');
const messageContainer=document.getElementById('messagebox');

const append=(message,position)=>{
    const messageElement=document.createElement("div");
    messageElement.innerText=message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
}

const username=prompt("Enter your username");
socket.emit("new_user_joined",username);

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const message=messageInput.value;
    append(`You : ${message}`,"right");
    socket.emit('send',message);
    messageInput.value="";
})

socket.on("user-joined",(username)=>{
    append(` ${username} user joined the group 👋`,"center");
});
socket.on("user-left",(username)=>{
    append(` ${username} user left the group 🙋‍♂️`,"center");
});
socket.on("recieve",(data)=>{
    append(`${data.username}  : ${data.message}`,"left");
});
