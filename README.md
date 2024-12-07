# Išmaniosios sutarties ir decentralizuotos aplikacijos kūrimas
## Tikslas
Pagrindinis šios užduoties tikslas yra sukurti išmaniąją sutartį (angl. smart contract), kuri įgyvendintų tam tikrą verslo logiką ir galėtų užtikrinti jos "saugų" ir "patikimą" funkcionavimą decentralizuotame viešąjame tinkle. Išmaniosios sutarties valdymui ir verslo proceso dalyvių tarpusavio sąveikai palengvinti bus kuriama decentralizuota aplikacija su Front-End . Šioje užduotyje išmanioji sutartis įgyvendinama Solidyti programavimo kalba ir turi būti adaptuota Ethereum blockchain tinklui. Šiai užduočiai atlikti Jums reikės:
* Išmaniosios sutarties kūrimui rekomenduojama naudoti "on-line" įrankį Remix IDE, o testavimui ir diegimui Truffle IDE, kurį reikia įdiegti į savo kompiuterį.
* Decentralizuotos aplikacijos testavimui galite naudoti Ganache įrankį, kuris sukuria lokalų Ethereum tinklą.
* Jums taip pat prireiks kliento MetaMask, kuris įgalins sąsają su Ethereum tinklu.
* Išmaniosios sutarties testavimui naudokite ir vieną iš viešųjų Ethereum testinių tinklų (angl. testnet), pvz., Goerli.
  
## Užduoties formuluotė
1. Aprašykite išmaniosios sutarties verslo modelio logiką, kurią įgyvendins išmanioji sutartis.
Pasirinkite verslo modelį pvz., https://medium.com/coinmonks/build-a-smart-contract-to-sell-goods-6cf73609d25. Šiame verslo modelyje dalyvauja tokios šalys: pirkėjas , pardavėjas , kurjeris , o pati išmanioji sutartis užtikrina "saugų" prekių pardavimą/pirkimą ir pristatymą .
2. Realizuokite pirmąjame žingsnyje aprašytą verslo logiką išmanioje sutartyje Solidyti kalboje.
3. Ištestuokite išmaniosios sutarties veikimą Ethereum lokaliame tinkle ir Ethereum testiniame tinkle (pvz., Goerli).
4. Naudojant Ethereum testinio tinklo Etherscan peržiūrėkite išmaniosios sutarties vykdymo "logus".
5. Sukurkite decentralizuotos aplikacijos Front-End ą (tinklapį arba mobiliąją aplikaciją), kuri įgalintų bendravimą su išmaniąja sutartimi.
* Planas minimum: minimalistinio dizaino ir minimalaus funkcionalumo aplikacija, kuri tiesiog užtirkintų sąveiką su verslo modelio dalyviais ir leistų aktyvuoti išmaniosios sutarties funkcijas, pateikti/nuskaityti sutarčiai reikalingus duomenis.
* Planas maximum: praplėsto funkcionalamo (ir dizaino) aplikacija. Čia žiūrėkite kūrybiškai, atsižvelgiant į turimą laiką, patirtį ir galimybes.

## Atliktos užduoties aprašymas 
### 1. Maisto pristatymo modelis su išmaniąja sutartimi
---
#### Dalyvaujančios šalys:
- **Pirkėjas**: Užsako maistą ir pateikia mokėjimą.
- **Pardavėjas (restoranas)**: Paruošia užsakymą pagal pirkėjo pateiktą užsakymą.
- **Kurjeris**: Pristato užsakymą pirkėjui.
- **Išmanioji sutartis**: Užtikrina visų šalių bendradarbiavimą, automatizuoja mokėjimus ir garantuoja proceso saugumą.

#### Išmaniosios sutarties verslo modelio logika
- **Užsakymo pateikimas**. Pirkėjas pasirenka maistą restorano internetinėje ar mobilioje platformoje ir pateikia užsakymą. Mokėjimas pervedamas į išmaniąją sutartį, kur lėšos yra „užrakinamos“ iki pristatymo patvirtinimo.
- **Informacijos perdavimas pardavėjui**. Išmanioji sutartis siunčia informaciją apie užsakymą pardavėjui (restoranui). Pardavėjas pradeda maisto gamybos procesą.
- **Kurjerio įtraukimas**. Kai maistas paruoštas, pardavėjas perduoda informaciją kurjeriui, o išmanioji sutartis užfiksuoja pristatymo procesą. Kurjeris pasiima maistą iš restorano.
- **Pristatymo sekimas**. Išmanioji sutartis stebi kurjerio judėjimą naudodama integruotas sekimo sistemas (pavyzdžiui, GPS duomenis), kad užtikrintų pristatymo proceso skaidrumą.
- **Pristatymo patvirtinimas**. Kai kurjeris pristato užsakymą, pirkėjas patvirtina gavimą (pavyzdžiui, naudodamas mobilųjį pranešimą ar mobiliąją programą). Pristatymo patvirtinimas automatiškai paleidžia lėšas iš išmaniosios sutarties.
- **Mokėjimų paskirstymas**.
  * Pardavėjas (restoranas) gauna pagrindinę užsakymo dalį.
  * Kurjeris gauna sutartyje nurodytą pristatymo mokestį.
  * Platformos operatorius gali gauti komisinį mokestį (jei taikoma).
 
#### Galimi scenarijai maisto pristatymo verslo modelyje
Kartais atsitinka taip, kad pristatymo procesas susiduria su iššūkiais ar situacijomis, reikalaujančiomis automatizuoto sprendimo. Išmanioji sutartis padeda užtikrinti sąžiningumą ir skaidrumą visose situacijose, kad verslo modelis veiktų nepriekaištingai. Todėl verta apžvelgti keletą pavyzdžių, kurie gali pasitaikyti gyvenime.
- **1. Kurjeris negali pristatyti užsakymo**. Kurjeris praneša, kad užsakymo pristatyti nepavyko (pavyzdžiui, pirkėjas neatsiliepia, pateiktas netikslus adresas ar kitos aplinkybės). Tokiu atveju, lėšos gali būti dalinai grąžinamos pirkėjui, atskaičiuojant pardavėjo patirtas išlaidas už maisto paruošimą ir kurjerio išlaidas už kurą. Šis scenarijus užtikrina sąžiningą pinigų paskirstymą tarp dalyvių.
- **2. Ginčo sprendimas dėl užsakymo kokybės**. Pirkėjas inicijuoja ginčą, teigdamas, kad užsakymas neatitiko lūkesčių (pavyzdžiui, neteisingas patiekalas, sugadintas ar trūko prekių). Išspręsti problemą galima tokiu būdu: laikinai sulaikyti lėšas ir leisti šalims pateikti įrodymus (pavyzdžiui, pirkėjo pateiktas nuotraukas ar kurjerio pristatymo detales). Pagal nustatytas sąlygas ginčas automatiškai sprendžiamas (pavyzdžiui, grąžinama dalis lėšų pirkėjui, o likusi suma paskirstoma pardavėjui ir kurjeriui). Toks scenarijus padeda užtikrinti skaidrumą ir pasitikėjimą tarp visų šalių.

### 2. Maisto pristatymo modelo su išmaniąja sutartimi realizavimas Solidyti kalboje
### 3. Išmaniosios sutarties veikimo ištestavimas Ethereum lokaliame ir testiniame tinkluose
### 4. Naudojant Ethereum testinio tinklo Etherscan peržiūrimi išmaniosios sutarties vykdymo "logai"
### 5. Decentralizuotos aplikacijos Front-End'as, kuris įgalina bendravimą su išmaniąja sutartimi
