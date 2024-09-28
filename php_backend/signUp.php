<?php

$mobile = $_POST["mobile"];
$name = $_POST["name"];
$password = $_POST["password"];
// 

if(empty($_FILES["profile_picture"]["tmp_name"])) {
    echo ("Please Select Profile Photo");
} else if (empty($name)) {
    echo ("Please Enter Name");
} else if (empty($mobile)) {
    echo ("Please Enter Mobile Number");
} else if(strlen($mobile) != 10) {
    echo ("Mobile must have 10 characters");
} else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$mobile)) {
    echo ("Invalid Mobile Number");
} else if (empty($password)) {
    echo ("Please Enter Password");
} else if(strlen($password) < 5 || strlen($password) > 20) {
    echo ("Password must be between 5 - 20 characters");
} else {

    $profile_picture_location = $_FILES["profile_picture"]["tmp_name"];

    $connection = new mysqli("localhost","root","SEngineer,531","chatpilot");

$connection->query("INSERT INTO `user` (`mobile`,`name`,`password`,`profile_url`) VALUES ('".$mobile."','".$name."','".$password."','"."uploads/".$mobile.".png"."')");

move_uploaded_file($profile_picture_location,"uploads/".$mobile.".png");

echo("Uploaded");

}
