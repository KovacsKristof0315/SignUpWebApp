const mentElement = document.querySelector("#ment");
const tableElement = document.querySelector("#tbody");
const tableModalElement = document.querySelector("#tbodyModal");
const nameElement = document.querySelector("#nev");

const titleElement = document.querySelector("#nyTitle");

//Modal elements
const infoButton = document.querySelector("#info");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");

//Bevas elements
const bevasNames = document.querySelectorAll(".bevasName");
const bevasNameButtons = document.querySelectorAll(".bevasNameButton");
const bevasNameFix = document.querySelectorAll(".bevasNameFix");

//Kifli elements
const kifliNames = document.querySelectorAll(".kifliName");
const kifliNameButtons = document.querySelectorAll(".kifliNameButton");
const kifliNameFix = document.querySelectorAll(".kifliNameFix");
const kifliContainer = document.querySelector("#kifli");
const kifliTitle = document.querySelector("#kifliTitle");

//Takker elements
const takkerNames = document.querySelectorAll(".takkerName");
const takkerNameButtons = document.querySelectorAll(".takkerNameButton");
const takkerNameFix = document.querySelectorAll(".takkerNameFix");

//Slider
const rangevalue = 
    document.querySelector(".slider-container .price-slider");
const rangeInputvalue = 
    document.querySelectorAll(".range-input input");

let priceGap = 1;

const priceInputvalue = 
    document.querySelectorAll(".price-input input");



//user inform
function updateUserInform(response, elementName, type) {
    if (response.response == "success") {
        type = type.trim();
        showToast("Sikeres " + type +  " adatrögzítés ✅");
        elementName.classList.add("purple-shadow");
        elementName.classList.remove("red-shadow");
        return true;
    }
    else if(response.response == "fail-unique")
    {
        showToast("Sikeretelen " + type +  " adatrögzítés ❌ már létező a név");
        elementName.focus();
        elementName.classList.remove("purple-shadow");
        elementName.classList.add("red-shadow");
    } else
    {
        showToast("Sikeretelen " + type +  " adatrögzítés ❌");
        elementName.focus();
        elementName.classList.remove("purple-shadow");
        elementName.classList.add("red-shadow");
    }
}

//Nyitás
mentElement.addEventListener("click", async ()  =>  {
    let datas = { "name" : nameElement.value, "start" : priceInputvalue[0].value, "end" : priceInputvalue[1].value }

    let response = await uploadData(datas, "NyitasData");

    if (updateUserInform(response, nameElement, "nyitás")) {
        TablaFeltolt(nameElement.value, priceInputvalue[0].value, priceInputvalue[1].value)
        nameElement.value = "";
    }
})



let weekIndex = -1;
let dataMatrix = [];
function TablaFeltolt(name, start, end) {
    let row = [];
    row.push(name);
    let tr = document.createElement("tr");

    let nametd = document.createElement("td");
    nametd.classList.add("text-center", "align-middle");
    nametd.innerText = name;
    tr.appendChild(nametd);
    for (let i = 14; i < 22; i++) {
        let td = document.createElement("td");
        if (i < end && i >= start) {
            td.classList.add("marked");
            row.push(1);
        }
        else
        {
            row.push(0);
        }
        
        
        tr.appendChild(td);
    }
    let td = document.createElement("td");
    td.classList.add("text-center");
    let deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("btn", "btn-danger");

    let iconImg = document.createElement("img");
    iconImg.src = "Icons/trash-can-svgrepo-com.svg";

    deleteButton.appendChild(iconImg);

    deleteButton.addEventListener("click", async () =>
    {
        let response = await deleteData(name, "NyitasData");
        if (response.response == "success") {
            showToast("Sikeres nyitás adattörlés ✅");
            tableElement.removeChild(tr);
            dataMatrix = dataMatrix.filter(x => x[0] != name);
        }
        else
        {
            showToast("Sikertelen nyitás adattörlés ❌");
        }
    })

    td.appendChild(deleteButton);

    tr.appendChild(td);
    tableElement.appendChild(tr);
    dataMatrix.push(row);
}

nameElement.addEventListener("focus", () => {
    nameElement.classList.add("purple-shadow");
    nameElement.classList.remove("red-shadow");
})

async function getNyitasData()
{
    try 
    {
        let results = await fetch('./php/index.php/getNyitasData')
        datas = await results.json();

        for (const item in datas) {
            TablaFeltolt(datas[item].name, datas[item].start, datas[item].end);
            
        }
    } 
    catch (error) 
    {
        console.log(error);       
    }
}

/*====================================================
BEVÁS
====================================================*/
//upload
configureUploadButtons(bevasNameButtons, bevasNameFix, bevasNames, "Bevas");

//delete
configureDeleteButtons(bevasNameButtons, bevasNameFix, bevasNames, "Bevas");



/*====================================================
TAKKER
====================================================*/
//upload
configureUploadButtons(takkerNameButtons, takkerNameFix, takkerNames, "Takker");

//delete
configureDeleteButtons(takkerNameButtons, takkerNameFix, takkerNames, "Takker");


/*====================================================
KIFLI
====================================================*/
//Upload
configureUploadButtons(kifliNameButtons, kifliNameFix, kifliNames, "Kifli");


//Delete

configureDeleteButtons(kifliNameButtons, kifliNameFix, kifliNames, "Kifli")


//Load esemény
window.addEventListener("load", () => {
    const today = new Date();

    setWeek(today);
    setKifli();
    if (weekIndex >= 0 && weekIndex <= 13) {
        titleElement.innerText = nyitasLista[weekIndex] + " Nyitás";
    }
    if(today.getDay() === 0 && today.getHours() === 22 && today.getMinutes() === 0 && today.getSeconds() === 0)
    {
        deleteAllData();   
    }
    
    getNyitasData();
    getData(bevasNameButtons, bevasNameFix, bevasNames, "Bevas")
    getData(takkerNameButtons, takkerNameFix, takkerNames, "Takker")

})

function setWeek(today) {
    const startDate = new Date(elsoNyitasNap);
    const startWeek = getDateWeek(startDate);
    const aktWeek = getDateWeek(today);
    weekIndex = aktWeek-startWeek;
}

function setKifli() {
    let actData = Datas.find(x => x.name == nyitasLista[weekIndex]) || 0;
    
    if(actData.kifli)
    {
        kifliContainer.style.display = "inline";
        if (actData.name == "Hamburger") {
            kifliTitle.innerText = "Zsemle"
            for (let i = 0; i < kifliNames.length; i++) {
                kifliNames[i].placeholder = "Zsemle név"
            }
        }
        else
        {
            kifliTitle.innerText = "Kifli"
            for (let i = 0; i < kifliNames.length; i++) {
                kifliNames[i].placeholder = "Kifli név"
            }
        }
        getData(kifliNameButtons, kifliNameFix, kifliNames, "Kifli")
    }
    else
    {
        kifliContainer.style.display = "none";
    }
}


async function deleteAllData() {
    try 
    {
        let results = await fetch('./php/index.php/deleteAllData');
        let datas = await results.json();
        console.log(datas);
    } 
    catch (error) 
    {
        console.log(error);       
    }
    
}


//Modal
infoButton.addEventListener("click", () => {
    dialog.showModal();
    let sections = [0,0,0,0,0,0,0,0];
    for (let i = 0; i < dataMatrix.length; i++) {
        sections[0] += dataMatrix[i][1];
        sections[1] += dataMatrix[i][2];
        sections[2] += dataMatrix[i][3];
        sections[3] += dataMatrix[i][4];
        sections[4] += dataMatrix[i][5];
        sections[5] += dataMatrix[i][6];
        sections[6] += dataMatrix[i][7];
        sections[7] += dataMatrix[i][8];
    }
    let actData = Datas.find(x => x.name == nyitasLista[weekIndex]);
    let scMin = actData.minSec;
    let scOpt = actData.optSec;

    tableModalElement.innerHTML = "";
    console.log(sections);
    for (let i = 0; i < sections.length; i++) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerText = (14+i) + ":00"
        
        
        let td2 = document.createElement("td");
        if (sections[i] < scMin[i]) {
            td2.style.color = "Red";
            td2.innerText = "Segítség!! Kell ember!!!" 
        }
        if (sections[i] >= scMin[i] && sections[i] < scOpt[i]) {
            td2.style.color = "Orange";
            td2.innerText = "Még jöjjön valaki pls 😭" 
        }
        if(sections[i] >= scOpt[i])
        {
            td2.style.color = "Green";
            td2.innerText = "Társaságod öröm, de ha nem tudsz jönni nem baj😌"
        }

        tr.appendChild(td1);
        tr.appendChild(td2);
        tableModalElement.appendChild(tr);
    }
})

dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInDialog) {
      dialog.close();
    }
  });

closeButton.addEventListener("click", () => {
    dialog.close();
});