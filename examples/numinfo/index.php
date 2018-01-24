<?php

function is_prime($n)
{
	for ($x = 2; $x < $n; $x++)
		if ($n % $x == 0)
			return false;
	return true;
}

function factorize($n)
{
	$factors = array();
	while (!is_prime($n))
	{
		for ($x = 2; $x < $n; $x++)
		{
			if ($n % $x == 0) {
				array_push($factors, $x);
				$n /= $x;
				$x -= 1;
			}
		}
	}
	array_push($factors, $n);
	return $factors;
}

$num = intval($_GET['integer']);

if ($num % 2)
	$resp->even = false;
else
	$resp->even = true;

$resp->prime = is_prime($num);
$resp->factors = factorize($num);

echo header('Content-Type: application/json');
echo json_encode($resp);
?>
