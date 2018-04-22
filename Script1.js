$(document).ready(function () {
   
   
    //Piiloitetaan tulos template ja herjausviestit kun aluksi sivu ladataan
    $("#results").hide();
    $(".alert").hide();

    // Estet��n negatiivisten numeroiden tai v�lily�ntien lis�ys input kenttiin
    $("[type='number']").bind("keydown", function (e) {
        var code = e.keyCode || e.which;
        //Codet ovat napin painalluksille tarkoitetut numerot, esim code == 32 tarkoittaa
        //v�lily�nti�. T�ll� pyrit��n kertomaan lomakkeelle mit� painalluksia se ei saisi ottaa vastaan.
        if (code == 189 || code == 173 || code == 32 || code == 69 || code == 109) {
            return false;
        }
    });

    $("#calculate-btn").on("click", function (){ 
        var calculateAndDisplayScore = function () {
            window.scrollTo(0, 400);
 
            //Piilotetaan kaavake jos kaikki sy�tteet on t�ytetty ja "laske" nappulaa
            //painettu
            $("#form").hide();

            // Sy�tteiden muuttujat sek� html elementti id:t
            var sahkoInput = document.getElementById("sahko").value;
            var kaasuInput = document.getElementById("kaasu").value;
            var hiiliInput = document.getElementById("hiili").value;
            var autoInput = document.getElementById("auto").value;
            var lento4LessInput = document.getElementById("lento-4-less").value;
            var lento4MoreInput = document.getElementById("lento-4-more").value;


            // Alustetaan kaikki muuttujat aluksi tyhj�ksi jotta lomake ei anna
            //vahingossa virheellist� tulosta esim s�hk�n tai matkustuksen osalta.
            var sahkoScore = "";
            var kaasuScore = "";
            var hiiliScore = "";
            var autoScore = "";
            var lento4LessScore = "";
            var lento4MoreScore = "";
            var kierratysPaperi = "";
            var alumMetScore = "";

            var totalScore = "";
            

            //Mik�li kierrr�tyspaperille on valitty kierr�tykseksi kyll�
            //annetaan paperinkierr�tyksest� 0 lopulliseen scoreen
            //muussa tapauksessa scoreen lis�t��n 184 pistett�.
            if (document.getElementById("optionsRadio1").checked) {
                kierratysPaperi = 0;
            } else {
                kierratysPaperi = 184;
            }

            console.log("Kierr�tyspaperi pisteesi on: " + kierratysPaperi);

            //Mik�li metallinkierr�tykselle on valittu kierr�tykseksi "kyll�"
            //annetaan metallipisteit� 0 lopulliseen scoreen
            //muussa tapauksessa scoreen lis�t��n 166 pistett�.
            if (document.getElementById("optionsRadio3").checked) {
                alumMetScore = 0;
            } else {
                alumMetScore = 166;
            }


            console.log("Kierr�tysmetallipisteesi on: " + alumMetScore);


            //S�hk�nkulutuksen laskussa k�ytet��n vastaavaa menetelm��
            //jos k�ytt�j� inputtiin 0 tai j�tt�� vastaamatta, annetaan lopulliseen
            //pisteytykseen 0. Muussa tapauksessa input kerrotaan aluksi
            //0.808695 (t�m� johtuen siit� ett� alkuper�inen laskukaava on 
            //dollareiden mukaan) ja t�m� kerrotaan viel� 105:ll�
            if (sahkoInput === 0 || sahkoInput === "undefined") {
                sahkoScore = 0;
            } else {
                sahkoScore = (sahkoInput * 0.808695) * 105;
            }


            console.log("S�hk�pisteesi on: " + sahkoScore);


            //Kaasun laskemiseen sama homma, laskukaava alunperin 
            //dollareissa.
            if (kaasuInput === 0 || kaasuInput === "undefined") {
                kaasuScore = 0;
            } else {
                kaasuScore = (kaasuInput * 0.808695) * 105;
            }


            console.log("Kaasupisteesi on: " + kaasuScore);

            //Ja viel� hiilenk�yt�n kannalta sama laskukaava
            //sill� erotuksella ett� hiilinlaskukaava kerrotaan 113
            //koska ymp�rist�vaikutukset ovat suuremmat.
            if (hiiliInput === 0 || hiiliInput === "undefined") {
                hiiliScore = 0;
            } else {
                hiiliScore = (hiiliInput * 0.808695) * 113;
            }

            console.log("Hiilipisteesi on: " + hiiliScore);

            //Sama juttu auton kanssa. T�ss� erotuksena se ett�
            //jenkki laskukaava k�ytti gallonia, joten konversio
            //Litroihin tapahtuu jakamalla kilometri input 1.6xxx:ll�

            if (autoInput === 0 || autoInput === "undefined") {
                autoScore = 0;
            } else {
                autoScore = (autoInput/1.609344) * 0.79;
            }

            console.log("Autopisteesi on: " + autoScore);

            //Vuosittainen lent�minen lentokoneella on jaettu kahteen eri
            //osaan sill� alle 4 tunnin lennoissa ja yli nelj�n tunnin
            //lennoissa kulutus kasvaa kovasti
            if (lento4LessInput === 0 || lento4LessInput === "undefined") {
                lento4LessScore = 0;
            } else {
                lento4LessScore = lento4LessInput * 1100;
            }

            console.log("Alle nelj�n tunnin lentojen pistem��r�: " + lento4LessScore);

            if (lento4MoreInput === 0 || lento4MoreInput === "undefined") {
                lento4MoreScore = 0;
            } else {
                lento4MoreScore = lento4MoreInput * 4400;
            }

            console.log("Yli nelj�n tunnin lentojen pistem��r�: " + lento4MoreScore);

            //Lasketaan tulos energiankulutukselle muuttujaan energyscore
            //joka yhdist�� tulokset s�hk�n, kaasun ja hiilenk�yt�st�.
            //Lasketaan sama homma sek� matkustukselle autoilun ja lent�misen 
            //osalta, sek� kierr�tyksen osalta.
            var energyScore = sahkoScore + kaasuScore + hiiliScore;
            var travelScore = autoScore + lento4LessScore + lento4MoreScore;
            var jateScore = kierratysPaperi + alumMetScore;

            //Lasketaan kaikki yhteen ja py�ristet��n seuraavaan
            //kokonaislukuun.
            totalScore = Math.round(energyScore + travelScore + jateScore);
            var formattedScore = totalScore.toLocaleString("en");

            console.log(totalScore);

            document.getElementById("score").innerHTML = formattedScore;

            // N�ytet��n tulos
            $("#results").show(function(){
                console.log(totalScore);
                if (totalScore <= 5999) {
                    document.body.style.backgroundColor = "#ccff99";                    
                } else if(totalScore >= 6000 && totalScore <= 15999 ) {
                    document.body.style.backgroundColor = "#ccffff";
                } else if (totalScore >= 16000 && totalScore <= 22000){
                    document.body.style.backgroundColor ="#ffff66";
                } else{
                    document.body.style.backgroundColor="#ff9999";
                }
            });

            // P�ivitet��n sivusto kun painetaan nappia
            // "Laske uudelleen"
            $("#recalculate-btn").on("click", function () {
                location.reload();
                window.scrollTo(0, 0);
            });
        }

        // Katostaan ett� valinnat kierr�tyspaperille ja metalleille on tehty
        // ennne kuin laskenta ja tuloksen n�ytt�minen tehd��n.
        var kierratysPaperiSelectionYes = document.getElementById("optionsRadio1").checked;
        var kierratysPaperiSelectionNo = document.getElementById("optionsRadio2").checked;
        var kierratysAlumMetSelectionYes = document.getElementById("optionsRadio3").checked;
        var kierratysAlumMetSelectionNo = document.getElementById("optionsRadio4").checked;

        //N�ytet��n herjaus mik�li valintoja ei ole tehty kierr�tyspaperille ja metallille.
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