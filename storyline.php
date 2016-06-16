<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	$db = new PDO("mysql:host=keycynthia-timeline.cupo2yigmrng.us-east-1.rds.amazonaws.com;dbname=keycynthia;charset=utf8mb4", "kuangyou", "461298cowboy");
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$query ="SELECT date, story, type
			 FROM timeline
			 ORDER BY date ASC;";

	$rows = $db->query($query);
	$json = array();

	foreach($rows as $row) {
		$json[] = array('date' => $row['date'], 'story' => $row['story'], 'type' => $row['type']);
	}

	header('Content-Type: application/json');
	print json_encode($json, JSON_UNESCAPED_UNICODE);
?>
