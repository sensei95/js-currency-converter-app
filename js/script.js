const dropList = document.querySelectorAll(".drop-list .select-box select"),
  getButton = document.querySelector(".wrapper form button"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  exchangeAltIcon = document.querySelector(".drop-list .icon"),
  api_key = "836a62063020f98e4db2794d";

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_code) {
    let selected;

    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "NPR" ? "selected" : "";
    }

    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;

    dropList[i].insertAdjacentHTML("beforeend", optionTag);

    dropList[i].addEventListener("change", (e) => {
      loadFlag(e.target);
    });
  }
}

window.addEventListener("load", (e) => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

function loadFlag(target) {
  for (let currency_code in country_code) {
    if (currency_code == target.value) {
      let src = `https://www.countryflags.io/${country_code[currency_code]}/flat/64.png`;
      target.parentNode.querySelector("img").src = src;
      break;
    }
  }
}

function getExchangeRate() {
  const amount = document.querySelector(".amount input"),
    exchangerateTxt = document.querySelector(".wrapper .exchange-rate");
  let amountVal = amount.value;

  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }

  exchangerateTxt.innerText = `Getting exchange rate ...`;

  let url = `https://v6.exchangerate-api.com/v6/${api_key}/latest/${fromCurrency.value}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const { base_code, conversion_rates } = result;
      let exchangerate = conversion_rates[toCurrency.value];
      let totalExchangeRate = (exchangerate * amountVal).toFixed(2);

      exchangerateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangerateTxt.innerText = "Something went wrong";
    });
}

exchangeAltIcon.addEventListener("click", (e) => {
  e.preventDefault();

  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});
