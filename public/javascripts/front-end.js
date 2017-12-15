$("#testingbutton").click(function(){
    var socket = io('http://localhost:8080');
    var username = $("#testingtext").val();
    console.log(username);
    socket.emit('login',{userN:username});
    socket.on('confirm',function(data){
        window.location.href = '/auth/google';
    }); 
});