<?php

    // CORS
    header("Access-Control-Allow-Origin: *");

	$response = '';

    $records = json_decode(file_get_contents('./records.json'), true);

    if(!empty($_POST) && !empty($_POST['name']) && !empty($_POST['score'])) {

        $candidate = ["name" => $_POST['name'], "score" => (int)$_POST['score']];

        for($i = 1, $l = count($records) + 2; $i < $l; $i++) {
            if((int)$records[$i]['score'] < $candidate['score']) {
                $temp = $records[$i];
                $records[$i] = $candidate;
                $candidate = $temp;
            }
        }

        file_put_contents('./records.json', json_encode($records));
    }

    for($i = 1; $i < 6; $i++) {
        $response .= "<tr><td>" . $i . "</td><td>" . $records[$i]['name'] . "</td><td>" . $records[$i]['score'] . "</td></tr>";
    }
	echo $response;
