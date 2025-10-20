<?php
    $pathAfterDomain = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    
    header("Refresh:0; url=http://localhost:8080" . $pathAfterDomain);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>Lefty.dev</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            height: 100%;
        }

        body {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
  </head>
  <body>
    <!-- WordPress Theme Home Page -->
    <!-- Redirects to Vue 3 App -->
  </body>
</html>