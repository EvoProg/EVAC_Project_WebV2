//Liste contenant les Hopitaux
var ListeHopitaux = [];

//Nom de l'hopital auquel on envoi des patients récupérer
var HopitalRecup;
//Variable temps récupérer de l'hopital
var TempsTraj = 0;

//Compteur permettant de respecter la variable Maitre du jeu NbrHopitaux
var compteur = 0;
var NbrHopitaux;

//Récupération de la variable du nombre d'Hopitaux désigné par le Maitre du jeu
$.post( "Contents/DATA/DataConv.php", function( data_json ){
    let newJSON = JSON.parse(data_json);
    NbrHopitaux = newJSON.NbrHopitaux;
});

//On récupère les Hopitaux à l'aide de la fonction suivante appelant le concept ajax
function getHopitaux(){
  $.ajax({
        type: 'GET',
        url: 'Controllers/SwitchController.php',
        timeout: 3000,
        data: {func: 'getHopi'},
        success: function (data) {
            // On parse le JSON
            hopiJSON = JSON.parse(data);

            // On décompose le tableau obtenu
            for (var i in hopiJSON) {
                // En hopitaux
              if(compteur != NbrHopitaux){
                var hopi = hopiJSON[i];
                var idHopi = hopi[0];
                var nom = hopi[1];
                var place = hopi[2];
                var temps = hopi[3];
                CreateHopital(idHopi, nom, place, temps);
                compteur = compteur+1;
              }
            }
        },
        error: function () {
            console.log("La requête n'a pas aboutie");
        }
    });
}

//Fonction créant un hopital
function CreateHopital(id,nom,place,temps){
    //Recherche si l'hopital qu'on ajoute n'est pas déjà présent
    if (CheckHopital(id) == false) {
        var Hopi = new Hopital(id,nom,place,temps);
        ListeHopitaux.push(Hopi);
    }
    else
    {
        console.log("existe deja");
    }
}

//Fonction check si l'hopital existe déjà dans la liste selon un id
function CheckHopital(id) {
    var testHop = getHopital(id);
    if (testHop == null)
    {
        return false;
    }
    else if (testHop.ID == id) {
        return true;
    }
    return false;
}

//Fonction récupérant un hopital selon son ID
function getHopital(id){
    var hop = ListeHopitaux.find(x => x.ID === id);
    //console.log(hos);
    return hop;
}

//Fonction créant le tableaux d'hopitaux
function CreatFormHopit(){
  //On créer un tableau regroupant les Hopitaux récupérés avec leurs paramètres
  TABLE = document.createElement("table");
  TABLE.id = "ListeHopitaux";

  //La ligne regroupant quatres paramètres
  TR = document.createElement("tr");
  //Le nom de l'hopital
  TH = document.createElement("th");
  TH.scope = "col";
  TH.className = "Nom";
  TXT = document.createTextNode("Nom de l'Hôpital");
  TH.appendChild(TXT);
  TR.appendChild(TH);

  //Le nombre de place de celui-ci
  TH = document.createElement("th");
  TH.scope = "col";
  TH.className = "Place";
  TXT = document.createTextNode("Places disponibles");
  TH.appendChild(TXT);
  TR.appendChild(TH);

  //Le temps de trajet pour y parvenir
  TH = document.createElement("th");
  TH.scope = "col";
  TH.className = "Temps";
  TXT = document.createTextNode("Temps de Trajet");
  TH.appendChild(TXT);
  TR.appendChild(TH);

  //L'endroit de séléction
  TH = document.createElement("th");
  TH.scope = "col";
  TXT = document.createTextNode("Sélectionner");
  TH.appendChild(TXT);
  TR.appendChild(TH);

  //Et on ajoute la ligne au tableau parent
  TABLE.appendChild(TR);

  //On appelle la fonction remplissant le tableau selon la liste d'Hopitaux
  RemplirTabHopitaux(TABLE);

  //On envoi le tableau remplit par la fonction précédante
  return TABLE;
}

//Fonction remplissant le tableau selon la liste d'Hopitaux
function RemplirTabHopitaux(TABLE){
  for(var i = 0; i < ListeHopitaux.length; i++){
    //On créé la ligne
    TR = document.createElement("tr");
    //La cellule NOM
    TD = document.createElement("td");
    TD.scope="row";
    TD.className="Nom";
    TXT = document.createTextNode(ListeHopitaux[i].nom);
    TD.appendChild(TXT);
    //On l'ajoute à la ligne
    TR.appendChild(TD);

    //Et on réitère pour les autres cellules

    //La cellule du nombre de Place
    TD = document.createElement("td");
    TD.className="Place";
    TXT = document.createTextNode(ListeHopitaux[i].place);
    TD.appendChild(TXT);

    TR.appendChild(TD);

    //La cellule du temps pour y parvenir
    TD = document.createElement("td");
    TD.className="Temps";
    TXT = document.createTextNode(ListeHopitaux[i].temps+" min");
    TD.appendChild(TXT);

    TR.appendChild(TD);

    //La cellule de sélection
    TD = document.createElement("td");
    TD.className="Selection";
    //Sélection selon un bouton
    CH = document.createElement("input");
    CH.type="button";
    //On lui donne un id selon le nom de l'hopital et une classe
    CH.id=ListeHopitaux[i].nom;
    CH.class="HOSPITAl";
    CH.value="Envoyer"; //La valeur (Texttuelle) du bouton

    //On lui ajoute une fonction d'evenement qui appelle une fonction ici RecupHopital
    CH.onclick = function(){alert("Vous avez choisi de Sélectionner :"+this.id); RecupHopital(this.id);};
    TD.appendChild(CH);
    TR.appendChild(TD);

    //Et on ajoute la ligne au Tableau
    TABLE.appendChild(TR);
  }
}

//Fonction récupérant l'hopital sélectionné
function RecupHopital(id){
  //On récupere tous les éléments ayant l'id passé en paramètres
  var IN = document.getElementById(id);
  //On récupère tous les inputs
  var INALL = document.querySelectorAll('input');
  //On parcourt tous les Inputs
  for( var i = 0 ; i < INALL.length; i++){
    if(INALL[i].class == IN.class){
      if(INALL[i].id != IN.id){
        INALL[i].disabled = false;
        INALL[i].value="Envoyer";
        HopitalRecup = IN.id;
        console.log(IN.id);
        TempsTraj = getTemps(HopitalRecup);
      }
    }
  }
  IN.disabled = true;
  IN.value = "Selection";
}

//Fonction retournant le temps de parcours juqu'a un hopital
function getTemps(value){
  for(var i = 0; i < ListeHopitaux.length; i++){
    if(ListeHopitaux[i].nom == value){
      return ListeHopitaux[i].temps;
    }
  }
}

//Fonction de mise à jour du nombre de place de l'Hopital
function MajHopi(name, vict){
  var res = true;
  for(var i = 0; i < ListeHopitaux.length; i++){
    if(name == ListeHopitaux[i].getNom()){
      if(ListeHopitaux[i].place < vict){
        res = false;
      }else{
        ListeHopitaux[i].place = ListeHopitaux[i].place - vict;
        if(ListeHopitaux[i].place == 0){
          MajListeHopitaux(ListeHopitaux[i]);
        }
      }
    }
  }
  return res;
}

//Fonction de Mise à jour de la liste d'hopitaux si un hopital à ses places à 0
function MajListeHopitaux(Hopi){
  var ListeHopitauxTemp = [];
  for(var i = 0; i < ListeHopitaux.length; i++){
    if(ListeHopitaux[i] != Hopi)
      ListeHopitauxTemp.push(ListeHopitaux[i]);
  }
  ListeHopitaux = ListeHopitauxTemp;
}
