$(document).ready(function () {
   
   
    //Piiloitetaan tulos template ja herjausviestit kun aluksi sivu ladataan
    $("#results").hide();
    $(".alert").hide();

    // Estetään negatiivisten numeroiden tai välilyöntien lisäys input kenttiin
    $("[type='number']").bind("keydown", function (e) {
        var code = e.keyCode || e.which;
        //Codet ovat napin painalluksille tarkoitetut numerot, esim code == 32 tarkoittaa
        //välilyöntiä. Tällä pyritään kertomaan lomakkeelle mitä painalluksia se ei saisi ottaa vastaan.
        if (code == 189 || code == 173 || code == 32 || code == 69 || code == 109) {
            return false;
        }
    });

    $("#calculate-btn").on("click", function (){ 
        var calculateAndDisplayScore = function () {
            window.scrollTo(0, 400);
 
            //Piilotetaan kaavake jos kaikki syötteet on täytetty ja "laske" nappulaa
            //painettu
            $("#form").hide();

            // Syötteiden muuttujat sekä html elementti id:t
            var sahkoInput = document.getElementById("sahko").value;
            var kaasuInput = document.getElementById("kaasu").value;
            var hiiliInput = document.getElementById("hiili").value;
            var autoInput = document.getElementById("auto").value;
            var lento4LessInput = document.getElementById("lento-4-less").value;
            var lento4MoreInput = document.getElementById("lento-4-more").value;


            // Alustetaan kaikki muuttujat aluksi tyhjäksi jotta lomake ei anna
            //vahingossa virheellistä tulosta esim sähkön tai matkustuksen osalta.
            var sahkoScore = "";
            var kaasuScore = "";
            var hiiliScore = "";
            var autoScore = "";
            var lento4LessScore = "";
            var lento4MoreScore = "";
            var kierratysPaperi = "";
            var alumMetScore = "";

            var totalScore = "";
            

            //Mikäli kierrrätyspaperille on valitty kierrätykseksi kyllä
            //annetaan paperinkierrätyksestä 0 lopulliseen scoreen
            //muussa tapauksessa scoreen lisätään 184 pistettä.
            if (document.getElementById("optionsRadio1").checked) {
                kierratysPaperi = 0;
            } else {
                kierratysPaperi = 184;
            }

            console.log("Kierrätyspaperi pisteesi on: " + kierratysPaperi);

            //Mikäli metallinkierrätykselle on valittu kierrätykseksi "kyllä"
            //annetaan metallipisteitä 0 lopulliseen scoreen
            //muussa tapauksessa scoreen lisätään 166 pistettä.
            if (document.getElementById("optionsRadio3").checked) {
                alumMetScore = 0;
            } else {
                alumMetScore = 166;
            }


            console.log("Kierrätysmetallipisteesi on: " + alumMetScore);


            //Sähkönkulutuksen laskussa käytetään vastaavaa menetelmää
            //jos käyttäjä inputtiin 0 tai jättää vastaamatta, annetaan lopulliseen
            //pisteytykseen 0. Muussa tapauksessa input kerrotaan aluksi
            //0.808695 (tämä johtuen siitä että alkuperäinen laskukaava on 
            //dollareiden mukaan) ja tämä kerrotaan vielä 105:llä
            if (sahkoInput === 0 || sahkoInput === "undefined") {
                sahkoScore = 0;
            } else {
                sahkoScore = (sahkoInput * 0.808695) * 105;
            }


            console.log("Sähköpisteesi on: " + sahkoScore);


            //Kaasun laskemiseen sama homma, laskukaava alunperin 
            //dollareissa.
            if (kaasuInput === 0 || kaasuInput === "undefined") {
                kaasuScore = 0;
            } else {
                kaasuScore = (kaasuInput * 0.808695) * 105;
            }


            console.log("Kaasupisteesi on: " + kaasuScore);

            //Ja vielä hiilenkäytön kannalta sama laskukaava
            //sillä erotuksella että hiilinlaskukaava kerrotaan 113
            //koska ympäristövaikutukset ovat suuremmat.
            if (hiiliInput === 0 || hiiliInput === "undefined") {
                hiiliScore = 0;
            } else {
                hiiliScore = (hiiliInput * 0.808695) * 113;
            }

            console.log("Hiilipisteesi on: " + hiiliScore);

            //Sama juttu auton kanssa. Tässä erotuksena se että
            //jenkki laskukaava käytti gallonia, joten konversio
            //Litroihin tapahtuu jakamalla kilometri input 1.6xxx:llä

            if (autoInput === 0 || autoInput === "undefined") {
                autoScore = 0;
            } else {
                autoScore = (autoInput/1.609344) * 0.79;
            }

            console.log("Autopisteesi on: " + autoScore);

            //Vuosittainen lentäminen lentokoneella on jaettu kahteen eri
            //osaan sillä alle 4 tunnin lennoissa ja yli neljän tunnin
            //lennoissa kulutus kasvaa kovasti
            if (lento4LessInput === 0 || lento4LessInput === "undefined") {
                lento4LessScore = 0;
            } else {
                lento4LessScore = lento4LessInput * 1100;
            }

            console.log("Alle neljän tunnin lentojen pistemäärä: " + lento4LessScore);

            if (lento4MoreInput === 0 || lento4MoreInput === "undefined") {
                lento4MoreScore = 0;
            } else {
                lento4MoreScore = lento4MoreInput * 4400;
            }

            console.log("Yli neljän tunnin lentojen pistemäärä: " + lento4MoreScore);

            //Lasketaan tulos energiankulutukselle muuttujaan energyscore
            //joka yhdistää tulokset sähkön, kaasun ja hiilenkäytöstä.
            //Lasketaan sama homma sekä matkustukselle autoilun ja lentämisen 
            //osalta, sekä kierrätyksen osalta.
            var energyScore = sahkoScore + kaasuScore + hiiliScore;
            var travelScore = autoScore + lento4LessScore + lento4MoreScore;
            var jateScore = kierratysPaperi + alumMetScore;

            //Lasketaan kaikki yhteen ja pyöristetään seuraavaan
            //kokonaislukuun.
            totalScore = Math.round(energyScore + travelScore + jateScore);
            var formattedScore = totalScore.toLocaleString("en");

            console.log(totalScore);

            document.getElementById("score").innerHTML = formattedScore;

            // Näytetään tulos
            $("#results").show();

            // Päivitetään sivusto kun painetaan nappia
            // "Laske uudelleen"
            $("#recalculate-btn").on("click", function () {
                location.reload();
                window.scrollTo(0, 0);
            });
        }

        // Katostaan että valinnat kierrätyspaperille ja metalleille on tehty
        // ennne kuin laskenta ja tuloksen näyttäminen tehdään.
        var kierratysPaperiSelectionYes = document.getElementById("optionsRadio1").checked;
        var kierratysPaperiSelectionNo = document.getElementById("optionsRadio2").checked;
        var kierratysAlumMetSelectionYes = document.getElementById("optionsRadio3").checked;
        var kierratysAlumMetSelectionNo = document.getElementById("optionsRadio4").checked;

        //Näytetään herjaus mikäli valintoja ei ole tehty kierrätyspaperille ja metallille.
        //muussa tapauksessa kutsutaan funktiota calculateAndDisplayScore.
        if (kierratysPaperiSelectionYes == false && kierratysPaperiSelectionNo == false || kierratysAlumMetSelectionYes == false && kierratysAlumMetSelectionNo == false) {
            if (kierratysPaperiSelectionYes == false && kierratysPaperiSelectionNo == false) {

                $("#kierratysPaper-alert").show();

            } else {

                $("#kierratysPaper-alert").hide();
            }

            if (kierratysAlumMetSelectionYes == false && kierratysAlumMetSelectionNo == false) {

                $("#alum-met-alert").show();

            } else {

                $("#alum-met-alert").hide();
            }

        } else {

            calculateAndDisplayScore();
        }
    });

});