const m_jmena = [
  "Jiří", "Jan", "Petr", "Josef", "Pavel",
  "Martin", "Tomáš", "Jaroslav", "Miroslav", "Zdeněk",
  "Václav", "Michal", "František", "Jakub", 
  "Karel", "Lukáš", "David", "Vladimír", "Ondřej",
  "Ladislav", "Roman", "Marek", "Stanislav", "Daniel",
  "Radek", "Antonín", "Vojtěch", "Filip", "Adam",
  "Matěj", "Dominik", "Aleš", "Miloslav",
  "Jaromír", "Patrik", "Libor", "Jindřich", "Vlastimil",
  "Miloš", "Lubomír", "Štěpán", "Oldřich", "Rudolf",
  "Ivan", "Robert", "Luboš", "Radim",
  "Richard", "Bohumil", "Šimon", "Rostislav",
  "Ivo", "Luděk", "Dušan", "Kamil", "Michael",
  "Vladislav", "Zbyněk", "Viktor", "Bohuslav", "Kryštof",
  "Alois", "Vítězslav", "Tadeáš", "Štefan", "Eduard",
  "Marcel", "Dalibor", "Emil", "Radomír",
  "Ludvík", "Denis", "Vilém", "Alexandr",
  "Otakar", "Mikuláš", "Radovan", "Leoš", "Robin",
  "Bedřich", "Erik", "Vratislav", 
  "Přemysl", "Jonáš", "Hynek", "Jáchym", 
  "Bohumír", "Igor", "Arnošt", "Svatopluk"
];


const z_jmena = ["Jana", "Marie", "Eva", "Hana", "Anna", "Lenka", 
"Kateřina", "Lucie", "Věra", "Alena", "Petra", "Veronika", "Jaroslava", 
"Tereza", "Martina", "Michaela", "Jitka", "Helena", "Ludmila", "Zdeňka", 
"Ivana", "Monika", "Eliška", "Zuzana", "Markéta", "Jarmila", "Barbora", 
"Jiřina", "Marcela", "Kristýna", "Dana", "Dagmar", "Adéla", "Pavla", 
"Vlasta", "Miroslava", "Andrea", "Irena", "Božena", "Klára", "Libuše", 
"Marta", "Šárka", "Nikola", "Karolína", "Iveta", "Pavlína", "Olga", "Blanka", 
"Gabriela", "Aneta", "Simona", "Růžena", "Radka", "Daniela", "Denisa", "Iva", 
"Milada", "Milena", "Romana", "Miloslava", "Miluše", "Ilona", "Anežka", 
"Soňa", "Kamila", "Stanislava", "Nela", "Květoslava", 
"Renáta", "Vendula", "Drahomíra", "Julie", "Jindřiška", "Emilie", 
"Viktorie", "Alžběta", "Sára", "Štěpánka", "Dominika", "Sabina", "Sofie", "Alice", 
"Magdaléna", "Žaneta", "Linda", "Alexandra", "Silvie", "Terezie", "Patricie", "Mariana"
];

const prijmeni = [
["Novák", "Nováková"], 
["Svoboda", "Svobodová"], 
["Novotný", "Novotná"], 
["Dvořák", "Dvořáková"], 
["Černý", "Černá"], 
["Procházka", "Procházková"], 
["Kučera", "Kučerová"], 
["Veselý", "Veselá"],
 ["Horák", "Horáková"], 
 ["Mareš", "Marešová"], 
 ["Pokorný", "Pokorná"], 
 ["Král", "Králová"], 
 ["Růžička", "Růžičková"], 
 ["Zima", "Zimová"], 
 ["Kopecký", "Kopecká"], 
 ["Konečný", "Konečná"], 
 ["Malý", "Malá"], 
 ["Holý", "Holá"], 
 ["Čermák", "Čermáková"], 
 ["Němec", "Němcová"], 
 ["Doležal", "Doležalová"], 
 ["Fiala", "Fialová"], 
 ["Vlček", "Vlčková"], 
 ["Pospíšil", "Pospíšilová"], 
 ["Bureš", "Burešová"], 
 ["Bartoš", "Bartošová"], 
 ["Havel", "Havlová"], 
 ["Hájek", "Hájková"], 
 ["Pelikán", "Pelikánová"], 
 ["Říha", "Říhová"], 
 ["Polák", "Poláková"], 
 ["Vávra", "Vávrová"], 
 ["Mach", "Machová"], 
 ["Chalupa", "Chalupová"], 
 ["Gregor", "Gregorová"], 
 ["Hora", "Horová"], 
 ["Šíma", "Šímová"], 
 ["Bláha", "Bláhová"], 
 ["Tichý", "Tichá"], 
 ["Šťastný", "Šťastná"], 
 ["Lang", "Langová"], 
 ["Musil", "Musilová"], 
 ["Ševčík", "Ševčíková"], 
 ["Jirásek", "Jirásková"], 
 ["Uhlíř", "Uhlířová"], 
 ["Kouřil", "Kouřilová"], 
 ["Beneš", "Benešová"], 
 ["Jelínek", "Jelínková"], 
 ["Nečas", "Nečasová"], 
 ["Kříž", "Křížová"],    
 ["Štěpánek", "Štěpánková"], 
 ["Navrátil", "Navrátilová"], 
 ["Plachý", "Plachá"], 
 ["Klimeš", "Klimešová"], 
 ["Toman", "Tomanová"], 
 ["Šimek", "Šimková"], 
 ["Dostál", "Dostálová"], 
 ["Špaček", "Špačková"], 
 ["Málek", "Málková"], 
 ["Beránek", "Beránková"], 
 ["Janoušek", "Janoušková"], 
 ["Pešek", "Pešková"], 
 ["Kubíček", "Kubíčková"], 
 ["Šubrt", "Šubrtová"], 
 ["Čížek", "Čížková"], 
 ["Kocourek", "Kocourková"], 
 ["Pánek", "Pánková"], 
 ["Šulc", "Šulcová"], 
 ["Melichar", "Melicharová"], 
 ["Ludvík", "Ludvíková"], 
 ["Sýkora", "Sýkorová"], 
 ["Kolář", "Kolářová"],
 ["Kuchař", "Kuchařová"], 
 ["Kratochvíl", "Kratochvílová"], 
 ["Kraus", "Krausová"], 
 ["Přibyl", "Přibylová"], 
 ["Kubeš", "Kubešová"], 
 ["Křenek", "Křenková"], 
 ["Matějka", "Matějková"], 
 ["Sedláček", "Sedláčková"], 
 ["Šípek", "Šípková"], 
 ["Škoda", "Škodová"], 
 ["Kovář", "Kovářová"], 
 ["Švec", "Švecová"],
 ["Farkaš", "Farkašová"], 
 ["Vacek", "Vacková"], 
 ["Slavík", "Slavíková"], 
 ["Wolf", "Wolfová"], 
 ["Turek", "Turková"], 
 ["Šálek", "Šálková"], 
 ["Petřík", "Petříková"], 
 ["Fišer", "Fišerová"],
 ["Škopek", "Škopková"], 
 ["Přikryl", "Přikrylová"], 
 ["Zatloukal", "Zatloukalová"], 
 ["Kroupa", "Kroupová"],
 ["Křížek", "Křížková"], 
 ["Krejčíř", "Krejčířová"], 
 ["Koutný", "Koutná"], 
 ["Hrubý", "Hrubá"], 
 ["Šimůnek", "Šimůnková"], 
 ["Šolc", "Šolcová"], 
 ["Fojtík", "Fojtíková"], 
 ["Rozsypal", "Rozsypalová"],
 ["Zelenka", "Zelenková"],
 ["Horský", "Horská"],
 ["Peroutka", "Peroutková"],
 ["Bittner", "Bittnerová"],
 ["Sekanina", "Sekaninová"],
 ["Hrdlička", "Hrdličková"],
 ["Brychta", "Brychtová"],
 ["Janda", "Jandová"],
 ["Kuběna", "Kuběnová"],
 ["Pecka", "Pecková"],
 ["Skalka", "Skalková"],
 ["Bauer", "Bauerová"],
 ["Janeček", "Janečková"],
 ["Krejčí", "Krejčí"],
 ["Kincl", "Kinclová"],
 ["Richtr", "Richtrová"],
 ["Jiroušek", "Jiroušková"],
 ["Trojan", "Trojanová"],
 ["Březina", "Březinová"],
 ["Roubíček", "Roubíčková"],
 ["Kadeřábek", "Kadeřábková"],
 ["Paleček", "Palečková"],
 ["Komínek", "Komínková"],
 ["Vágner", "Vágnerová"],
 ["Vejvoda", "Vejvodová"],
 ["Skopal", "Skopalová"],
 ["Pecháček", "Pecháčková"],
 ["Jakeš", "Jakešová"],
 ["Forman", "Formanová"],
 ["Hruška", "Hrušková"],
 ["Faltýnek", "Faltýnková"],
 ["Staněk", "Staňková"]
]


const osoby = [];

const byty = [{"id":82,"habitability":"cx"},{"id":84,"habitability":"cx"},{"id":92,"habitability":"cxx"},{"id":93,"habitability":"c"},{"id":105,"habitability":"cxx"},{"id":106,"habitability":"cxx"},{"id":133,"habitability":"cx"},{"id":134,"habitability":"c"},{"id":135,"habitability":"cc"},{"id":211,"habitability":"cx"},{"id":212,"habitability":"cx"},{"id":213,"habitability":"cx"},{"id":214,"habitability":"cx"},{"id":236,"habitability":"cxxxx"},{"id":237,"habitability":"cxxx"},{"id":261,"habitability":"cx"},{"id":262,"habitability":"cxx"},{"id":279,"habitability":"cx"},{"id":280,"habitability":"cxx"},{"id":294,"habitability":"cx"},{"id":301,"habitability":"cx"},{"id":302,"habitability":"cxx"},{"id":303,"habitability":"cx"},{"id":326,"habitability":"x"},{"id":327,"habitability":"cx"},{"id":329,"habitability":"cx"},{"id":347,"habitability":"cx"},{"id":348,"habitability":"c"},{"id":349,"habitability":"cx"},{"id":350,"habitability":"cx"},{"id":373,"habitability":"cxxx"},{"id":374,"habitability":"cx"},{"id":386,"habitability":"cxx"},{"id":387,"habitability":"cc"},{"id":388,"habitability":"cx"},{"id":389,"habitability":"cxx"},{"id":439,"habitability":"cxx"},{"id":440,"habitability":"cxx"},{"id":455,"habitability":"cxxxx"},{"id":456,"habitability":"cxxx"},{"id":477,"habitability":"cx"},{"id":478,"habitability":"cx"},{"id":494,"habitability":"cx"},{"id":495,"habitability":"cx"},{"id":496,"habitability":"cx"},{"id":516,"habitability":"cx"},{"id":517,"habitability":"cx"},{"id":534,"habitability":"cx"},{"id":535,"habitability":"cx"},{"id":550,"habitability":"cx"},{"id":551,"habitability":"cx"},{"id":568,"habitability":"cx"},{"id":569,"habitability":"cx"},{"id":570,"habitability":"c"},{"id":571,"habitability":"xx"},{"id":592,"habitability":"cxxx"},{"id":593,"habitability":"cxx"},{"id":613,"habitability":"cx"},{"id":614,"habitability":"cx"},{"id":629,"habitability":"cx"},{"id":630,"habitability":"cx"},{"id":646,"habitability":"cxx"},{"id":657,"habitability":"cx"},{"id":658,"habitability":"cxx"},{"id":659,"habitability":"cx"},{"id":660,"habitability":"cx"},{"id":661,"habitability":"cxx"},{"id":662,"habitability":"cx"},{"id":701,"habitability":"cx"},{"id":725,"habitability":"cxx"},{"id":726,"habitability":"cx"},{"id":762,"habitability":"cx"},{"id":763,"habitability":"cx"},{"id":764,"habitability":"cx"},{"id":765,"habitability":"cx"},{"id":770,"habitability":"cx"},{"id":771,"habitability":"cx"},{"id":772,"habitability":"cx"},{"id":773,"habitability":"cx"},{"id":774,"habitability":"cx"},{"id":775,"habitability":"cx"},{"id":776,"habitability":"cx"},{"id":777,"habitability":"cx"},{"id":778,"habitability":"cx"},{"id":779,"habitability":"cx"},{"id":780,"habitability":"cx"},{"id":781,"habitability":"cx"},{"id":782,"habitability":"cx"},{"id":784,"habitability":"cx"},{"id":785,"habitability":"cx"},{"id":786,"habitability":"cx"},{"id":787,"habitability":"cx"},{"id":788,"habitability":"cx"},{"id":789,"habitability":"cx"},{"id":790,"habitability":"cx"},{"id":791,"habitability":"cx"},{"id":792,"habitability":"cx"},{"id":793,"habitability":"cx"},{"id":794,"habitability":"cx"},{"id":795,"habitability":"cx"},{"id":796,"habitability":"cx"},{"id":797,"habitability":"cx"},{"id":798,"habitability":"cx"},{"id":799,"habitability":"cx"},{"id":800,"habitability":"cx"},{"id":801,"habitability":"cx"},{"id":802,"habitability":"cx"},{"id":803,"habitability":"cx"},{"id":804,"habitability":"cx"},{"id":805,"habitability":"cx"},{"id":806,"habitability":"cx"},{"id":807,"habitability":"cx"},{"id":808,"habitability":"cx"},{"id":809,"habitability":"cx"},{"id":810,"habitability":"cx"},{"id":811,"habitability":"cx"},{"id":812,"habitability":"cx"},{"id":813,"habitability":"cx"},{"id":814,"habitability":"cx"},{"id":815,"habitability":"cx"},{"id":816,"habitability":"cx"},{"id":820,"habitability":"cx"},{"id":821,"habitability":"cx"},{"id":822,"habitability":"cx"},{"id":823,"habitability":"cx"},{"id":824,"habitability":"cx"},{"id":825,"habitability":"cx"},{"id":826,"habitability":"cx"},{"id":827,"habitability":"cx"},{"id":829,"habitability":"cx"},{"id":830,"habitability":"cx"},{"id":831,"habitability":"cx"},{"id":832,"habitability":"cx"},{"id":833,"habitability":"cx"}]


function generatePeople(location_id, habitability) {  
let indexPrijmeni = Math.floor(Math.random() * prijmeni.length);
habitability = habitability.split("c").join("mf")
for (let i = 0; i < habitability.length; i++) {
  let pohlavi = null;    
  if (habitability[i] == "m") {
    pohlavi = "m";
  } else if (habitability[i] == "f") {
    pohlavi = "f";
  } else {
    pohlavi = Math.floor(Math.random() * 2) == 0 ? "m" : "f";
  }
  let krestniJmeno = pohlavi == "m" ? m_jmena[Math.floor(Math.random() * m_jmena.length)] : z_jmena[Math.floor(Math.random() * z_jmena.length)];
  let prijmeniOsoby = pohlavi == "m" ? prijmeni[indexPrijmeni][0] : prijmeni[indexPrijmeni][1];
  osoby.push({ "location_id": location_id, "jmeno": krestniJmeno, "prijmeni": prijmeniOsoby, pohlavi });
}
prijmeni.splice(indexPrijmeni, 1)
}

/*for (const byt of byty) {
  generatePeople(byt.id, byt.habitability)
}*/

generatePeople(1, "c")
console.log(osoby)

/*for (const osoba of osoby) {
  console.log(`INSERT INTO persons (project_id, firstname, lastname, location_id, gender, description) 
    values (1, "${osoba.jmeno}", "${osoba.prijmeni}", ${osoba.location_id}, "${osoba.pohlavi}", "");`)
}*/