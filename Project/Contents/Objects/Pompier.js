//Classe Pompier héritant des paramètres de la classe Personne
class Pompier extends Personne{
  constructor(id) {
    super(id);
    this.porte = false;
  }

  porterVictime() {
    this.porte = true;
  }

  getPorte() {
    return this.porte;
  }

}
