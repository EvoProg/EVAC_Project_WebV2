//Classe représentant un Batiment dont lequel peut être associé un hopital, une caserne de pompier, ou autre
class Batiment{
  constructor(id){
    this.id = id;
  }

  setType(type){ this.type = type;}
  setEmplacement(emplacement){ this.emplacement = emplacement;}
  setTemps(temps){ this.temps = temps;}
  setNom(nom){ this.nom = nom;}
  setPlace(place){this.place = place;}

  getPlace(){ return this.place;}
  getNom(){ return this.nom;}
  getTemps(){ return this.temps;}
  getType(){ return this.type;}
  getEmplacement(){ return this.emplacement;}
}
