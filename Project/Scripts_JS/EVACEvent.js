//On récupere toutes les images représentant les objets :
var AmbulanceA = document.getElementsByClassName('Ambulance');
var HelicoptereA = document.getElementsByClassName('Helicoptere');

//La liste des objets Véhicules
var VehiculeArray = [];

//Fonction de lancement au démarrage de la page
function init(){
  creationVehicule(AmbulanceA);
  creationVehicule(HelicoptereA);
  drag(VehiculeArray);
  evenement();
  getHopitaux();
  //On crée le tableau des Bléssés
  InitTabBles();
  //On lance la fonction de récupération des bléssés qui se met à jour toutes les 3 secondes
  const interval = window.setInterval(getBlesses, 3000);
}

//On crée les véhicules objets js à partir des images récupérées et on les placent dans la liste des Vehicules en faisant la distinction Helico/Ambu
function creationVehicule(ListeVehicules){
  for(var i = 0; i< ListeVehicules.length; i++){
    if(ListeVehicules[i].className == "Ambulance"){
      var Ambu = new Ambulance(ListeVehicules[i].id);
      VehiculeArray.push(Ambu);
    }
    if(ListeVehicules[i].className == "Helicoptere"){
      var Helico = new Helicoptere(ListeVehicules[i].id);
      VehiculeArray.push(Helico);
    }
  }
}

//On donne aux objets possèdant l'id des Vehicules la possibilité de les déplacer
function drag(ListeObjets){
  for(var i = 0; i < ListeObjets.length; i++){
    $("#"+ListeObjets[i].id).draggable({containment : '#Ville'});
  }
}

//Evenement peremttant de déplace ou non les vehicules selon si l'on clique dessus
function evenement(){
  //On parcourt la liste des véhicules pour leurs donner l'évenemment cliquable
  for(var i = 0; i < VehiculeArray.length; i++){
    var vehi;
    $("#"+VehiculeArray[i].id).click(function(){
      for(var j = 0; j < VehiculeArray.length; j++){
        //on annule d'abord la sélection des autres Vehicules
        if(this.id != VehiculeArray[j].id)
          $("#"+VehiculeArray[j].id).css("border-style","none");
        //On récupère l'objet pour lui appliquer un état si celui ci est en mouvement ou non
        if(this.id == VehiculeArray[j].id)
          vehi = VehiculeArray[j];
      }
      //on sélectionne le véhicule cliqué
      $("#"+this.id).css("border-style","solid");
      //on ajuste la couleur en fonction de si celui-ci est en mouvement
      if(vehi.EnMouvement == true){
        $("#"+this.id).css("border-color","red");
        $("#"+this.id).draggable("option","disabled", true);
      }else
        $("#"+this.id).css("border-color","white");
      //On crée un formulaire d'information concernant le véhicule
      CreaFormVehi(getObjet(this.id));  //Fonction présente dans EVACVehiculeScript
    });
  }
}

//Retourne un objet Véhicule dans VehiculeArray
function getObjet(Objet){
  var ret = null;
  for(var i = 0; i < VehiculeArray.length; i++){
    if(Objet == VehiculeArray[i].id){
      ret = VehiculeArray[i];
    }
  }
  return ret;
}
