const mentElement = document.querySelector("#ment");
const tableElement = document.querySelector("#tbody");
const nameElement = document.querySelector("#nev");


const bevasNames = document.querySelectorAll(".bevasName");
const bevasNameButtons = document.querySelectorAll(".bevasNameButton");
const bevasNameFix = document.querySelectorAll(".bevasNameFix");

const rangevalue = 
    document.querySelector(".slider-container .price-slider");
const rangeInputvalue = 
    document.querySelectorAll(".range-input input");

let priceGap = 1;

const priceInputvalue = 
    document.querySelectorAll(".price-input input");


mentElement.addEventListener("click", () => {

    let tr = document.createElement("tr");

    let nametd = document.createElement("td");
    nametd.innerText = nameElement.value;
    tr.appendChild(nametd);
    for (let i = 14; i < 22; i++) {
        let td = document.createElement("td");
        if (i <= priceInputvalue[1].value && i >= priceInputvalue[0].value) {
            td.classList.add("marked");
            
        }
        
        
        tr.appendChild(td);
    }
    let td = document.createElement("td");
    
    let deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "X";

    deleteButton.addEventListener("click", () =>
    {
        tableElement.removeChild(tr);
    })

    td.appendChild(deleteButton);

    tr.appendChild(td);
    tableElement.appendChild(tr);
})


//bevás

for (let i = 0; i < bevasNameButtons.length; i++) {
    bevasNameFix[i].style.display = "none";
    bevasNameButtons[i].addEventListener("click", () => {
        bevasNameFix[i].style.display = "inline";
        bevasNameFix[i].innerText = bevasNames[i].value;
        bevasNames[i].style.display="none";
        bevasNameButtons[i].style.display="none";
        
    })
    
}

for (let i = 0; i < bevasNameFix.length; i++) {
    bevasNameFix[i].addEventListener("click", () => {
        bevasNameFix[i].style.display = "none";
        bevasNameFix[i].innerText = "";
        
        bevasNames[i].value="";
        bevasNames[i].style.display="inline";
        bevasNameButtons[i].style.display="inline";
    })
    
}
