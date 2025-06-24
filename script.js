const amountValue = document.getElementById('amount');
const fromCurrency  = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const covertButton = document.getElementById('convertButton');
const displayResult = document.getElementById('result');

const urlApi = 'https://api.exchangerate-api.com/v4/latest';

covertButton.addEventListener('click',() => {
    const amount = parseFloat(amountValue.value);
    const currencyForm = fromCurrency.value;
    const currencyTo = toCurrency.value;

    let path = `${urlApi}/${currencyForm}`;

    if(isNaN.amount || amount<0){
        displayResult.textContent = "";
        return
    }


    fetch(path).then((res) =>{
        if(!res.ok){
            throw new Error ("404 Error")
        }
        return res.json();
    }).then((data) =>{
        const exchangeRate = data.rates[currencyTo];

        if(!exchangeRate){
            throw new Error("Exchange Convert Rate not found");

        }else{
            const amountconverted = (exchangeRate*amount);
            displayResult.textContent = `${amount} ${currencyForm} = ${amountconverted.toFixed(2)} ${currencyTo}`;
        }
    }).catch((err) => {
        document.body.style.textAlign = "center";
        document.body.style.fontSize = "15rem";
        document.body.style.backgroundColor = "white";
        document.body.innerHTML = "404 Error"
    });
});