<?php

    // CORS
    header("Access-Control-Allow-Origin: *");

	$response = '';

    $records = json_decode(file_get_contents('./records.json'), true);

    if(!empty($_POST) && !empty($_POST['name']) && !empty($_POST['score'])) {

        $candidate = ["name" => $_POST['name'], "score" => (int)$_POST['score']];

        end($records);
        $records[key($records) + 1] = ["name" => '', "score" => 0];

        for($i = 1, $l = count($records); $i < $l + 1; $i++) {
            if((int)$records[$i]['score'] < $candidate['score']) {
                $temp = $records[$i];
                $records[$i] = $candidate;
                $candidate = $temp;
            }
        }

        file_put_contents('./records.json', json_encode($records));
    }

    if(!empty($_GET) && !empty($_GET['searchText'])) {
        $names = [];

        foreach($records as $record) {
            if((false !== strripos($record['name'], $_GET['searchText'])) && (!in_array($record['name'], $names))) {
                $names[] = $record['name'];
            }
        }

        echo json_encode($names);
        die();
    }

    if(!empty($_GET) && !empty($_GET['getRecordsFor'])) {
        foreach($records as $key => $record) {
            if($record['name'] == $_GET['getRecordsFor']) {
                $response .= "<tr><td>" . $key . "</td><td>" . $record['name'] . "</td><td>" . $record['score'] . "</td></tr>";
            }
        }

        echo $response;
        die();
    }

    for($i = 1; $i < 8; $i++) {
        $response .= "<tr><td>" . $i . "</td><td>" . $records[$i]['name'] . "</td><td>" . $records[$i]['score'] . "</td></tr>";
    }
	echo $response;
