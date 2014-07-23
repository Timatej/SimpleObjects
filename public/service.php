<?php
require_once "../lib/so/SimpleObjects.php";

$so = new \SimpleObjects\SimpleObjects();

spl_autoload_register(function($className){
    $items = explode('\\', $className);
    if ($items[0] != 'SimpleObjects') return;
    unset($items[0]);
    $filePath = realpath(__DIR__ . '/../lib');
    foreach($items as $item) {
        if ($item == 'Modules') $item = 'so/modules';
        $filePath .= '/' . $item;
    }
    $filePath .= '.php';
    if (is_file($filePath)) {
        require_once $filePath;
    } else {
        throw new Exception('SimpleObjects module not found: ' . $className);
    }

});



$controller = new \SimpleObjects\Modules\SimpleControllers($so, '/api/');


$list = $controller->run();
$so->echoJSON($list);