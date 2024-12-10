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
### 1. Žaislų parduotuvės modelis su išmaniąja sutartimi

Ši žaislų parduotuvės veiklos logika remiasi decentralizuotų aplikacijų (dApps) principais, užtikrinančiais skaidrumą ir saugumą naudojant Ethereum blockchain technologiją. Veikla vykdoma išmaniosios sutarties pagalba, kuri valdo prekių pardavimo, mokėjimų ir pristatymo procesus.

#### Dalyvaujančios šalys:
- **Parduotuvės savininkas**: Atsakingas už žaislų pridėjimą į parduotuvę, valdo prekes sandėlyje, priima užsakymus ir vykdo žaislų siuntimus, gauna pajamas.
- **Pirkėjas**: Pasirenka norimą žaislą, jų kiekį, atlieka mokėjimą, patvirtina, kad prekės pristatytos.
- **Išmanioji sutartis**: Užtikrina dviejų šalių bendradarbiavimą, priima ir laiko iš pirkėjo lėšas tol, kol prekės bus pristatytos.

#### Numatomi procesai
- **Žaislų pridėjimas**. Parduotuvės savininkas gali pridėti naujus žaislus, kurie turės skirtingus pavadinimus, kainas ir kiekius. Kiekvienam žaislui numatomas unikalus identifikatorius.
- **Užsakymo procesas**. Pirkėjas gali pasirinkti norimą žaislą iš parduotuvės ir pateikti užsakymą: kokio žaislo nori ir kiek. Tada perveda reikiamą sumą (žaislo kaina * kiekis).
- **Užsakymo apdorojimas**. Sutartis tikrina ar sandėlyje yra tokių žaislų ir ar užtenka jų kiekio. Užregistruoja užsakymą, kad jis apmokėtas ir sumažina prekių sandėlio likutį.
- **Užsakymo pristatymas**. Parduotuvės savininkas išsiunčia žaislą.
- **Pristatymo patvirtinimas**. Pirkėjas patvirtina, kad užsakymą gavo.
- **Lėsų išsiėmimas**. Savininkas gauna lėšas už sėkmingai įvykdytą pardavimą.

### 2. Žaislų parduotuvės modelio su išmaniąja sutartimi realizavimas Solidyti kalboje
Kodą galima pažiūrėti "ToyShop.sol". Toliau bus aprašoma kodo logika.
#### Parašyto kodo veikimo logika
* Žaislo pridėjimas į sandėlį (addToy): savininkas įveda informaciją apie žaislo pavadinimą, kainą ir kiekį sandėlyje. Pavyzdys:
    
        Pavadinimas: "Teddy Bear".
        Kaina: 1 ETH (1000000000000000000 Wei).
        Kiekis: 10.

* Užsakymo kurimas (createOrder): pirkėjas, norėdamas užsakyti žaislą, įveda to žaislo unikalųjį kodą ir kiekį. Tada mato kiek turi sumokėti. Sutartis patikrina, ar yra pakankamai tokių žaislų ir, ar suma atitinka užsakymo kainą. Pavyzdys:

        Žaislo ID: 1 ("Teddy Bear").
        Kiekis: 2.
        Mokėjimas: 0.01 ETH.

* Užsakymo išsiuntimas (shipOrder): savininkas išsinčia pirkėjui jo norimą žaislą. Savininkas įveda unikalųjį kodą, kad identifikuoti žaislą. Sutartis tikrina, ar prekė apmokėta. Jei taip, procesas tęsiasi toliau. Pavyzdys:

        Užsakymo ID: 1.
        Užsakymas pažymimas kaip „Shipped“.

* Pristatymo patvirtinimas (deliverOrder): pirkėjas pateikia žaislo ID ir pažymi, kad pristatymas įvykdytas sėkmingai. Sutartis tikrina, ar funkciją iškviečia tas pats pirkėjas, kuris pateikė užsakymą. Jei taip, užsakymo būsena tampa "Delivered". Pavyzdys:

        Užsakymo ID: 1.
        Mokėjimas: 0.01 ETH (pervedama parduotuvės savininkui).

* Lėšų išsiėmimas (withdrawFunds): funkcija naudojama savininko, kuris gauna mokėjimą. Pervedama suma lygi sutarties balanse esaniam ETH kiekiui. Pavyzdys:

        Sutarties balansas: 0.03 ETH.
        Iškvietus funkciją, visi pinigai pervedami savininkui.

* Užsakymų aprašymai (orders): tai duomenų struktūra, skirta sekti visus užsakymus, kurie pateikiami parduotuvėje. Pavyzdys:

        orders[1] = Order(
            buyer: 0x1234...abcd,    // Pirkėjo adresas
            toyId: 2,                // Žaislo ID
            quantity: 3,             // Kiekis
            totalPrice: 0.03 ETH,    // Suma
            status: OrderStatus.Paid // Būsena
        );

* Balanso patikrinimas (getBalance): šią funkciją gali vykdyti tiek pardavėjas, tiek pirkėjas. Funkcija grąžina dabartinį sutarties ETH balansą.

* Sutarties savininko adresas (owner): kintamasis saugo Ethereum adresą, kuris yra sutarties savininkas.

* Žaislų skaitiklis (toyCount): kintamasis seka, kiek žaislų buvo pridėta.

* Užsakymų skaitiklis (orderCount): kintamasis seka, kiek buvo pateikta užsakymų.

### 3. Išmaniosios sutarties veikimo ištestavimas Ethereum lokaliame ir testiniame tinkluose
### 4. Naudojant Ethereum testinio tinklo Etherscan peržiūrimi išmaniosios sutarties vykdymo "logai"
### 5. Decentralizuotos aplikacijos Front-End'as, kuris įgalina bendravimą su išmaniąja sutartimi
