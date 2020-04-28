<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8" />
    <title>Projet WEB EVAC V2</title>
    <link href="Contents/CSS/Style.css" rel="stylesheet">
  </head>

  <body onload="init()">
      <div class="page">

        <header class="site-header">
          <!-- Placez ici le contenu de l'en-tête de votre page -->
          <?php require("EVACHeader.php"); ?>
          <h3>Vue EVAC ALPHA TEST V2</h3>
        </header>

        <main class="site-content">
        <div class="conteneur">

          <div class="Tchat">
            <!--Require avec le chat -->
            <fieldset id="Tchat">
              <legend>Tchat</legend>
            </fieldset>
		      </div>

          <div class="Map">
            <fieldset id="Map">
              <legend>Map</legend>
                <?php require("EVACMap.php");
                      require("EVACVehicule.php");
                ?>
            </fieldset>
          </div>

          <div class="Info">
            <fieldset id="Info">
              <legend>Info</legend>
                <?php require("EVACInfo.php"); ?>
            </fieldset>
          </div>

        </div>
      </main>
        <footer>
          <fieldset class="site-footer">
            <!-- Placez ici le contenu du pied de page -->
            <?php require("EVACFooter.php") ?>
          </fieldset>
        </footer>
      </div>
  </body>

  <script src="Scripts_JS/jquery.js"></script>
  <script src ="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="Contents/Objects/Vehicule.js"></script>
  <script src="Contents/Objects/Ambulance.js"></script>
  <script src="Contents/Objects/Helicoptere.js"></script>

  <script src="Scripts_JS/EVACEvent.js"></script>

  <script src="Contents/Objects/Personne.js"></script>
  <script src="Contents/Objects/Civil.js"></script>

  <script src="Contents/Objects/Batiment.js"></script>
  <script src="Contents/Objects/Hopital.js"></script>
  <script src="Scripts_JS\EVACHopitauxScript.js"></script>

  <script src="Scripts_JS\EVACBlessesScript.js"></script>
  <script src="Scripts_JS\EVACVehiculesScript.js"></script>

</html>
