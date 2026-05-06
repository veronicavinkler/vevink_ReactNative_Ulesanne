# vevink_ReactNative_Ulesanne
See on mobiilirakendus, mis on loodud React Native ja Expo raamistikus. Rakendus võimaldab kasutajatel testida oma teadmisi erinevates valdkondades, laadides küsimusi reaalajas Open Trivia API-st.

## Projekti kirjeldus
Rakendus on loodud praktilise töö raames, et harjutada React Native komponentide, navigeerimise (Expo Router), API päringute ja kohaliku andmebaasi (SQLite) kasutamist. Kasutaja saab sisestada oma nime, valida huvipakkuva kategooria ning raskusastme, et alustada 10 küsimusega viktoriini. Tulemused salvestatakse kohalikku edetabelisse.

## Käivitamise juhend
Rakenduse käivitamiseks oma arvutis või seadmes järgi neid samme:
1. Eeldused:
   - Veendu, et sul on installitud Node.js.
   - Mobiilis testimiseks installi Expo Go äpp.

2. Sõltuvuste installimine:
   Ava terminal projektikaustas ja jookse: npm install

3. Vajalike lisateekide kontroll:
   npx expo install expo-sqlite @react-native-picker/picker expo-router

4. Rakenduse käivitamine:
   npx expo start

6. Testimine:
   - Skaneeri terminalis kuvatav QR-kood oma telefoni Expo Go äpiga.
   - Androidi emulaatori kasutamiseks vajuta terminalis.
   - Märkus: SQLite tõttu ei tööta andmebaasi funktsionaalsus veebibrauseris (Web).

## Realiseeritud funktsionaalsus
1. Küsimuste laadimine (API)
   - Küsimused pärinevad Open Trivia API-st.
   - Toetatud kategooriad: Teadus, Kunst, Ajalugu, Tehnika, Sport.
   - Valitavad raskusastmed: Kerge (Easy), Keskmine (Medium), Raske (Hard).

2. Kasutajaliides
   - Peamenüü: Nime sisestamine ja viktoriini parameetrite valimine.
   - Viktoriini vaade: Küsimuste kuvamine ühekaupa koos valikvastustega.
   - Tulemuste vaade: Õigete vastuste arv, protsent ja edetabel.

3. Viktoriini loogika ja lisad
   - Taimer: Igale küsimusele on seatud 15-sekundiline ajapiirang.
   - Automaatne liikumine: Pärast vastamist või aja lõppemist liigutakse järgmise küsimuse juurde.
   - HTML-dekodeerimine: API-st tulnud sümbolid (nt &quot;) teisendatakse loetavaks tekstiks.

5. Andmehaldus (SQLite)
   - Leaderboard: Salvestatakse kasutaja nimi, skoor, protsent, aeg ja kuupäev.
   - Edetabel: Tulemuste vaates kuvatakse Top 5 parimat tulemust (järjestatud skoori ja aja järgi).
   - Detailid: Salvestatakse ka sessiooni täpsemad andmed JSON-kujul.
  
  ## Tehnoloogiad
  - React Native / Expo
  - Expo Router (Navigatsioon)
  - Expo SQLite (Andmebaas)
  - Open Trivia API (Andmed)
