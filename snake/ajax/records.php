<?php
	$response = '';

    $records = json_decode(file_get_contents('./records.json'), true);

    if(!empty($_POST) && !empty($_POST['name']) && !empty($_POST['score'])) {

        $candidate = ["name" => $_POST['name'], "score" => (int)$_POST['score']];

        for($i = 1; $i < 6; $i++) {
            if((int)$records[$i]['score'] < $candidate['score']) {
                $temp = $records[$i];
                $records[$i] = $candidate;
                $candidate = $temp;
            }
        }

        file_put_contents('./records.json', json_encode($records));
    }

    if(!empty($_POST) && isset($_POST['min'])) {
        echo $records['5']['score'];
        die();
    }

    $i = 0;
    foreach($records as $record) {
        $response .= "<tr><td>" . ++$i . "</td><td>" . $record['name'] . "</td><td>" . $record['score'] . "</td></tr>";
    }

	echo $response;
?>