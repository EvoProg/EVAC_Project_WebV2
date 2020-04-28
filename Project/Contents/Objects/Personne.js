//Classe représentant un personnage
class Personne{
  constructor(id){
    this.id = id;
    this.vivant = true;
    this.vie = 100;
  }

  //Accesseurs en lecture et en écriture des variables utilisés par Civil
  setNom(nom){ this.nom = nom; }
  setPrenom(prenom){ this.prenom = prenom;}

  getNom(){ return this.nom;}
  getPrenom(){ return this.prenom;}
}
