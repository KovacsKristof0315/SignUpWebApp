//Base Upload Buttons Configuration
function configureUploadButtons(NameButtons, NameFix, Name, type) {
    for (let i = 0; i < NameButtons.length; i++) {
    NameFix[i].style.display = "none";
    NameButtons[i].addEventListener("click", async () => {
        let datas = { "name" : Name[i].value }
        let response = await uploadData(datas, type);

        if (updateUserInform(response, Name[i], type)) {
            NameFix[i].style.display = "inline";
            NameFix[i].innerHTML += `<span class="align-middle">${Name[i].value}</span>`;
            NameFix[i].innerHTML += `<button type="button" class="btn btn-danger float-end fw-bolder buttonBTK">X</button>`;
            Name[i].style.display="none";
            NameButtons[i].style.display="none";
        }
    })
}
}


//Base delete data function
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

//Base upload data function
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

//base get data func
async function getData(NameButtons, NameFix, Names, type) {
    try 
    {
        let results = await fetch('./php/index.php/get' + type)
        let datas = await results.json();
        
        let i=0;
        for (const item in datas) {
            NameFix[i].style.display = "inline";

            NameFix[i].innerHTML += `<span class="align-middle">${datas[item].name}</span>`;
            NameFix[i].innerHTML += `<button type="button" class="btn btn-danger float-end fw-bolder buttonBTK">X</button>`;

            Names[i].style.display="none";
            NameButtons[i].style.display="none";
            
            NameFix[i].addEventListener("click", () =>
            {
                deleteData(datas[item].name, type);
            })
            i++;
        }
    } 
    catch (error) 
    {
        console.log(error);       
    }
}


//toast
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message; // Set custom message
    toast.style.display = "block"; // Show toast

    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
}


//get week index
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

//Base Delete Buttons Configuration
function configureDeleteButtons(NameButtons, NameFix, Name, type)
{
    for (let i = 0; i < NameFix.length; i++) {
        NameFix[i].addEventListener("click", async () => {
            let response = await deleteData(kifliNames[i].value, type);
            
            if (response.response == "success") {
                showToast("Sikeres " + type.trim() + " adattörlés ✅");
                
                NameFix[i].style.display = "none";
                NameFix[i].innerText = "";
                Name[i].value="";
                Name[i].style.display="inline";
                NameButtons[i].style.display="inline";
            }
            else
            {
                showToast("Sikeretelen " + type.trim() + " adattörlés ❌");
            }
        })
        
    }
}