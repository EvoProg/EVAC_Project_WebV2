<?php
  require_once("Contents/DATA/Data.php");
  echo "<fieldset id=\"Vehicule\">";
  echo "<legend>Vehicules</legend>";
  for($i = 0; $i < $NbrAmbulance; $i++){
    echo "<img id=\"Ambulance$i\" src=\"Contents/Pictures/Ambulance.png\" class=\"Ambulance\">";
  }

  for($i = 0; $i < $NbrHelicoptere; $i++){
    echo "<img id=\"Helicoptere$i\" src=\"Contents/Pictures/Helicoptere.png\" class=\"Helicoptere\">";
  }
  echo "</fieldset>";
 ?>
