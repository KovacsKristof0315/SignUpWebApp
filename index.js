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



//Base delete function
async function deleteData(name, type) {
    try 
    {
        let datas = { "name" : name }
        let eredmeny = await fetch('./php/index.php/delete' + type, {method: 'POST', body: JSON.stringify(datas)});
        let response = await eredmeny.json();
        return response;
    } 
    catch (error) 
    {
      console.log(error);  
    }
}

//Base upload function
async function uploadData(datas, type) {
    try 
    {
        let eredmeny = await fetch('./php/index.php/upload' + type, {method: 'POST', body: JSON.stringify(datas)});
        let response = await eredmeny.json();
        return response;

    } 
    catch (error) 
    {
      console.log(error);  
    }
}



//Nyitás
mentElement.addEventListener("click", async ()  =>  {
    let datas = { "name" : nameElement.value, "start" : priceInputvalue[0].value, "end" : priceInputvalue[1].value }

    let response = await uploadData(datas, "NyitasData");

    if (response.response == "success") {
        showToast("Sikeres nyitás adatrögzítés ✅");
        TablaFeltolt(nameElement.value, priceInputvalue[0].value, priceInputvalue[1].value)
        nameElement.value = "";
        nameElement.classList.add("purple-shadow");
        nameElement.classList.remove("red-shadow");
    }
    else if(response.response == "fail-unique")
    {
        showToast("Sikeretelen nyitás adatrögzítés ❌ már létező a név");
        nameElement.focus();
        nameElement.classList.remove("purple-shadow");
        nameElement.classList.add("red-shadow");
    } else
    {
        showToast("Sikeretelen nyitás adatrögzítés ❌");
        nameElement.focus();
        nameElement.classList.remove("purple-shadow");
        nameElement.classList.add("red-shadow");
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
        if (i <= end && i >= start) {
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
    iconImg.classList.add("img-fluid");

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

//bevás
//upload
for (let i = 0; i < bevasNameButtons.length; i++) {
    bevasNameFix[i].style.display = "none";
    bevasNameButtons[i].addEventListener("click", async () => {
        let datas = { "name" : bevasNames[i].value }
        let response = await uploadData(datas, "Bevas");
        if (response.response == "success") {
            showToast("Sikeres bevás adatrögzítés ✅");
            

            bevasNameFix[i].style.display = "inline";
            bevasNameFix[i].innerHTML += `<span class="align-middle">${bevasNames[i].value}</span>`;
            bevasNameFix[i].innerHTML += `<button type="button" class="btn btn-danger float-end fw-bolder buttonBTK">X</button>`;
            
            bevasNames[i].style.display="none";
            bevasNameButtons[i].style.display="none";
            bevasNames[i].classList.add("purple-shadow");
            bevasNames[i].classList.remove("red-shadow");
        }
        else
        {
            showToast("Sikeretelen bevás adatrögzítés ❌");
            bevasNames[i].focus();
            bevasNames[i].classList.remove("purple-shadow");
            bevasNames[i].classList.add("red-shadow");
        }
        
    })
    
}

//delete
for (let i = 0; i < bevasNameFix.length; i++) {
    bevasNameFix[i].addEventListener("click", async () => {
        let response = await deleteData(bevasNames[i].value, "Bevas");
        if (response.response == "success") {
            showToast("Sikeres bevás adattörlés ✅");
            
            bevasNameFix[i].style.display = "none";
            bevasNameFix[i].innerText = "";
            bevasNames[i].value="";
            bevasNames[i].style.display="inline";
            bevasNameButtons[i].style.display="inline";

        }
        else
        {
            showToast("Sikeretelen bevás adattörlés ❌");
        }
    })
    
}

for (let i = 0; i < bevasNames.length; i++) {
    bevasNames[i].addEventListener("focus", () => {
        bevasNames[i].classList.add("purple-shadow");
        bevasNames[i].classList.remove("red-shadow");
    })
    
}

async function getBevas() {
    try 
    {
        let results = await fetch('./php/index.php/getBevas')
        datas = await results.json();
        
        let i=0;
        for (const item in datas) {
            bevasNameFix[i].style.display = "inline";
            bevasNameFix[i].innerHTML += `<span class="align-middle">${datas[item].name}</span>`;
            bevasNameFix[i].innerHTML += `<button type="button" class="btn btn-danger float-end fw-bolder buttonBTK">X</button>`;
            bevasNames[i].style.display="none";
            bevasNameButtons[i].style.display="none";
            bevasNameFix[i].addEventListener("click", () =>
            {
                deleteData(datas[item].name, "Bevas");
            })
            i++;
        }
    } 
    catch (error) 
    {
        console.log(error);       
    }
}

// takker
//upload
for (let i = 0; i < takkerNameButtons.length; i++) {
    takkerNameFix[i].style.display = "none";
    takkerNameButtons[i].addEventListener("click", async () => {
        let datas = { "name" : takkerNames[i].value }
        let response = await uploadData(datas, "Takker");
        if (response.response == "success") {
            showToast("Sikeres bevás adatrögzítés ✅");
            
            takkerNameFix[i].style.display = "inline";
            takkerNameFix[i].innerHTML += `<span class="align-middle">${takkerNames[i].value}</span>`;
            takkerNameFix[i].innerHTML += `<button type="button" class="btn btn-danger float-end fw-bolder buttonBTK">X</button>`;
            takkerNames[i].style.display="none";
            takkerNameButtons[i].style.display="none";

            takkerNames[i].classList.add("purple-shadow");
            takkerNames[i].classList.remove("red-shadow");
        }
        else
        {
            showToast("Sikeretelen bevás adatrögzítés ❌");
            takkerNames[i].focus();
            takkerNames[i].classList.remove("purple-shadow");
            takkerNames[i].classList.add("red-shadow");
        }
    })
    
}

//delete
for (let i = 0; i < takkerNameFix.length; i++) {
    takkerNameFix[i].addEventListener("click", async () => {
        let response = await deleteData(takkerNames[i].value, "Takker");
        if (response.response == "success") {
            showToast("Sikeres takker adattörlés ✅");
            
            takkerNameFix[i].style.display = "none";
            takkerNameFix[i].innerText = "";
            takkerNames[i].value="";
            takkerNames[i].style.display="inline";
            takkerNameButtons[i].style.display="inline";

        }
        else
        {
            showToast("Sikeretelen takker adattörlés ❌");
        }
    })
    
}

for (let i = 0; i < takkerNames.length; i++) {
    takkerNames[i].addEventListener("focus", () => {
        takkerNames[i].classList.add("purple-shadow");
        takkerNames[i].classList.remove("red-shadow");
    })
    
}
async function getTakker() {
    try 
    {
        let results = await fetch('./php/index.php/getTakker')
        let datas = await results.json();
        
        let i=0;
        for (const item in datas) {
            takkerNameFix[i].style.display = "inline";

            takkerNameFix[i].innerHTML += `<span class="align-middle">${datas[item].name}</span>`;
            takkerNameFix[i].innerHTML += `<button type="button" class="btn btn-danger float-end fw-bolder buttonBTK">X</button>`;

            takkerNames[i].style.display="none";
            takkerNameButtons[i].style.display="none";
            
            takkerNameFix[i].addEventListener("click", () =>
            {
                deleteData(datas[item].name, "Takker");
            })
            i++;
        }
    } 
    catch (error) 
    {
        console.log(error);       
    }
}

// kifli
//Upload
for (let i = 0; i < kifliNameButtons.length; i++) {
    kifliNameFix[i].style.display = "none";
    kifliNameButtons[i].addEventListener("click", async () => {
        let datas = { "name" : kifliNames[i].value }
        let response = await uploadData(datas, "Kifli");
        if (response.response == "success") {
            showToast("Sikeres kifli adatrögzítés ✅");
            
            kifliNameFix[i].style.display = "inline";
            kifliNameFix[i].innerHTML += `<span class="align-middle">${kifliNames[i].value}</span>`;
            kifliNameFix[i].innerHTML += `<button type="button" class="btn btn-danger float-end fw-bolder buttonBTK">X</button>`;

            kifliNames[i].style.display="none";
            kifliNameButtons[i].style.display="none";

            kifliNames[i].classList.add("purple-shadow");
            kifliNames[i].classList.remove("red-shadow");
        }
        else
        {
            kifliNames[i].focus();
            kifliNames[i].classList.remove("purple-shadow");
            kifliNames[i].classList.add("red-shadow");
            showToast("Sikeretelen kifli adatrögzítés ❌");
        }
    })
    
}

//Delete
for (let i = 0; i < kifliNameFix.length; i++) {
    kifliNameFix[i].addEventListener("click", async () => {
        let response = await deleteData(kifliNames[i].value, "Kifli");
        
        if (response.response == "success") {
            showToast("Sikeres kifli adattörlés ✅");
            
            kifliNameFix[i].style.display = "none";
            kifliNameFix[i].innerText = "";
            kifliNames[i].value="";
            kifliNames[i].style.display="inline";
            kifliNameButtons[i].style.display="inline";
        }
        else
        {
            showToast("Sikeretelen kifli adattörlés ❌");
        }
    })
    
}

for (let i = 0; i < kifliNames.length; i++) {
    kifliNames[i].addEventListener("focus", () => {
        kifliNames[i].classList.add("purple-shadow");
        kifliNames[i].classList.remove("red-shadow");
    })
    
}

async function getKifli() {
    try 
    {
        let results = await fetch('./php/index.php/getKifli')
        let datas = await results.json();
        
        let i=0;
        for (const item in datas) {
            kifliNameFix[i].style.display = "inline";
            kifliNameFix[i].innerHTML += `<span class="align-middle">${datas[item].name}</span>`;
            kifliNameFix[i].innerHTML += `<button type="button" class="btn btn-danger float-end fw-bolder buttonBTK">X</button>`;
            kifliNames[i].style.display="none";
            kifliNameButtons[i].style.display="none";
            
            kifliNameFix[i].addEventListener("click", () =>
            {
                deleteData(datas[item].name, "Kifli");
            })
            i++;
        }
    } 
    catch (error) 
    {
        console.log(error);       
    }
}


//Load esemény
window.addEventListener("load", () => {
    const today = new Date();

    setWeek(today);
    setKifli();
    if (weekIndex >= 0 && weekIndex <= 12) {
        titleElement.innerText = nyitasLista[weekIndex] + " Nyitás";
    }
    if(today.getDay() === 0 && today.getHours() === 22 && today.getMinutes() === 0 && today.getSeconds() === 0)
    {
        deleteAllData();   
    }
    
    getNyitasData();
    getBevas();
    getTakker();
})

function setWeek(today) {
    const startDate = new Date(elsoNyitasNap);
    const startWeek = getDateWeek(startDate);
    const aktWeek = getDateWeek(today);
    weekIndex = aktWeek-startWeek;
}

function setKifli() {
    let actData = Datas.find(x => x.name == nyitasLista[weekIndex]);
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
        getKifli();
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

function getDateWeek(date) {
    const currentDate = 
        (typeof date === 'object') ? date : new Date();
    const januaryFirst = 
        new Date(currentDate.getFullYear(), 0, 1);
    const daysToNextMonday = 
        (januaryFirst.getDay() === 1) ? 0 : 
        (7 - januaryFirst.getDay()) % 7;
    const nextMonday = 
        new Date(currentDate.getFullYear(), 0, 
        januaryFirst.getDate() + daysToNextMonday);

    return (currentDate < nextMonday) ? 52 : 
    (currentDate > nextMonday ? Math.ceil(
    (currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1)+1;
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


//toast (válasz)
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message; // Set custom message
    toast.style.display = "block"; // Show toast

    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
}