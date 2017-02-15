<?php
include 'global.php';
header('Content-Type: application/json');

if(isset($_POST['method'])&& isset($_COOKIE['LoggedIn'])) {

$method = $_POST['method'];
$response = array();
    
    
    if ($method == "addClient"){
        
        $clientName = $_POST['client'];
        $plan = $_POST['plan'];
        $date = date("Y-m-d");
        $expire = date('Y-m-d', strtotime("+".$plan."months", strtotime($date)));
        
        
           $query = mysqli_query($conn,"INSERT INTO clients (username, timeRegistered, expireIn,plan)
VALUES ('$clientName', '$date', '$expire','$plan')");
        
        if($query){
            $response['response'] = "Success";
            $response['message'] = "Client added";
            echo json_encode($response);
        }else{
            $response['response'] = "Error";
            $response['message'] = "Status is not 200";
            echo json_encode($response);
        }
    }else if ($method == "retrieveClients"){
        
        $query  = mysqli_query($conn, "SELECT * FROM clients ORDER BY expireIn DESC");
        $clients = array();
        while($row = mysqli_fetch_assoc($query)){
            $clients[] = array(
            'clientId'=>$row['clientId'],
            'username'=>$row['username'],
            'registered'=>$row['timeRegistered'],
            'expire'=>$row['expireIn'],
            'plan'=>$row['plan']    
            );
        }
        $response['response'] = "Success";
        $response['clients'] = $clients;
        echo json_encode($response);
    }else if($method =='edit_client'){
        $client_id = $_POST['client_id'];
        $client_name = $_POST['client_name'];
        $client_expire = $_POST['client_expire'];
        $query = mysqli_query($conn,"UPDATE clients SET username = '$client_name',expireIn='$client_expire' WHERE clientId = '$client_id'");
        if($query){
            $response['response'] = "Success";
            $response['message'] = "Client Updated";
            echo json_encode($response);
        }
    }else if($method =='delete_client'){
        $client_id = $_POST['client_id'];
        $query = mysqli_query($conn,"DELETE FROM clients WHERE clientId = '$client_id'");
        $response['response'] = "Success";
        $response['message'] = "Client Deleted";
        echo json_encode($response);
    }else if($method == 'add_user'){
        $username = $_POST['username'];
        $password = $_POST['password'];
        $passhash = password_hash($password,PASSWORD_DEFAULT);
        $queryc = mysqli_query($conn,"SELECT id FROM users where username = '$username'");
        if(mysqli_num_rows($queryc)!=0){
            $response['response'] = "Error";
            $response['message'] = "User already exist";
        }else {
            $query = mysqli_query($conn,"INSERT INTO users (username,password,type) VALUES('$username','$passhash','c')");
            $response['response'] = "Success";
            $response['message'] = "User Added";

        }

     echo json_encode($response);
    }
    
    
    
    
    
    
    

}else{
    header("Location:/index.html");
}
?>