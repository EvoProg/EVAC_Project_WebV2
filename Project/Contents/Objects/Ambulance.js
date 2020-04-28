//Classe héritant des paramètres de la classe Véhicule
class Ambulance extends Vehicule{
  constructor(id){
    super(id);
    this.setType("Ambulance");
    this.setPlace(2);
  }
}
