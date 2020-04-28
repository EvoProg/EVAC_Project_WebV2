<?php

	if(isset($_GET['func']) && !empty($_GET['func']))
	{
        $func = $_GET['func'];

		switch ($func)
		{
		case 'getBles':
        GetBlesses();
        break;
		case 'getHopi':
				GetHopitaux();
				break;
		default:
		SendError("Fonction inexistante dans le switch");
        break;
		}
	}

	else if(isset($_POST['func']) && !empty($_POST['func']))
	{
		$func = $_POST['func'];

		switch ($func)
		{
		case 'delBles':
        DelBlesses($_POST['nom']);
        break;
		default:
		SendError("Fonction inexistante dans le switch");
        break;
		}
	}
	else
	{
		SendError("Appel du Switch sans méthode demandée");
	}

	function SendError($erreur)
	{
		echo json_encode($erreur);
	}

	function GetBlesses()
	{
		require_once("../Models/Model.php");
		require_once("../Models/EVACModel.php");
		require_once("../Controllers/EVACController.php");
		$EVACCtrl = EVACController::getInstance();
		$blesses = $EVACCtrl->getBlesses();
	}

	function DelBlesses($nom)
	{
		require_once("../Models/Model.php");
		require_once("../Models/EVACModel.php");
		require_once("../Controllers/EVACController.php");
		$EVACCtrl = EVACController::getInstance();
		$EVACCtrl->delBlesses($nom);
	}

	function GetHopitaux()
	{
		require_once("../Models/Model.php");
		require_once("../Models/EVACModel.php");
		require_once("../Controllers/EVACController.php");
		$EVACCtrl = EVACController::getInstance();
		$hospital = $EVACCtrl->getHopitaux();
	}

?>
