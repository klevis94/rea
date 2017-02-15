$(document).ready(function(){
    var logindata = localStorage.getItem("loginData");
    var data = JSON.parse(logindata);
    if (logindata == null){

    }else {
        var type = data.type;
        console.log(type);
        if(type == 's'){
            $("#usermenu").append('<li id="users"><i class="material-icons">&#xE88A;</i> Clients</li> ');
        }else if(type == 'c'){
            $("#usermenu").append('<li class="active" id="clients"><i class="material-icons">&#xE88A;</i> Clients</li> <li id="addClient"><i class="material-icons">&#xE88A;</i> Add Client</li> <li id="cc"><i class="material-icons">&#xE88A;</i> About Us</li>');
        }
    }
    if(type =='s'){
        $(".dashboard").load("users.php",function(){
           addUser();
        });
    }else {
        $(".dashboard").load("clients.php",function(){
            retrieveClients();
        });
    }

    
    $('#collapse-menu-out').click(function(){
        $(this).hide();
        $('#collapse-menu-in').show();
        $('.sidebar').css({'margin-left':'-180px'});
        $('.dashboard').css({'padding-left':'20px', 'width':'97%'})
    })
     $('#collapse-menu-in').click(function(){
        $(this).hide();
        $('#collapse-menu-out').show();
        $('.sidebar').css({'margin-left':'0'});
        $('.dashboard').css({'padding-left':'205px', 'width':'83%'})
    });
    entertoLogin();
      $('#loginButton').click(function(){
         var username = $('#email').val();
         var password = $('#pw').val();
         var md5Password = CryptoJS.MD5(password);
         var hashPassword = md5Password.toString();

            var data = {username: username,password: hashPassword};
          console.log(data);
            $.post("api/login.php", data).done(function (response) {

              
                if(response.response == "Success"){
                    window.location.assign("panel.php");
                    localStorage.setItem("loginData",JSON.stringify(response.loginData));    
                }else{
                    console.log("Something went wrong");
                     $('.userresponseindex').fadeIn(function () {
                        $(this).html(response.message);
                        });
                         setTimeout(function () {
                             $('.userresponseindex').fadeOut(function () {
                                 $(this).hide();
                             });
                         }, 2000)
                }
                
            }); 
    });

    function entertoLogin() {
        $("#email").keydown(function (e) {
            if (e.keyCode == 13) {
                $("#loginSubmit").trigger('click');
            }
        });
        $("#pw").keydown(function (e) {
            if (e.keyCode == 13) {
                $("#loginButton").trigger('click');
            }
        });
    }
    $('#clients').click(function(){
        if (!$('#clients').hasClass('active')) {
            $('#clients').addClass('active');
            $('#clients').siblings().removeClass('active');
        }
       $('.dashboard').load('clients.php',function () {
            retrieveClients(); 
       });
         
     }); 
     $('#addClient').click(function(){
         if (!$('#addClient').hasClass('active')) {
             $('#addClient').addClass('active');
             $('#addClient').siblings().removeClass('active');
         }
               $('.dashboard').load('addClient.php',function () {
                   addClient();
               });
         
     });
     $('#cc').click(function(){
         if (!$('#cc').hasClass('active')) {
             $('#cc').addClass('active');
             $('#cc').siblings().removeClass('active');
         }
               $('.dashboard').load('about.php',function () {

               });

     });
    $('#users').click(function(){
        console.log("clicked");
        $('.dashboard').load('users.php',function () {
            addUser();
        });

    });

      
     

      
      
      
})


