//On récupère ledit Tableau de blesses
var Tableau = document.getElementById('TableauBlesses');

//Liste contenant les bléssés envoyés par le PMA
var ListeBlesses = [];

//Variable de compteur Blessés
var compteurBlesses = 0;

//On récupère les bléssés à l'aide de la fonction suivante appelant le concept ajax
function getBlesses(){
  $.ajax({
        type: 'GET',
        url: 'Controllers/SwitchController.php',
        timeout: 3000,
        data: {func: 'getBles'},
        success: function (data) {
            // On parse le JSON
            blesJSON = JSON.parse(data);

            // On décompose le tableau obtenu
            for (var i in blesJSON) {
                // En bléssés
                var bles = blesJSON[i];
                var id = bles[0];
                var nom = bles[1];
                var prenom = bles[2];
                var vivant = bles[3];
                var vie = bles[4];
                var charge = bles[5];
                var blessures = bles[6];
                CreateBlesse(id, nom, prenom, vivant, vie, charge, blessures);
            }
        },
        error: function () {
            console.log("La requête n'a pas aboutie");
        }
    });
}

//Fonction créant le bléssé à partir des informations récupéré par getBlesses
function CreateBlesse(id, nom, prenom, vivant, vie, charge, blessures){
  //Si le civil n'existe pas on l'ajoute
  if(CheckCivil(id) == false) {
        var Civ = new Civil(id);
        Civ.setNom(nom);
        Civ.setPrenom(prenom);
        //Si l'attribut vivant est à 0 le civil est mort
        if(vivant == 0){
          Civ.vivant = false;
        }
        Civ.vie = vie;
        //Le civil a été pris en charge ?
        Civ.setEnCharge(charge);
        //Le niveaux de blessures du civil (0 = légères, 1 = graves)
        Civ.setBlessures(blessures);
        //On push le civil dans la liste de bléssés
        ListeBlesses.push(Civ);
        //On ajoute alors le bléssés au tableau de bléssés
        AjouterBlesses();
        //On incrémente le compteur
        compteurBlesses = compteurBlesses+1;
    }
    else
    {
        console.log("existe deja");
    }
}

//Renvoie true si l'objet existe déjà false s'il n'existe pas
function CheckCivil(id) {
  var testCiv = getCivil(id);
  if (testCiv == null)
  {
    return false;
  }
  else if (testCiv.id == id) {
    return true;
  }
  return false;
}

// Renvoie un civil de la ListeBlesses par l'id
function getCivil(id)
{
  var civ = ListeBlesses.find(x => x.id === id);
  return civ;
}

//Renvoie un civil de la listeBlesses par le nom (utilisé pour le script EVACVehiculeScript.js)
function getCivilNom(nom){
  var civ = null;
  for(var i = 0; i < ListeBlesses.length; i++)
  {
    if(ListeBlesses[i].getNom() == nom){
      civ = ListeBlesses[i];
    }
  }
  return civ;
}

//Fonction initialisant le tableau des bléssés basé sur le modèle du tableau des hopitaux
function InitTabBles(){
  //On créer un tableau regroupant les Bléssés récupérés avec leurs paramètres

  //La ligne regroupant quatres paramètres
  TR = document.createElement("tr");
  //Le nom du bléssé
  TH = document.createElement("th");
  TH.scope = "col";
  TH.className = "Nom";
  TXT = document.createTextNode("Nom");
  TH.appendChild(TXT);
  TR.appendChild(TH);

  //Le prénom de celui-ci
  TH = document.createElement("th");
  TH.scope = "col";
  TH.className = "Place";
  TXT = document.createTextNode("Prénom");
  TH.appendChild(TXT);
  TR.appendChild(TH);

  //Le nombre de point de vie
  TH = document.createElement("th");
  TH.scope = "col";
  TH.className = "PV";
  TXT = document.createTextNode("Points de Vie");
  TH.appendChild(TXT);
  TR.appendChild(TH);

  //Les blessures
  TH = document.createElement("th");
  TH.scope = "col";
  TH.className = "BlessuresT";
  TXT = document.createTextNode("Type de Blessures");
  TH.appendChild(TXT);
  TR.appendChild(TH);

  //Et on ajoute la ligne au tableau parent
  Tableau.appendChild(TR);
}

function AjouterBlesses(){
  //On créé la ligne
  TR = document.createElement("tr");
  //La cellule NOM
  TD = document.createElement("td");
  TD.scope="row";
  TD.className="Nom";
  TXT = document.createTextNode(ListeBlesses[compteurBlesses].getNom());
  TD.appendChild(TXT);
  //On l'ajoute à la ligne
  TR.appendChild(TD);

  //Et on réitère pour les autres cellules

  //La cellule PRENOM
  TD = document.createElement("td");
  TD.className="Place";
  TXT = document.createTextNode(ListeBlesses[compteurBlesses].getPrenom());
  TD.appendChild(TXT);

  TR.appendChild(TD);

  //La cellule des POINTS DE VIE
  TD = document.createElement("td");
  TD.className="PV";
  TXT = document.createTextNode(ListeBlesses[compteurBlesses].vie);
  TD.appendChild(TXT);

  TR.appendChild(TD);

  //La cellule du type des BLESSURES
  TD = document.createElement("td");
  TD.className="BlessuresT";
  if(ListeBlesses[compteurBlesses].getBlessures() == 0){
    TXT = document.createTextNode("Blessures légères");
  }
  if(ListeBlesses[compteurBlesses].getBlessures() == 1){
    TXT = document.createTextNode("Blessures graves");
  }
  TD.appendChild(TXT);

  TR.appendChild(TD);

  Tableau.appendChild(TR);
}

//Fonction pour supprimer les blesses pris en En Charge par les véhicules
function DeleteBlesses(nomBles) {
    $.ajax({
        type: 'POST',
        url: 'Controllers/SwitchController.php',
        data: {
            'func': 'delBles',
            'nom': nomBles,
        },
        timeout: 3000,
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            console.log("La requête n'a pas abouti");
            console.log(response);
        }
    });
}

//Fonction de mise à jour du tableau après avoir supprimer les blesses pris en charge par les véhicules
function MajListBles(){
  // D'abord vérifier que l'élément a des noeuds enfants
  if(Tableau.hasChildNodes()){
    while(Tableau.firstChild){
      // La liste n'est pas une copie, elle sera donc réindexée à chaque appel
      Tableau.removeChild(Tableau.firstChild);
    }
  }
  InitTabBles();
  //Remise à zéro de la Liste contenant les bléssés envoyés par le PMA
  ListeBlesses = [];

  //Remise à zéro de la Variable de compteur Blessés
  compteurBlesses = 0;
}
