<?php

$command = escapeshellcmd('/var/www/html/sakerhetsdosa/emulator.py ' . $_GET['challenge'] . ' ' . $_GET['account']);
$output = shell_exec($command);
echo $output;

?>
