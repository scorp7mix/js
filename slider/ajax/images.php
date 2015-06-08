<?php
    $images = json_decode(file_get_contents('./images.json'), true);
    ksort($images);

    reset($images);
    $min = (int)key($images);
    end($images);
    $max = (int)key($images);

    if(empty($_POST)) {
        echo reset($images) . ' ' . key($images);
        die();
    }

    if(!empty($_POST) && !empty($_POST['id']) && !empty($_POST['direction'])) {

        $images[$_POST['id']];

        reset($images);
        $found = false;
        while(current($images)) {
            if((int)key($images) == (int)$_POST['id']) { $found = true; break; }
            next($images);
        }
        if(!$found) reset($images);

        if($_POST['direction'] == 'prev'){
            echo (int)key($images) == $min ? end($images) . ' ' . key($images) : prev($images) . ' ' . key($images);
        }
        if($_POST['direction'] == 'next'){
            echo (int)key($images) == $max ? reset($images) . ' ' . key($images) : next($images) . ' ' . key($images);
        }
        die();
    }
?>