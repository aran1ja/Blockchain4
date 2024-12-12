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
## 1. Žaislų parduotuvės modelis su išmaniąja sutartimi

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

## 2. Žaislų parduotuvės modelio su išmaniąja sutartimi realizavimas Solidyti kalboje
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

## 3. Išmaniosios sutarties veikimo ištestavimas Ethereum lokaliame ir testiniame tinkluose
#### Lokalusis tinklas Ganache
---
Parašytą kodą REMIX IDE reikėjo sukompiluoti. Tai galima padaryti skyriuje "Solidity Compiler", išrenkant tinkamą compailer'io versiją ir spaudžiant "Compile ToyShop.sol":

![image](https://github.com/user-attachments/assets/45425a22-fadb-4c1c-bc36-2b2432fde59c)

Tada pasirinkti "Deploy & Run Transactions". Reikia teisingai nurodyti Environment, išrinkau "Custom - External Http Provider" ir pasirinkau siulomą tinklą, tik pakeičiau port'ą į 7545 pagal Ganache nustatymus:

![image](https://github.com/user-attachments/assets/2ebab0ae-de41-42f3-bafe-e4bba77e3d05)

Tada reikia pasirinkti Account iš kurio bus siunčiami arba priimami ETH coins. Value palikau 0, pasirinkau savo sukurtą kontraktą ir paspaudžiau "Deploy".

![image](https://github.com/user-attachments/assets/f5bf1d82-7896-4fed-8474-2d236cddba11)

Galima pastebėti, kad Accont balansas iš kart susimažino. Taip vyksta dėl transakcijos mokėsčio. 

![image](https://github.com/user-attachments/assets/848473eb-f8f8-4341-aefe-f5dcd576bf94)

Po "Deploy" paspaudimo terminale atsirado pranešimas: 

![image](https://github.com/user-attachments/assets/b0a098d4-82da-482a-bd99-bb872e7b6e26)

O Ganache atsirado tai:

![image](https://github.com/user-attachments/assets/339f0655-5b55-4c71-a40b-68fe639c1481)
![image](https://github.com/user-attachments/assets/65065d77-2fd8-4664-842a-61d35ded80e6)

Vykdant testus, atsirasdavo vis nauji blokai:

![image](https://github.com/user-attachments/assets/3a42d5da-f9cb-48eb-84a8-e60a52b2060b)

Buvo testai, kur buvo mygtukai "Call" ir "Transact".

![image](https://github.com/user-attachments/assets/b2407eb8-dfcb-4d4d-90af-a190be55ee85)
![image](https://github.com/user-attachments/assets/ea6df9a0-11de-476c-9e10-1ef71c82abd9)

Call naudojami tik norint gauti informaciją iš išmaniosios sutarties.

Transact naudojamas rašymo operacijoms, kurios keiia blockchain būseną, operacijos registruojamos kaip transakcijos.

Paspaudus funkciją createOrder, iš pirkėjo Account buvo nuskaityti lėšai (~3 ETH). Tačiau vėliau, kai žaislas bus pristatytas, parduotuvės savininkas gali paspausti funkciją "withdrawFunds".

![image](https://github.com/user-attachments/assets/f71e2e6e-ea32-454e-b05c-8e03e0126071)

Tada pardavėjas gaus apmokėjimą už prekę, šiuo atveju, ~3 ETH.

![image](https://github.com/user-attachments/assets/3aa0f359-e2a3-4995-addc-a8c60ed3e789)

Transakcijos įvykdytos sėkmingai.

#### Testinis tinklas Sepolia
---
Tam, kad galima būtų vykdyti transakcijas, reikia gauti SepholiaETH. Yra svetainės, kur juos galima gauti nemokamai, tačiau galima gauti tik 1 kartą per dieną, arba būtinai reikia, kad būtų ETH Mainnet'e ir kiekis, kuris yra duodamas, yra labai nedidelis. 

![image](https://github.com/user-attachments/assets/dd21d1bf-97a6-4fc4-8bbf-3a9058b36492)

Radau Ethereum Sepolia Faucet, kuriam nereikėjo ETH Mainnet'e, tik Account'o adreso. 

![image](https://github.com/user-attachments/assets/1a9d26ab-a2fc-4cb8-b89f-4d38e21cff58)
![image](https://github.com/user-attachments/assets/0766560e-4861-4b88-afb7-810c4218f7bb)

Keletą kartų gavau po 0.05 SepholiaETH. "Deploy & Run Transactions" padariau tokiu nustatymus:

![image](https://github.com/user-attachments/assets/de252d2e-c303-4590-8bdf-4bda41dc924f)

Paspaudžiau "Deploy" ir terminale gavau pranešimą:

![image](https://github.com/user-attachments/assets/1eb7cfdd-6395-4c9c-a60a-d389e75728b9)

![image](https://github.com/user-attachments/assets/dea04281-8bc5-4501-9e7c-6156cb24815b)

Nuotraukoje galima pastebėti "view on etherscan", kurį paspaudus, atsirado nuruoda su "logais", reikalingais 4 užduočiai atlikti.

Pradinis pirkėjo ir pardavėjo piniginės dydis SepoliaETH:

Pirkėjo: ![image](https://github.com/user-attachments/assets/cf958de8-2f95-43c5-a2f5-a4051031a956)

Pardavėjo: ![image](https://github.com/user-attachments/assets/1ef0a6a3-03aa-4f7e-b09b-c27f1ef1d4e3)

Vykdant kiekvieną transakciją, reikia patvirtinti ją MetaMask'e. Pavyzdžiui, įvedant žaislų pavadinimą, kainą ir kiekį, pardavėjas privalo sumokėti mokėstį:

![image](https://github.com/user-attachments/assets/2077298c-0afb-499c-824d-281e27a710c9)

Pirkėjas, norėdamas įsigyti prekę, turi pervesti pinigus (0.04 ETH, nes buvo nupirktos 2 prekės po 0.02 ETH):

![image](https://github.com/user-attachments/assets/17ed9caf-d3b8-4dd4-a823-4aedb40c3a2f)

Tam, kad pardavėjas galėtų gauti pinigus, pirkėjas turi patvirtinti pristatymą:

![image](https://github.com/user-attachments/assets/d607a32b-d0ee-4279-a60e-a6938cdcfd68)

Tada pardavėjas gauna pinigų:

![image](https://github.com/user-attachments/assets/75767973-2628-474e-9133-7d67613e3f84)

Atnaujintos pardavėjo ir pirkėjo piniginės:

Pardavėjo: ![image](https://github.com/user-attachments/assets/c7bb0d7c-6a41-4739-959b-101fc95eaa35)

Pirkėjo: ![image](https://github.com/user-attachments/assets/be568885-7137-4b35-abe2-6d051197f233)


Apibendrintas galutinis rezultatas:

| Vartotojas | Pirminis ETH kiekis | Galutinis ETH kiekis |
|------------|---------------------|----------------------|
| Pardavėjas | 0.0439              | 0.0773               |
| Pirkėjas   | 0.0706              | 0.0297               |

Teoriškai, pardavėjo galutinis ETH kiekis turėtų būti 0.0839, o pirkėjo 0.0306. Tačiau svarbu nepamiršti apie **transakcijų mokėstis**.

## 4. Naudojant Ethereum testinio tinklo Etherscan peržiūrimi išmaniosios sutarties vykdymo "logai"
Spaudžiant pažymėta tekstą ![image](https://github.com/user-attachments/assets/bd984866-46b9-4507-89e4-d0c326706895), atsidaro sveitainė, kurios nuoroda: https://sepolia.etherscan.io/tx/.

Testai prasidėjo tuo, kad savininkas įveda kokie yra žaislai, kiek jų ir kiek kainuoja. Tai buvo pati pirmiausia transakcija.

![image](https://github.com/user-attachments/assets/0eda955a-60b3-4543-a695-44cd73ffba16)

Parvedimas:

![image](https://github.com/user-attachments/assets/9a63b31b-51ce-40a8-8c06-6351f1a50258)

Nuotraukoje matosi, kad dviejų Account'ų adresai. Vienas kitam išsiųntė 0.01 ETH, matome transakcijos mokėstį, kuro kainą. Svarbu pažymėti, kad transakcijos būsena yra "Success".

![image](https://github.com/user-attachments/assets/815c7b3f-3fcb-4419-aceb-54f48b237e51)


## 5. Decentralizuotos aplikacijos Front-End'as, kuris įgalina bendravimą su išmaniąja sutartimi
Tam, kad sukurti deentralizuotos aplikacijos Front-End'ą, dariau tokius žingsnius, kurie bus nurodyti po apačią.
1. Įjungiau terminalą.
2. Įvedžiau kodą "npm install web3".

![image](https://github.com/user-attachments/assets/f9d39a16-6b38-47d0-88ea-6ce745f5308c)

3. Atidariau VSCode ir sukuriau ten aplankalą Frontend-dapp, kur įdėjau 4 failus.

![image](https://github.com/user-attachments/assets/ce924974-d53a-4840-9fce-a1446aaa1900)

4. Terminale parašiau "npm install -g lite-server"

![image](https://github.com/user-attachments/assets/34acc47c-3f24-4072-97d1-12128e02b9f1)

5. Nurodžiau kelią iki mano projekto aplankalo.

![image](https://github.com/user-attachments/assets/14790633-f1f7-4fbd-9421-f4c39e186500)

6. Įvedžiau kodą lite-server.

![image](https://github.com/user-attachments/assets/bada168b-472a-4c53-bef0-fa14d5b98238)

7. Atsidarė toks puslapis, kuriame galima prijungti MetaMask:

![image](https://github.com/user-attachments/assets/c8824479-deb5-4d8f-b99c-108221ce6523)

![image](https://github.com/user-attachments/assets/cc7880f1-c012-4ee3-8faa-52b103c96ee3)

8. Turime Account, kurio pradinis balansas yra 100 ETH.

![image](https://github.com/user-attachments/assets/0b866988-55d1-41cd-bb5d-84735f85732c)

9. Prisijungiame prie aplikacijos.

![image](https://github.com/user-attachments/assets/0328d664-7362-4401-a8de-54a8ea8408aa)

10. Prisijungiame prie MetaMask ir programa pamatys koks adresas nustatytas.

![image](https://github.com/user-attachments/assets/e9857d4b-2111-4b0d-8ef5-68aa56dce93c)

11. Atsiranda testinė prekė, kurią galima nupirkti, įvedant norimos prekės kiekį.

![image](https://github.com/user-attachments/assets/408df5f6-fa51-48e6-852f-d41517beb956)

12. Spaudžiame "Buy". Transakciją reikėtų patvirtinti MetaMask'e, tačiau šiuo metu man neveikia programa.

![image](https://github.com/user-attachments/assets/14ab4a26-9ae4-4e9a-b05f-d01c1dd5c2ac)
