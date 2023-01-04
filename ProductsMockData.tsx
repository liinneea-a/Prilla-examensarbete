import { addDoc, deleteDoc } from "firebase/firestore";
import { addNewDoc, getAllDocsInCollection } from "./helper";
import { Product } from "./Interfaces";

export const seed = () => {
  //   const brands = [
  //     {
  //       name: "Loop",
  //       picture: "",
  //     },
  //   ];

  //   const products: Product[] = [
  //     {
  //       brand: "Loop",
  //       description:
  //         "Som alla LOOP-produkter har LOOP Jalapeño Lime Strong en fräsch och angenäm smak som varar länge. Produkten kommer i ett diskret slim-format och ger en fuktig upplevelse utan någon rinnighet.",
  //       flavor: ["Citrus"],
  //       format: "Slim",
  //       manufacturer: "Another Snus Factory",
  //       name: "Jalapeno Lime",
  //       nicotine: 15,
  //       photo:
  //         "https://media.haypp.com/haypp/images/productgroups-sv-se-102102-g-2022-07-26-113933927/255/255/1/loop-jalapeno-lime.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 15,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Loop",
  //       description:
  //         "LOOP Red Chili Melon Strong är helt tobaksfri och är istället tillverkad med en bas av växtfiber. Därefter blir smakämnen och nikotin tillsatt. Prillan är fuktig på utsidan men torr inuti för en smak- och nikotinupplevelse som håller under en längre tid. Nikotinpåsen kommer även i ett slimmat format för en diskret passform under läppen.",
  //       flavor: ["Citrus"],
  //       format: "Slim",
  //       manufacturer: "Another Snus Factory",
  //       name: "Red Chili Melon",
  //       nicotine: 15,
  //       photo:
  //         "https://media.haypp.com/haypp/images/productgroups-sv-se-303034-g-2022-10-19-072022394/355/355/0/loop-red-chili-melon-strong.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 15,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Loop",
  //       description:
  //         "LOOP Cassis Bliss Strong tillverkas av det svenska företaget Another Snus Factory som ligger i Stockholm. Förutom Cassis Bliss Strong finns det en lång rad andra smaker på nikotinpåsar från företaget. Another Snus Factory satsar på att ta fram nyskapande smaker och inte sällan har produkterna oväntade kombinationer av flera olika smaker eller ingredienser.",
  //       flavor: ["Bär"],
  //       format: "Slim",
  //       manufacturer: "Another Snus Factory",
  //       name: "Cassis Bliss",
  //       nicotine: 15,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/303154-g-2022-12-23-094110122/555/555/2/loop-cassis-bliss-strong.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 15,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Loop",
  //       description:
  //         "Loop Mango Tango har en het och söt-syrlig smak av mango, lime och chili som ger en dansande sommarkänsla under läppen. Portionerna kommer i nikotinhalten 15 mg nikotin/g som ger en snabb och kraftig nikotinleverans genom InstantRushTM-teknologin. LOOP kommer i ett diskret slim-format och ger en fuktig upplevelse utan något rinn.",
  //       flavor: ["Mango"],
  //       format: "Slim",
  //       manufacturer: "Another Snus Factory",
  //       name: "Mango Tango",
  //       nicotine: 15,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302544-g-2022-04-22-094035151/555/555/2/loop-mango-tango-slim-strong-all-white-portion.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 15,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Loop",
  //       description:
  //         "Som alla LOOP-produkter har den en mjuk och angenäm smak som varar länge. MintMania Strong är en stark prilla med 15 mg nikotin/g som ger en snabb och kraftig nikotinleverans genom InstantRushTM-teknologin. LOOP kommer i ett diskret slim-format och ger en fuktig upplevelse utan något rinn.",
  //       flavor: ["Mint"],
  //       format: "Slim",
  //       manufacturer: "Another Snus Factory",
  //       name: "Mint Mania",
  //       nicotine: 15,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302215-g-2022-04-22-094827326/555/555/2/loop-mint-mania-strong-all-white.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 15,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Loop",
  //       description:
  //         "Som alla LOOP-produkter har den en mjuk och angenäm smak som varar länge. Salty Ludicris Strong har en Stark nikotinstyrka med 15 mg nikotin/g och har ett balanserat sting för att göra upplevelsen under läppen behaglig. LOOP kommer i ett diskret slim-format och ger en fuktig upplevelse utan något rinn.",
  //       flavor: ["Lakrits"],
  //       format: "Slim",
  //       manufacturer: "Another Snus Factory",
  //       name: "Salty Ludascris",
  //       nicotine: 15,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302370-g-2022-04-22-095413746/555/555/2/loop-salty-ludicris-strong-all-white-portion.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 15,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Loop",
  //       description:
  //         "Som alla LOOP-produkter har den en mjuk och angenäm smak som varar länge. Mint Mania Extra Strong är en extra stark prilla med 20 mg nikotin/g som ger en snabb och kraftig nikotinleverans genom InstantRushTM-teknologin. LOOP kommer i ett diskret slim-format och ger en fuktig upplevelse utan något rinn.",
  //       flavor: ["Mint"],
  //       format: "Slim",
  //       manufacturer: "Another Snus Factory",
  //       name: "Mint Mania",
  //       nicotine: 20,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302298-g-2022-04-22-094957669/555/555/2/loop-mint-mania-extra-strong-all-white.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 4,
  //       tags: [],
  //       type: "Extra Strong",
  //       weight: 15,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Loop",
  //       description:
  //         "Loop Habanero Mint har som namnet antyder en het smak av chilifrukten habanero varvat med en fräsch smak av mint.Portionerna kommer i nikotinhalten 20 mg nikotin/g som ger en snabb och kraftig nikotinleverans genom InstantRushTM-teknologin. LOOP kommer i ett diskret slim-format och ger en fuktig upplevelse utan något rinn.",
  //       flavor: ["Mint", "Habanero"],
  //       format: "Slim",
  //       manufacturer: "Another Snus Factory",
  //       name: "Habanero Mint",
  //       nicotine: 20,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302450-g-2022-04-22-093358928/555/555/2/loop-habanero-mint-extra-strong-all-white-portion.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Extra Strong",
  //       weight: 15,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Loop",
  //       description:
  //         "Loop Mint Mania Mini har en fräsch smak av mint med inslag av sötma. Portionerna är i formatet mini och har en nikotinhalt på 15mg nikotin per gram. Den nya dosdesignen är gjord med 100% bioplast och är återvinningsbar.",
  //       flavor: ["Mint"],
  //       format: "Mini",
  //       manufacturer: "Another Snus Factory",
  //       name: "Mint Mania",
  //       nicotine: 15,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302673-g-2022-04-22-094455931/555/555/2/loop-mint-mania-mini-all-white-portion.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 9,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Loop",
  //       description:
  //         "Loop Mango Tango Mini har en smak av söt mango, syrlig lime och het chili. Portionerna är i formatet mini och har en nikotinhalt på 15mg nikotin per gram. Den nya dosdesignen är gjord med 100% bioplast och är återvinningsbar.",
  //       flavor: ["Mango", "Lime", "Chili"],
  //       format: "Mini",
  //       manufacturer: "Another Snus Factory",
  //       name: "Mango Tango",
  //       nicotine: 15,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302675-g-2022-04-22-094328416/555/555/2/loop-mango-tango-mini-all-white-portion.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 2,
  //       tags: [],
  //       type: "Strong",
  //       weight: 9,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Loop",
  //       description:
  //         "Som alla LOOP-produkter har den en mjuk och angenäm smak som varar länge. Salty Ludicris är normalstark med 15 mg nikotin/g och har ett balanserat sting för att göra upplevelsen under läppen behaglig. LOOP kommer i ett diskret mini-format och ger en fuktig upplevelse utan något rinn.",
  //       flavor: ["Lakrits"],
  //       format: "Mini",
  //       manufacturer: "Another Snus Factory",
  //       name: "Salty Ludacris",
  //       nicotine: 15,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302880-g-2022-04-22-094626324/555/555/2/loop-salty-ludicris-mini-all-white-portion.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 2,
  //       tags: [],
  //       type: "Normal",
  //       weight: 9,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "LYFT Cool Air är en fräsch smakupplevelse av mint. som ger dig känslan kylande vindar. Portionerna är i formatet Slim och har en nikotinhalt på 15,6 mg nikotin per gram. En dosa LYFT Cool Air X-strong innehåller 23 st prillor.",
  //       flavor: ["Mint"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Cool Air",
  //       nicotine: 15.6,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302742-g-2022-04-01-095408353/555/555/2/lyft-cool-air-slim-x-strong-all-white-portion.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 4,
  //       tags: [],
  //       type: "X-strong",
  //       weight: 16.1,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "LYFT Eucalyptus & Honey Slim Strong All White Portion är en fusion med smak av eukalyptus och honung. Det vita snuset har en extra stark styrka och är en helt ny smak från populära LYFT. Dessutom är nikotinpåsarna i ett slimmat format.",
  //       flavor: ["Eukalyptus", "Honung"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "ucalyptus & Honey",
  //       nicotine: 14.29,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302955-g-2022-09-19-160339601/555/555/2/lyft-eucalyptus-honey-slim-strong.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 16.1,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "LYFT Yuzu & Cactus Slim All White Portion är ett vitt snus med en nikotinstyrka på 2/4. Det är citrusen yuzu och kaktusfrukten som ligger till grund för den här smakkombinationen. Varje dosa av produkten innehåller dessutom så många som 23 portioner.",
  //       flavor: ["Citrus", "Kaktus"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "uzu & Cactus",
  //       nicotine: 8.57,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302956-g-2022-09-19-084610968/555/555/2/lyft-yuzu-cactus-slim.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 2,
  //       tags: [],
  //       type: "Normal",
  //       weight: 16.1,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "LYFT/LAB Fig Pear Honey Slim Strong blandar tre smaker där päron är huvudsmaksättningen med noter av fikon och honung. Det slimmade formatet bidrar till en diskret upplevelse.",
  //       flavor: ["Päron", "Fikon", "Honung"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Fig Pear Honey",
  //       nicotine: 14.3,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/303052-g-2022-12-06-091254526/555/555/2/lyft-lab-fig-pear-honey-slim-strong.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 16.1,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "LYFT/LAB Rhubarb Lemon Slim Strong är nikotinpåsar med låg rinnighet, mycket nikotin och en smak av rabarber i kombination med citron. Smakreleasen är långvarig samtidigt som det slimmade formatet ger en diskret upplevelse.",
  //       flavor: ["Rabarber", "Citron"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Rhubarb Lemon",
  //       nicotine: 14.3,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/303051-g-2022-12-06-091304310/555/555/2/lyft-lab-rhubarb-lemon-slim-strong.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 16.1,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "LYFT Cool Air är en fräsch smakupplevelse av mint. som ger dig känslan kylande vindar. Portionerna är i formatet Slim och har en nikotinhalt på 8 mg nikotin per gram. En dosa LYFT Cool Air innehåller 23 st prillor.",
  //       flavor: ["Mint"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Cool Air",
  //       nicotine: 8,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302741-g-2022-04-01-095043757/555/555/2/lyft-cool-air-slim-all-white-portion.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 2,
  //       tags: [],
  //       type: "Normal",
  //       weight: 16.1,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "LYFT Eucalyptus & Honey Slim All White Portion har en smak av mentol som kommer från eukalyptus, kombinerat med en sötma från honung. Det är en helt ny smak från varumärket LYFT, som dessutom har en normal styrka. Dessa nikotinpåsar är i formatet är slim.",
  //       flavor: ["Eukalyptus", "Honung"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Eucalyptus Honey",
  //       nicotine: 8.57,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302954-g-2022-09-19-084618272/555/555/2/lyft-eucalyptus-honey-slim.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 2,
  //       tags: [],
  //       type: "Normal",
  //       weight: 16.1,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "LYFT/LAB Passionfruit Liquorice Slim Strong har en smak av passionfrukt med noter av lakrits. Formatet på nikotinpåsarna är slimmat för en diskret upplevelse, dessutom har portionerna en låg rinnighet. Nikotinpåsarna har en jämn smakrelease som varar länge. ",
  //       flavor: ["Passionsfrukt", "Lakrits"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Passionfruit Licuorice",
  //       nicotine: 14.3,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/303050-g-2022-12-06-090658329/555/555/2/lyft-lab-passionfruit-liquorice-slim-strong.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 16.1,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "LYFT Just Bloom levereras med smakerna frisk ciderliknande smak som ger en krispig känsla. Portionerna är i formatet Slim och kommer med nikotinhalten 14 mg nikotin per gram.",
  //       flavor: ["Cider"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Just Bloom",
  //       nicotine: 14,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302744-g-2022-04-01-100107950/555/555/2/lyft-just-bloom-slim-strong-all-white-portion.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 16.1,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "De tobaksfria nikotinpåsarna från LYFT/LAB Ginger Apple Lime Slim Normal sitter diskret under läppen. Prillorna har en torr yta som gör att de rinner mindre, men med den fuktiga insidan får du ändå en snabb känning av smaken som också håller i sig länge.",
  //       flavor: ["Ingefära", "Äpple", "Lime"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Ginger Apple Lime",
  //       nicotine: 8.6,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/303053-g-2022-12-06-090829073/555/555/2/lyft-lab-ginger-apple-lime-slim.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 2,
  //       tags: [],
  //       type: "Normal",
  //       weight: 16.1,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "Föredrar du den milda smaken av kaffe? Då ska du unna dig smaken Barista Twist med en nötig underton.",
  //       flavor: ["Kaffe"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Barista Twist",
  //       nicotine: 14,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/302746-g-2022-04-01-100441704/555/555/2/lyft-barista-twist-slim-strong-all-white-portion.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 3,
  //       tags: [],
  //       type: "Strong",
  //       weight: 16.1,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "Den här påsen LYFT/LAB Sweet Mint & Lemon Slim All White Portion är tillverkad av växtfiber. Därefter blir smakämnen och nikotinextrakt tillsatta. Portionerna kommer i ett slimmat format som ger en diskret passform under läppen. Nikotinpåsen är torr på ytan men fuktig inuti vilket gör att både nikotin och smak frigörs under längre tid.",
  //       flavor: ["Mint", "Citron"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Sweet Mint & Lemon",
  //       nicotine: 5.7,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/303005-g-2022-09-16-110039030/555/555/2/lyft-lab-sweet-mint-lemon-slim.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 2,
  //       tags: [],
  //       type: "Normal",
  //       weight: 15.8,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "Den här nikotinpåsen LYFT/LAB Apple Mint Slim Strong All White Portion har en smak av mint med toner av äpple och är tillverkad i ett slimmat format och ger en diskret passform under läppen. Istället för tobak är portionen producerad av växtfiber som bas där smakämnen, samt nikotin blir tillsatta efter hand.",
  //       flavor: ["Äpple", "Mint"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Apple Mint",
  //       nicotine: 14.3,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/303004-g-2022-09-08-100817908/555/555/2/lyft-lab-apple-mint-slim-strong-all-white-portion.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 4,
  //       tags: [],
  //       type: "Extra Strong",
  //       weight: 15.8,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "Vita nikotinpåsen LYFT/LAB Burning Mint Slim Extra Strong All White Portion kommer i ett slimmat format och sitter diskret bakom läppen. Nikotinpåsen är helt fri från tobak och är istället tillverkad av växtfiber som bas. Därefter blir smakämnen och nikotinextrakt tillsatta.",
  //       flavor: ["Mint"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Burning Mint",
  //       nicotine: 15.6,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/303002-g-2022-09-08-100310463/555/555/2/lyft-lab-burning-mint-slim-extra-strong-all-white-portion.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 4,
  //       tags: [],
  //       type: "Extra Strong",
  //       weight: 15.8,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "LYFT/LAB Fresh Mint med smak av spearmint och inslag av gurka. Denna produkt kommer i ett tunt och slimmat format och prillan lägger sig därför diskret bakom läppen. Dosan är utrustad med ett diskret lock på ovan du kan slänga den förbrukade prillan i.",
  //       flavor: ["Gurka", "Mint"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Fresh Mint",
  //       nicotine: 8.6,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/303003-g-2022-09-08-100632836/555/555/2/lyft-lab-fresh-mint-slim-all-white-portion.png",
  //       pouches: 24,
  //       reviews: [],
  //       strenght: 2,
  //       tags: [],
  //       type: "Normal",
  //       weight: 15.8,
  //       rating: 0,
  //     },
  //     {
  //       brand: "Lyft",
  //       description:
  //         "Produkten LYFT/LAB Absolute Mint Slim med smak av pepparmint och inslag av mentol. Absolute Mint kommer i ett tunt och slimmat format och lägger sig därför diskret under läppen. Produkten har ett lock på ovansidan du kan slänga dina använda prillor i.",
  //       flavor: ["Pepparmint", "Mentol"],
  //       format: "Slim",
  //       manufacturer: "BAT",
  //       name: "Absolute Mint",
  //       nicotine: 8.6,
  //       photo:
  //         "https://media.snusbolaget.se/snusbolaget/images/303001-g-2022-08-25-160155644/555/555/2/lyft-lab-absolute-mint-slim-all-white-portion.png",
  //       pouches: 23,
  //       reviews: [],
  //       strenght: 2,
  //       tags: [],
  //       type: "Normal",
  //       weight: 15.8,
  //       rating: 0,
  //     },
  //   ];

  //   {
  // 	brand: "Lyft",
  // 	description: "",
  // 	flavor: [""],
  // 	format: "",
  // 	manufacturer: "BAT",
  // 	name: "",
  // 	nicotine: ,
  // 	photo:
  // 	  "",
  // 	pouches: 23,
  // 	reviews: [],
  // 	strenght: 3,
  // 	tags: [],
  // 	type: "",
  // 	weight: 16.1,
  // 	rating: 0,
  //   },

  // const getAll = async () => {
  // 	console.log('in getAll');
  // 	try {
  // 		let allSnus = await getAllDocsInCollection('produkter');
  //         console.log()
  // 		if (allSnus) {
  // 			for (let snus of allSnus) {
  // 				if (!snus.Name && !snus.name) {
  // 					 await deleteAll(snus.id);
  // 				}
  // 			}
  // 		}
  // 	} catch (err) {
  // 		console.log('err', err);
  // 	}
  // };

  // getAll();

  const seedDB = async (p: Product) => {
    try {
      let data = await addNewDoc("produkter", p);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  //   for (let product of products) {
  //     seedDB(product);
  //   }
  // products.map((p) => {
  // 	// seedDB(p);
  // });
};
