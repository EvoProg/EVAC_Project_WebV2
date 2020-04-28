//Classe parente des Vehicules utilisés dans ce projet
class Vehicule{
  constructor(id){
    this.id = id;
    this.EnMouvement = false;
  }

  //Accesseurs en lecture et en écriture
  setPlace(place){ this.place = place;}
  setType(type){ this.type = type;}

  getPlace(){ return this.place;}
  getType(){ return this.type;}

  setCivilEnCharge(civ,civ2){
    if (civ != null) {
      this.civ = civ;
    }

    if(civ2 != null){
      this.civ2 = civ2;
    }
  }
  setDirection(direction){this.direction = direction;}
  setTempsTrajet(temps){this.temps = temps;}

  getCivilEnCharge(){return this.civ;}
  getCivilEnCharge2(){return this.civ2;}
  getDirection(direction){return this.direction;}
  getTempsTrajet(){return this.temps;}
}
