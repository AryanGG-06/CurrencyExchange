let dropdownSelect = document.querySelectorAll(".align_box2 select")
let btn = document.querySelector(".btn")
let images = document.querySelectorAll(".from img")
let baseURL = "https://v6.exchangerate-api.com/v6/b46068414c942044dcfeba75/pair"
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")

for(select of dropdownSelect){
    for(currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode; 
        if( select.name === "frm" && currCode === "USD") {
            newOption.selected = "selected"
        }
        if( select.name === "too" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption)
    }
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target)
})

}


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}


btn.addEventListener("click" , async (evt) =>{
    evt.preventDefault()
    let amount = document.querySelector("form input")
    let amtVal = amount.value;
    if(amtVal === ""|| amtVal < 1){
        amtVal = 1;
        amount.value = "1"
    };
    let newURL = `${baseURL}/${fromCurr.value.toUpperCase()}/${toCurr.value.toUpperCase()}`
    let response = await fetch(newURL);
    let data = await response.json();
    console.log(data)
    

    let rate = amtVal * data.conversion_rate;
    let location = document.querySelector(".msg_box");
    let code = rate  + data.target_code 
    location.innerText = code ;
       

})
