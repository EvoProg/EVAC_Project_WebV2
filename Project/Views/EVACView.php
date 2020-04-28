<html>
  <div class="conteneur">

  <head>
    <meta charset="utf-8" />
    <title>Project Evac ALPHA V2</title>
    <link href="Contents/CSS/Style.css" rel="stylesheet">
  </head>

  <header>
    <!-- Placez ici le contenu de l'en-tête de votre page -->
    <?php require("EVACHeader.php"); ?>
    <h3>Vue EVAC ALPHA TEST V2</h3>
  </header>

  <body onload="init()">

        <table id="EVAC">
          <tr>
            <td>
            <fieldset id="Tchat">
              <legend>Tchat</legend>
            </fieldset>
          </td>
          <td>
            <fieldset id="Map">
              <legend>Map</legend>
                <?php require("EVACMap.php");
                      require("EVACVehicule.php");
                ?>
            </fieldset>
          </td>
          <td>
            <fieldset id="Info">
              <legend>Info</legend>
                <?php require("EVACInfo.php"); ?>
            </fieldset>
          </td>
        </tr>
        </table>

  </body>

  <footer>
    <fieldset id="Navigation">
      <!-- Placez ici le contenu du pied de page -->
      <?php require("EVACFooter.php") ?>
    </fieldset>
  </footer>

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

  </div>
</html>
