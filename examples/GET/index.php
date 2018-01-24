<?php

if ($_GET["type"] == "json") {
	header("Content-Type: application/json");
	$resp->info = "Your GET-request contained the following query-parameters";
	$resp->query_parameters = $_GET;
	echo json_encode($resp);
	exit();
}

?>
<html>
	<body>
		<p>Du utförde en GET-förfrågan med följande query-parametrar:</p>
		<p><table border="1">
			<tr style="font-weight: bold"><td>Nyckel</td><td>Värde</td></tr>
<?php
foreach ($_GET as $key => $value)
	echo "\t\t\t<tr><td>$key</td><td>$value</td></tr>";
?>
		</table></p>
	</body>
</html>
