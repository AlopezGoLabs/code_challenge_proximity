<?php

$keyword = $_POST['keyword'];

if (isset($keyword)) {
  echo searchInJson($keyword);
}

function searchInJson($keyword)
{
  if (file_exists("../data/keyword.json")) {
    $json = file_get_contents('../data/keyword.json');
    $results = array();
    if (trim($json)) {
      $data = json_decode($json, true);
      foreach ($data as $value) {
        $keys = array_keys($value);
        foreach ($keys as $key) {
          if ($value[$key] === $keyword) {
            array_push($results, $value);
          }
        }
      }
      return json_encode($results);
    }
    return throwError('No data retrieved from file');
  }
  return throwError('File not found');
}

function throwError($mssg)
{
  return json_encode(array('error' => $mssg));
}
