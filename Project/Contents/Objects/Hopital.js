class Hopital extends Batiment{
  constructor(id, nom, place, temps){
    super(id);
    this.setType("Hopital");
    this.setNom(nom);
    this.setPlace(place);
    this.setTemps(temps);
  }
}
