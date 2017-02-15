<?php
if (isset($_COOKIE['LoggedIn'])) {
    unset($_COOKIE['LoggedIn']);
    setcookie('LoggedIn', '', time() - 3600, '/'); // empty value and old timestamp

}
header("Location:index.html");