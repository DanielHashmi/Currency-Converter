const URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`;
let selects = document.querySelectorAll('.mainS select');
let input = document.querySelector('input');
let btn = document.querySelector('button');
let displayRate = document.querySelector('form h3');

let from = document.querySelector('.from select');
let to = document.querySelector('.to select');

for (let select of selects) {
    for (code in countryList) {
        let drops = document.createElement('option');
        drops.innerHTML = code;
        drops.value = code;
        if (select.name === "from" && code === "USD") {
            drops.selected = 'selected';
        }
        if (select.name === "to" && code === "PKR") {
            drops.selected = 'selected';
        }
        select.appendChild(drops)
    }
    select.addEventListener('change', (e) => {
        let currCode = e.target.value;
        let countryCode = countryList[currCode];
        let flags = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = select.parentElement.querySelector('img');
        img.src = flags;
    })
}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    updateApp()
})
let updateApp = async () => {
    if (input.value < 0.1 || isNaN(input.value)) {
        input.value = 0.1;
    } else {
        let url = `${URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`

        let response = await fetch(url)
        let data = await response.json();
        const finalData = Math.ceil(data[to.value.toLowerCase()])
        displayRate.textContent = `${input.value} ${from.value} = ${finalData} ${to.value}`
    }
}
updateApp()