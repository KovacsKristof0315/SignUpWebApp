/*!!! LEHET SZERKESZTENI !!! */

/*A name és kifli értékek szerkesztése nem szükséges */

/*A minSec a minimálisan szükséges ember számot jelőli az adott órában (14:00 - 22:00)-ig szükség 
esetén lehet változtatni */

/*Az optSec ugyen ez csak az optimális ember számot jelöli (ennél lehet több ember, ez az 
a szám, amivel már kényelmesen lehet nyitni) */
const Datas = [
    {
        name : "Hamburger",
        minSec: [2, 2, 3, 3, 4, 4, 2, 2],
        optSec: [4, 4, 5, 5, 6, 6, 4, 4],
        kifli : 1
    },
    {
        name : "HotDog",
        minSec: [2, 2, 2, 2, 3, 3, 3, 3],
        optSec: [3, 3, 4, 4, 5, 5, 4, 4],
        kifli : 1
    },
    {
        name : "Burrito",
        minSec: [2, 2, 2, 2, 4, 4, 2, 2],
        optSec: [3, 3, 3, 3, 6, 6, 3, 3],
        kifli : 0
    },
    {
        name : "Palacsinta",
        minSec: [2, 2, 2, 2, 3, 4, 2, 2],
        optSec: [3, 2, 3, 3, 5, 5, 4, 4],
        kifli : 0
    }
] 