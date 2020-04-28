<?php
  require_once("Models/Model.php");
  require_once("Models/EVACModel.php");
  //require_once("Controllers/SwitchController.php");
  require_once("Controllers/EVACController.php");
  $EVACCtrl = EVACController::getInstance();
	$EVACCtrl->showVue();
 ?>
