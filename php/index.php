<?php
    include './classes/functions.class.php';
    include './classes/route.class.php';

$route = new Route($_SERVER['REQUEST_URI']);
$route->vizsgalat();

?>