<!DOCTYPE html>
<html lang="en">
<head>
  <title>INSECT ALERT</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css">
  <link rel="shortcut icon" href="http://test14100.futurehost.pl/images/favicon.ico" type="image/x-icon"/>

  <link rel="stylesheet" href="css/leaflet.css" />
  <link rel="stylesheet" href="css/style.css"/>
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</head>
<body>

<nav class="navbar navbar-default">

    <div class="navbar-header">
      <a class="navbar-left" rel="home" href="index.html" title="logo">
        <img style="max-width:105px; padding-top: 5px; position:relative;"src="images/logo6.png"></a>
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <!-- <a class="navbar-brand" href="#">Insect Alert</a> -->
    </div>

    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="index.html">Project</a></li>
		<!--<li><a href="observation.php">Add observation</a></li>-->
		<li class="active"><a href="descriptions.php">Knowledge Base</a></li>
		<li><a href="howtouse.html">How to use</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="status.html">Status</a></li>

      </ul>
      <!-- <ul class="nav navbar-nav navbar-right">
        <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul> -->
    </div>
</nav>

<!--<nobr></nobr>-->

<div class="container">
  <div class="row">
    <div class="col-md-12"></div>
    <div class="descriptions">

	<h1>Descriptions for available Danger Indexes</h1>

	<p><?php

$directory = "descriptions/";
$phpfiles = glob($directory . "*.html");

foreach($phpfiles as $phpfile)
{
$indexName = preg_replace('/(?<!\ )[A-Z]/', ' $0', $phpfile);
echo "<nav class=\"cl_effect_14\"><a class=\"base\" href=$phpfile>".basename($indexName, ".html")."</a></nav><br>";
}


?></p>

    <br><h2><a href="index.html" style="text-decoration:none; color: #28004d"><span style="color: #e60000">Back to map</span></h2></div>
</div>
</div>

</body>
</html>
