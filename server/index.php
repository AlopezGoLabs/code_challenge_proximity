<?php

$keyword = $_GET['keyword'] ?? '';

function searchInJson($keyword)
{
  if (file_exists("../data/keyword.json")) {
    $json = file_get_contents('../data/keyword.json');
    if (trim($json)) {
      $data = json_decode($json, true);
      if ($keyword == "") return json_encode($data);
      $results = array_filter($data, function ($item) use ($keyword) {
        $values = array_values($item);
        return (strpos(join(" ", $values), $keyword) !== false);
      });
      return json_encode(array_values($results));
    }
    return throwError('No data retrieved from file');
  }
  return throwError('File not found');
}

function throwError($mssg)
{
  return json_encode(array('error' => $mssg));
}

echo searchInJson($keyword);
