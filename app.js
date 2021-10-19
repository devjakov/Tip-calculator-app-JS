

// declare input fields
const inputBill = document.querySelector('#bill');
const inputPeople = document.querySelector('#numberOfPeople');

// declare output fields
const outputPerson = document.querySelector('#personAmount');
const outputTotal = document.querySelector('#totalAmount');
const tipBtn = document.querySelector('.tipValues');
const customTipBtn = document.querySelector('#customValue');
const resetBtn = document.querySelector('#reset');

// declare event listeners for input fields
inputBill.addEventListener('input', checkInputBill);
inputPeople.addEventListener('input', checkInputPeople);
tipBtn.addEventListener('click', selectTip);
customTipBtn.addEventListener('input', customTip);
resetBtn.addEventListener('click', resetAllInputs)

// declare event listerners for clicks on inputs
inputBill.addEventListener('click', resetInput);
inputPeople.addEventListener('click', resetInput);

// load default input by simply clicking first button available
document.querySelector('input[type="button"]').click();


function resetInput(e){
    e.target.value = '';
}

function resetAllInputs(){
    inputBill.value = '40';
    inputPeople.value = '1';
    document.querySelector('input[type="button"]').click();
    setOutput();
}

function checkInputBill(e){
    
    if(inputBill.value === "0"){
        alarm(e.target);
    } else {
        getTip();
    }
    // if all is good then set output
    
}


function checkInputPeople(e){
    
    if(inputPeople.value === "0" ){
        console.log('we are here')
        alarm(e.target);
    } else {
        getTip();
    }
}



function alarm(element){
    const label = `<label for="presetValue" class="alarm">Can't be zero.</label>`;
    element.parentElement.insertAdjacentHTML('beforebegin', label);
    console.log(element.parentElement.parentElement)
    element.classList.add('ifZero');
    startTimer(element);
}

function startTimer(element){
    setTimeout(function(){
        document.querySelector('.alarm').remove();
        element.classList.remove('ifZero');
    }, 2000);
}

function selectTip(e){
    let btnValue;
    const btnElement = e.target;
    customTipBtn.value = '';
    // This weird for loop gets me all the buttons
    // the length-2 excludes the custom button
    for(i = 1; i < document.querySelectorAll('.tipValues')[0].childNodes.length; i+=2){
       
        if(document.querySelectorAll('.tipValues')[0].childNodes[i].classList.contains("selectedBtn") !== false){
         document.querySelectorAll('.tipValues')[0].childNodes[i].classList.remove("selectedBtn");
        }
    }

    
        btnElement.classList.add("selectedBtn");
        btnValue = e.target.value;
    btnValue = parseInt(btnValue.replace("%",""))/100;
    
    setOutput(btnValue);
    
    
    
}

function customTip(e){
    const customTip = e.target.value/100;
    setOutput(customTip);
}

function getTip(){
    let tip;
    for(i = 1; i < document.querySelectorAll('.tipValues')[0].childNodes.length; i+=2){
        
         if(document.querySelectorAll('.tipValues')[0].childNodes[i].classList.contains("selectedBtn")){
          tip = parseInt(document.querySelectorAll('.tipValues')[0].childNodes[i].value);
         }
     }
     console.log("this is " + tip);
     setOutput(tip/100);
}


function setOutput(tipp){
    
    let tip = tipp;
    if(tip === 0 || isNaN(tip)) {
        tip = 0.05;
    }
   let bill = parseInt(inputBill.value);
    let people = parseInt(inputPeople.value);
    outputPerson.innerHTML = `$${Math.round((bill*tip)/people).toFixed(2)}`;
    outputTotal.innerHTML = `$${Math.round(bill*(tip+1)/people).toFixed(2)}`;
}

