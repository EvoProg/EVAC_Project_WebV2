//Classe héritant des paramètres de Vehicule
class Helicoptere extends Vehicule{
  constructor(id){
    super(id);
    this.setType("Helicoptere");
    this.setPlace(1);
  }
}
