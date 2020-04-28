//On récupère les éléments HTML auquel l'on vas ajouter et supprimer des éléments
var Field = document.getElementById("VehiculeInfo");

//Représentant de compteur de sélection de bléssés
var Id_Select = 0;

//Variables de récupération
var SelectRecup = "";
var SelectRecup2 = "";
var cptr = 0;

//Variable temporaire
var VehiculeTemp = null;

function CreaFormVehi(Vehicule){
  //console.log(Vehicule);
  VehiculeTemp = Vehicule; //On stocke le véhicule dans une variable temporaire
  //Si le véhicule n'est pas en mouvement
  if(Vehicule.EnMouvement == false){
    ClearForm(); //On clear le Field
    InitField(Vehicule); //On Initialise le Field
    Field.appendChild(CreatFormHopit());   //On appel la fonction créant le tableau d'hopitaux de EVACHopitauxScript.js renvoyant ledit tableau
    //Appel de la Fonction créant les Boutons d'envois et de clear du Formulaire
    CreatSectionEnCl();
  }else{
    ClearForm(); //On clear le Field
    InitFieldEnMouvement(Vehicule); //On initialise le Field si le véhicule est en mouvement
  }
}

//Clear le Field
function ClearForm(){
  // D'abord vérifier que l'élément a des noeuds enfants
  if(Field.hasChildNodes()){
    while(Field.firstChild){
      // La liste n'est pas une copie, elle sera donc réindexée à chaque appel
      Field.removeChild(Field.firstChild);
    }
  }
}


//Initialise le Field
function InitField(Vehicule){
  //On crée les éléments et on les ajoutent au Field
  Legend = document.createElement("Legend");  //La légende informant sur quel véhicules on se trouvent
  TXT = document.createTextNode("Informations Véhicules : #"+Vehicule.id);
  Legend.appendChild(TXT);

  //Les informations sur le nombre de place de l'ambulance
  Place = document.createElement("p");
  TXT = document.createTextNode("Nombre de Blessés pouvant être transportés : "+Vehicule.getPlace());
  Place.appendChild(TXT);

  //On ajoute au Field
  Field.appendChild(Legend);
  Field.appendChild(Place);

  SelecBlesses(Vehicule); //On appel ensuite la fonction de création de Sélection des Blessés
}


//Créé la partie de Sélection des Bléssés
function SelecBlesses(Vehicule){
  //On parcourt le nombre de place pouvant accueillir le véhicule sélectionné
  for(var i = 0; i < Vehicule.getPlace(); i++){
    Br = document.createElement("br"); //Element de saut de ligne
    //Element de création HTML
    Label = document.createElement("label");
    TXT = document.createTextNode("Blessés pouvant être pris en charge :");
    Label.appendChild(TXT);

    //On crée la liste de Sélection de bléssés auquel on affecte un ID
    Select = document.createElement("select");
    Select.id = Vehicule.id+Id_Select;
    //Et une première Option par défaut
    Option = document.createElement("option");
    Option.value=0; //Valeur 0
    Option.selected = true; //Par défaut
    TXT = document.createTextNode("Faites un Choix");
    Option.appendChild(TXT);
    Select.appendChild(Option);


    //On créer les options à partir du nombre de bléssés envoyés par la PMA
    for( var j = 0; j < ListeBlesses.length; j++){
      Option = document.createElement("option");
      Option.value = ListeBlesses[j].getNom();
      Option.id = ListeBlesses[j].id;
      TXT = document.createTextNode(ListeBlesses[j].getNom()+" "+ListeBlesses[j].getPrenom());
      Option.appendChild(TXT);
      Select.appendChild(Option);
    }


    //On définit un évenement de sélection sur l'élément selection
    Select.onclick = function(){Maj(this,ListeBlesses)}; // appel à la fonction Maj

    //On ajoute cela au Field
    Field.appendChild(Label);
    Field.appendChild(Br);
    Field.appendChild(Select);
    //On incrèmente l'Id_Select
    Id_Select = Id_Select + 1;
  }
}

//Fonction permettant la mise à jour des listes de sélection selon l'élément sélectionné
function Maj(sel){
  //On récupère tous les éléments select de notre page html
  var select = document.querySelectorAll('select');
  var listTemp = []; //Une liste Temporaire
  var tmp = 0; //Variable temporairement mise à jour

  //Vérification et ajout dans la liste temporaire des éléments non sélectionné
  if(tmp == 0 && sel.selectedIndex != 0){
    if(sel.selectedIndex != 0){
      for(var i = 0; i < sel.length; i++){
        if(sel.selectedIndex != i){
          listTemp.push(sel[i]);
        }
      }
    }
    //On parcourt la listes des élements 'select' afin de donner à la liste non sélectionné la liste temporaire nouvellement créer à partir de MajSelect
    for(var i = 0; i < select.length; i++){
        if(sel.id != select[i].id){
          MajSelect(select[i], listTemp);
        }
      }
      sel.disabled = true;
      tmp = tmp+1;
  }
}

//Fonction donnant à un select non utilisé une nouvelle liste
function MajSelect(select,list){
  var sel = document.getElementById(select.id);
  //console.log(sel);
  if(sel.disabled == false){
    if(sel.hasChildNodes()){
      while (sel.firstChild) {
        sel.removeChild(sel.firstChild);
      }
    }
    for( var i = 0; i < list.length; i++){
      sel.appendChild(list[i]);
    }
  }
}

//Fonction créant les Boutons d'envois et de clear du Formulaire
function CreatSectionEnCl(){
  //On crée le bouton de prise en charge
  IN = document.createElement("input");
  IN.type = "button";
  IN.value = "Prendre en charge";
  IN.id = "EnCharge";
  IN.className = "Bouton";
  //On l'ajoute au Field
  Field.appendChild(IN);

  //Le boutton pour effacer le formulaire
  IN = document.createElement("input");
  IN.type = "button";
  IN.value = "Effacer";
  IN.id = "Effacer";
  IN.className = "Bouton";
  //On l'ajoute au Field
  Field.appendChild(IN);

  //On appelle la fonction leur donnant des évennements
  AddEvenementBoutonForm();
}

//On donne un évennement à l'aide du concept Ajax (On varie les données)
function AddEvenementBoutonForm(){
  //Le bouton EnCharge
  $("#EnCharge").click(function(){
    GetSelect(); //On récupère les sélections des bléssés
    if(Verification() == true){
      EnCharge(VehiculeTemp, SelectRecup, SelectRecup2, HopitalRecup,TempsTraj); //On les envois dans la fonction de traitement
      ClearInfor(); //On supprime le formulaire
    }else {
      alert('Veuillez vérifier les informations sélectionnées ! Informations manquantes pour l\'envoie des données ');
    }
 });
  //Le Bouton effacer
  $("#Effacer").click(function(){
    ClearForm();  //On clear le Formulaire
    CreaFormVehi(VehiculeTemp); //On le recréé avec le Vehicule stocké dans la variable temporaire
    ClearInfor(); //On remet à zéro les variables
  });
}

//Fonction récupérant la sélection et sa valeur
function GetSelect(){
  var select = document.querySelectorAll('select');
  for(var i = 0; i < select.length; i++){
    SetInd(select[i].value);
  }
}

//On récupère la valeur et incrémente le compteur
function SetInd(value){
  if(cptr == 0){
    SelectRecup = value;
    cptr = cptr+1;
  }else{
    SelectRecup2 = value;
    cptr = cptr+1;
  }
}

//Fonction remettant les variables à 0
function ClearInfor(){
  cptr = 0;
  SelectRecup = "";
  SelectRecup2 = "";
  HopitalRecup = "";
  TempsTraj = 0;
}

//Fonction de prise en charge, traitement du formulaire
function EnCharge(vehi, sel1, sel2, hosp, temps){
  //Nombre de bléssés transportés
  var vict = 0;

  //On incrémente le nombre de bléssés transportées
  if(sel1 != 0){
    DeleteBlesses(sel1);
    vict = vict+1;
  }
  if(sel2 != 0){
    DeleteBlesses(sel2);
    vict = vict+1;
  }

  //ON fait la mise à jour des places de l'hopital sélectionné selon la vérification
  if(MajHopi(hosp, vict) == true){

    //On change le style css
    $("#"+vehi.id).css("border-style","none");
    //On clear le formulaire
    ClearForm();

    //On ajoute les civils aux Véhicules
    vehi.setCivilEnCharge(getCivilNom(sel1), getCivilNom(sel2));
    vehi.setTempsTrajet(temps);
    vehi.setDirection(hosp);

    //Mise à jour de la liste des bléssés
    MajListBles();

    //On créé un compteur permettant de bloquer le véhicule durant temps/3
    var time = (temps*60)/3;

    $("#"+vehi.id).draggable("option","disabled", true);
    timer = setInterval(function(){
      if(time > 0){
        --time;
        vehi.EnMouvement = true;
        console.log(time);
        $("#"+vehi.id).draggable("option","disabled", true);
        $("#"+vehi.id).css("border-color","red");
      }else{
        vehi.EnMouvement = false;
        $("#"+vehi.id).draggable("option","disabled", false);
        clearInterval(timer);
      }
    }, 1000);
  }else{
    alert("Pas assez de place dans l'Hopital sélectionné ! Veuillez choisir un autre Hopital");
  }
}

//Fonction de vérification d'envoie des données de prise en En Charge
function Verification(){
  var res = false;
  if(HopitalRecup == "" || TempsTraj == 0 || (SelectRecup == 0 && SelectRecup2 == 0)){
        res = false;
  }else {
    if(HopitalRecup != "" && TempsTraj != 0 && ((SelectRecup != 0 && SelectRecup2 == 0) || (SelectRecup == 0 && SelectRecup2 != 0) || (SelectRecup != 0 && SelectRecup2 != 0))){
      res = true;
    }
  }
  return res;
}

//Fonction initialisant le Field si le véhicule est en mouvement
function InitFieldEnMouvement(Vehicule){
  //On crée les éléments et on les ajoutent au Field
  Legend = document.createElement("Legend");  //La légende informant sur quel véhicules on se trouvent
  TXT = document.createTextNode("Informations Véhicules : #"+Vehicule.id);
  Legend.appendChild(TXT);

  //Les informations sur l'ambulance en déplacement
  Direction = document.createElement("p");
  TXT = document.createTextNode("#"+Vehicule.id + " en déplacement vers : "+Vehicule.getDirection());
  Direction.appendChild(TXT);

  //On ajoute au Field
  Field.appendChild(Legend);
  Field.appendChild(Direction);

  Place = document.createElement("p");
  TXT2 = document.createTextNode("Transporte à son bord : ");
  Place.appendChild(TXT2);

  Field.appendChild(Place);

  if(Vehicule.getCivilEnCharge() != null){
    Civ1 = document.createElement("p");
    TXT3 = document.createTextNode(" - "+Vehicule.getCivilEnCharge().getNom()+" "+Vehicule.getCivilEnCharge().getPrenom());
    Civ1.appendChild(TXT3);
    Field.appendChild(Civ1);
  }

  if(Vehicule.getCivilEnCharge2() != null){
    Civ2 = document.createElement("p");
    TXT4 = document.createTextNode(" - "+Vehicule.getCivilEnCharge2().getNom()+" "+Vehicule.getCivilEnCharge2().getPrenom());
    Civ2.appendChild(TXT4);
    Field.appendChild(Civ2);
  }

  Temps = document.createElement("p");
  TXT5 = document.createTextNode("Temps de trajet estimé : "+Vehicule.getTempsTrajet()+" min. environ");
  Temps.appendChild(TXT5);
  Field.appendChild(Temps);
}
