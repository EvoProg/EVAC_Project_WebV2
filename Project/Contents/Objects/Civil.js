//Classe civil héritant des méthodes de Personne puisque c'est un personnage
class Civil extends Personne{
  constructor(id){
    super(id);
  }

  //Accesseurs en lecture et écriture
  setEnCharge(charge){ this.EnCharge = charge;}
  setBlessures(blessures){ this.Blessures = blessures;}

  getEnCharge(){ return this.EnCharge;}
  getBlessures(){ return this.Blessures;}
}
