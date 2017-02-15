<?php
include 'global.php';
header('Content-Type: application/json');

if (isset($_POST['username']) && isset($_POST['password'])){

        $response = array();
        $un = $_POST['username'];
        $pw = $_POST['password'];
    
         $emailcheck = mysqli_query($conn,"SELECT id FROM users WHERE username='$un'");
        if (mysqli_num_rows($emailcheck) != 0) {
        $login_query = mysqli_query($conn,"SELECT password FROM users WHERE username= '$un' AND password NOT LIKE '' ");
        $me_rows = mysqli_num_rows($login_query);
        //Simple Auth of API Call
        if ($me_rows != 0) {
            $serverPass = mysqli_fetch_assoc($login_query);
        
           // echo json_encode($newpass);
            //echo json_encode($serverPass);
            if (password_verify($pw,$serverPass['password'])){
                $passstring = $serverPass['password'];
                $dataQuery = mysqli_query($conn,"SELECT id,username,timeregistered,type FROM users WHERE password='$passstring'");
                $data = mysqli_fetch_assoc($dataQuery);
                
                $loginData = array();
                    $loginData['username'] =$data['username'];
                        $loginData['timeregistered'] = $data['timeregistered'];
                        $loginData['id'] = $data['id'];
                        $loginData['type'] =$data['type'];
                $response["loginData"] = $loginData;
                $response["message"] = "User verified";
                $response["response"] = "Success";
                setcookie("LoggedIn", "true", time() + (86400 * 30), "/");
                echo json_encode($response);
            } else {
                $response["message"] = "Incorrect Password";
                $response["response"] = "Error";
                echo json_encode($response);

            }
        }else{
            $response["message"] = "User doesn't exist";
            $response["response"] = "Error";
             echo json_encode($response);
        }
    }else{
            $response["message"] = "Incorrect Username";
            $response["response"] = "Error";
             echo json_encode($response);
        }
    

}else{
    echo json_encode("jeta funit");
}


?>