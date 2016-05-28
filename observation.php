<?php
$region = $_GET['region'];
$index = $_GET['index'];
?>


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
		<!--<li class="active"><a href="observation.php">Add observation</a></li> -->
		<li><a href="descriptions.php">Knowledge Base</a></li>
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
  <div class="text-center">
    <h2>Add Your own observation</h2>
	<p>report dangerous situations, such as occurence of one of dangerous insects, reptiles or plants.<br> 
	Each "+1" will be verified and then stored and viewed on our site.</p><br></div>
	  <form action="form.php" method="post">
Picked region: <br><input type="text" name="Region" value='<?php echo $region; ?>' readonly><br>
Picked Danger Index: <br><input type="text" name="Index" value='<?php echo $index; ?>' readonly><br>
Your name:<font color="red">*</font><br><input type="text" name="Name" value="" maxlength="30" required><br>
Year in which the event occured:<font color="red">*</font><br><select name="occurYear" value="" required>
	<option value="2016">2016</option>
	<option value="2015">2015</option>
	<option value="2014">2014</option>
	<option value="2013">2013</option>
	<option value="2012">2012</option>
	<option value="2011">2011</option>
	<option value="2010">2010</option>
	<option value="2009">2009</option>
	<option value="2008">2008</option>
	<option value="2007">2007</option>
	<option value="2006">2006</option>
	<option value="2005">2005</option>
	<option value="2004">2004</option>
	<option value="2003">2003</option>
	<option value="2002">2002</option>
	<option value="2001">2001</option>
	<option value="2000">2000</option>
	<option value="1999">1999</option>
	<option value="1998">1998</option>
	<option value="1997">1997</option>
	<option value="1996">1996</option>
	<option value="1995">1995</option>
	<option value="1994">1994</option>
	<option value="1993">1993</option>
	<option value="1992">1992</option>
	<option value="1991">1991</option>
	<option value="1990">1990</option>
	<option value="1989">1989</option>
	<option value="1988">1988</option>
	<option value="1987">1987</option>
	<option value="1986">1986</option>
	<option value="1985">1985</option>
	<option value="1984">1984</option>
	<option value="1983">1983</option>
	<option value="1982">1982</option>
	<option value="1981">1981</option>
	<option value="1980">1980</option>
	<option value="1979">1979</option>
	<option value="1978">1978</option>
	<option value="1977">1977</option>
	<option value="1976">1976</option>
	<option value="1975">1975</option>
	<option value="1974">1974</option>
	<option value="1973">1973</option>
	<option value="1972">1972</option>
	<option value="1971">1971</option>
	<option value="1970">1970</option>
	</select>
	<br>	<br>
<font color="red">* required fields</font><br>
<input type="submit" value="submit +1"><br><br>
<div class="text-center">
<br><h2><a href="index.html" style="text-decoration:none; color: #28004d"><span style="color: #e60000">Back to map</span></h2></div></div>

</form>
</div>
</div>
</div>

</body>
</html>
