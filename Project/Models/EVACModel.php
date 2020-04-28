<?php
  class EVACModel extends Model{

    public function getBlesses(){
      $this->getBdd();
		  $req = parent::$_bdd->query('SELECT * FROM BLESSES');

      $victims = $req->fetchAll();
      $req->closeCursor();
		  echo json_encode($victims);
    }

    public function getHopitaux(){
      $this->getBdd();
      $req = parent::$_bdd->query('SELECT * FROM HOPITAUX');

      $hospital = $req->fetchAll();
      $req->closeCursor();
		  echo json_encode($hospital);
    }

    public function delBlesses($nom)
	  {
		  $this->getBdd();
		  $query = parent::$_bdd->prepare('DELETE FROM BLESSES WHERE BLESSES.NOM = ?;');
		  $query->execute(array($nom));
		  $query->closeCursor();

		  echo json_encode(["status" => "success"]);
	  }
  }
?>
