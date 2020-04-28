<?php
  class EVACController{
	   private $_model;

	   private static $_instance = null;

	   public function __construct(){
		    $this->_model = new EVACModel;
	   }

	   public static function getInstance(){
		    if(is_null(self::$_instance)){
			       self::$_instance = new EVACController();
		    }
		    return self::$_instance;
	   }

	   public function getBlesses(){
		    $blesses = $this->_model->getBlesses();
		    return $blesses;
	   }

     public function delBlesses($nom)
	   {
		    $this->_model->delBlesses($nom);
	   }

     public function getHopitaux(){
       $hopitaux = $this->_model->getHopitaux();
       return $hopitaux;
     }

	   public function showVue(){
		    require_once('Views/EVACView.php');
	   }
  }
?>
