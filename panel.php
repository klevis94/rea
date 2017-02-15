<?php
    if(isset($_COOKIE['LoggedIn'])){
    }else {
        header("Location:index.html");
    }
?>
<head>
    <link rel='stylesheet' type='text/css' href='css/main.css' />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
    <script type="text/javascript" src="cryptojs/rollups/md5.js"></script>
    <script type="text/javascript" src="cryptojs/components/enc-base64.js"></script>
    <script src="js/functions.js"></script>
     <script src="js/main.js"></script>
</head>
<div class="popup"></div>
<div class='menu'>
    <i id="collapse-menu-out" class="material-icons"></i>
    <i id="collapse-menu-in" class="material-icons"></i>
    <div class='menu-logo'>
        <img src=img/4-fitness-logo-design.gif />
    </div>
    <span><a href="logout.php" id="logout">Logout</a> </span>
</div>

<div class='sidebar'>
    <ul id ="usermenu">

    </ul>
</div>
<div class='dashboard'>

</div>
<div class='userresponse'></div>