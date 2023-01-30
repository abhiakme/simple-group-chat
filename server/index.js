const express=require("express");
const app=express();
const port=3000;
const path=require("path");

const http=require("http").Server(app);
var io=require("socket.io")(http);

const mainpath=path.join(__dirname,"../");
app.use(express.static(mainpath));



app.get("/",(req,res)=>{
    res.sendFile(mainpath + "/index.html");
})

const activeusers={};
const msg={};

io.on("connection",(socket)=>{
    socket.on("new_user_joined",(username)=>{
        console.log("new user :",username);
        activeusers[socket.id]=username;
        socket.broadcast.emit("user-joined",username)

        socket.on("disconnect",()=>{
        console.log("user left :",username);
        socket.broadcast.emit("user-left",username);
           
        });
    })
    socket.on("send",(message)=>{
        console.log(message);
        socket.broadcast.emit("recieve",{
            username:activeusers[socket.id],
            message:message
        })
    });
        
})

http.listen(port,()=>{
    console.log("lisning");
})