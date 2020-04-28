<?php
  if(isset($connection)){ //Teste si la connexion utilisateur est réussi
    echo "Connecté en tant que: "."$username"." <a onclick='deconnexion()'>Deconnexion</a>"; //Affiche le nom d'utilisateur et permet la deconnexion avec un fonction JavaScript.
  }else{
    echo "<input type='button' value='Connexion'/>"; //Permettra de se connecter
  }
?>
