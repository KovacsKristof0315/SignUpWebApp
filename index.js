const mentElement = document.querySelector("#ment");
const tableElement = document.querySelector("#tbody");
const nameElement = document.querySelector("#nev");


const bevasNames = document.querySelectorAll(".bevasName");
const bevasNameButtons = document.querySelectorAll(".bevasNameButton");
const bevasNameFix = document.querySelectorAll(".bevasNameFix");

const takkerNames = document.querySelectorAll(".takkerName");
const takkerNameButtons = document.querySelectorAll(".takkerNameButton");
const takkerNameFix = document.querySelectorAll(".takkerNameFix");

const rangevalue = 
    document.querySelector(".slider-container .price-slider");
const rangeInputvalue = 
    document.querySelectorAll(".range-input input");

let priceGap = 1;

const priceInputvalue = 
    document.querySelectorAll(".price-input input");


mentElement.addEventListener("click", () => {
    uploadNyitasData(nameElement.value, priceInputvalue[0].value, priceInputvalue[1].value);
    TablaFeltolt(nameElement.value, priceInputvalue[0].value, priceInputvalue[1].value)
})

function TablaFeltolt(name, start, end) {
    let tr = document.createElement("tr");

    let nametd = document.createElement("td");
    nametd.innerText = name;
    tr.appendChild(nametd);
    for (let i = 14; i < 22; i++) {
        let td = document.createElement("td");
        if (i <= end && i >= start) {
            td.classList.add("marked");
            
        }
        
        
        tr.appendChild(td);
    }
    let td = document.createElement("td");
    
    let deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.className = "btn btn-danger"
    deleteButton.value = "X";

    deleteButton.addEventListener("click", () =>
    {
        tableElement.removeChild(tr);
        deleteNyitasData(name);
    })

    td.appendChild(deleteButton);

    tr.appendChild(td);
    tableElement.appendChild(tr);
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

async function uploadNyitasData(name, start, end)
{
    try 
    {
        let datas = { "name" : name, "start" : start, "end" : end }
        let eredmeny = await fetch('./php/index.php/uploadNyitasData', {method: 'POST', body: JSON.stringify(datas)});
        let adatok = await eredmeny.json();
        console.log(adatok);
    } 
    catch (error) 
    {
      console.log(error);  
    }
}

async function deleteNyitasData(name)
{
    try 
    {
        let datas = { "name" : name }
        let eredmeny = await fetch('./php/index.php/deleteNyitasData', {method: 'POST', body: JSON.stringify(datas)});
        let adatok = await eredmeny.json();
        console.log(adatok);
    } 
    catch (error) 
    {
      console.log(error);  
    }
}

//bevás

for (let i = 0; i < bevasNameButtons.length; i++) {
    bevasNameFix[i].style.display = "none";
    bevasNameButtons[i].addEventListener("click", () => {
        bevasNameFix[i].style.display = "inline";
        bevasNameFix[i].innerText = bevasNames[i].value;
        bevasNames[i].style.display="none";
        bevasNameButtons[i].style.display="none";
        uploadBevas(bevasNames[i].value);
    })
    
}
async function uploadBevas(name) {
    try 
    {
        let datas = { "name" : name }
        let eredmeny = await fetch('./php/index.php/uploadBevas', {method: 'POST', body: JSON.stringify(datas)});
  
    } 
    catch (error) 
    {
      console.log(error);  
    }
}

for (let i = 0; i < bevasNameFix.length; i++) {
    bevasNameFix[i].addEventListener("click", () => {
        bevasNameFix[i].style.display = "none";
        deleteBevas(bevasNames[i].value);
        bevasNameFix[i].innerText = "";
        
        bevasNames[i].value="";
        bevasNames[i].style.display="inline";
        bevasNameButtons[i].style.display="inline";
    })
    
}

async function deleteBevas(name) {
    try 
    {
        let datas = { "name" : name }
        let eredmeny = await fetch('./php/index.php/deleteBevas', {method: 'POST', body: JSON.stringify(datas)});
  
    } 
    catch (error) 
    {
      console.log(error);  
    }
}

async function getBevas() {
    try 
    {
        let results = await fetch('./php/index.php/getBevas')
        datas = await results.json();
        console.log(datas);
        let i=0;
        for (const item in datas) {
            bevasNameFix[i].style.display = "inline";
            bevasNameFix[i].innerText = datas[item].name;
            bevasNames[i].style.display="none";
            bevasNameButtons[i].style.display="none";
            bevasNameFix[i].addEventListener("click", () =>
            {
                deleteBevas(datas[item].name);
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

for (let i = 0; i < takkerNameButtons.length; i++) {
    takkerNameFix[i].style.display = "none";
    takkerNameButtons[i].addEventListener("click", () => {
        takkerNameFix[i].style.display = "inline";
        takkerNameFix[i].innerText = takkerNames[i].value;
        takkerNames[i].style.display="none";
        takkerNameButtons[i].style.display="none";
        uploadTakker(takkerNames[i].value);
    })
    
}
async function uploadTakker(name) {
    try 
    {
        let datas = { "name" : name }
        let eredmeny = await fetch('./php/index.php/uploadTakker', {method: 'POST', body: JSON.stringify(datas)});
  
    } 
    catch (error) 
    {
      console.log(error);  
    }
}

for (let i = 0; i < takkerNameFix.length; i++) {
    takkerNameFix[i].addEventListener("click", () => {
        takkerNameFix[i].style.display = "none";
        deleteBevas(takkerNames[i].value);
        takkerNameFix[i].innerText = "";
        
        takkerNames[i].value="";
        takkerNames[i].style.display="inline";
        takkerNameButtons[i].style.display="inline";
    })
    
}

async function deleteTakker(name) {
    try 
    {
        let datas = { "name" : name }
        let eredmeny = await fetch('./php/index.php/deleteTakker', {method: 'POST', body: JSON.stringify(datas)});
  
    } 
    catch (error) 
    {
      console.log(error);  
    }
}

async function getTakker() {
    try 
    {
        let results = await fetch('./php/index.php/getTakker')
        datas = await results.json();
        console.log(datas);
        let i=0;
        for (const item in datas) {
            takkerNameFix[i].style.display = "inline";
            takkerNameFix[i].innerText = datas[item].name;
            takkerNames[i].style.display="none";
            takkerNameButtons[i].style.display="none";
            takkerNameFix[i].addEventListener("click", () =>
            {
                deleteTakker(datas[item].name);
            })
            i++;
        }
    } 
    catch (error) 
    {
        console.log(error);       
    }
}

window.addEventListener("load", () => {
    getNyitasData();
    getBevas();
    getTakker();
})

