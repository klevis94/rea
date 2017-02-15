<?php
error_reporting(0);
$serverName = "localhost";
    $username = "root";
    $password = "";
    $databaseName = "klevi";
    
    $conn = mysqli_connect($serverName, $username, $password,$databaseName);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}else {
 
}

?>