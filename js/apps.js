
// Register the service worker if available.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function(reg) {
      console.log('Registered service worker', reg);
  }).catch(function(err) {
      console.warn('Error whilst registering service worker', err);
  });
}

function convertCurrency() {
  let fromCurrency = encodeURIComponent(document.querySelector('#from').value);
  let toCurrency = encodeURIComponent(document.querySelector('#to').value);
  let fromAmount = document.querySelector('#fromAmount').value;
  let query = fromCurrency + '_' + toCurrency;

  let dropdowns = document.getElementsByClassName("country-dropdown");
  dropdowns.length = 0;
  //let toAmount =  ;
  /** Looping through currency **/
  let currencyUrl = 'https://free.currencyconverterapi.com/api/v5/currencies';

  fetch(currencyUrl).then(function (result) {
    if (result.status !== 200) {
      console.warn("Looks like there was a problem. Status Code: " + result.status);
      return;
    }
    return result.json();
  }).then(function (results) {
    for (const result in results) {
      for (const id in results[result]) {
        for (i = 0; i < dropdowns.length; i++) {
          dropdown = dropdowns[i];
          option = document.createElement("option");
          option.text = results[result][id]["currencyName"];
          option.value = results[result][id]["id"];
          dropdown.appendChild(option);
        }
      }
    }
  });

  let url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' + query + '&compact=ultra&apiKey=a7e5f6bef76ab935f7c3'

  fetch(currencyUrl).then(function (result) {
    if (result.status !== 200) {
      console.warn("Looks like there was a problem. Status Code: " + result.status);
      return;
    }
    return result.json();
  });

  var result = fetch(url).then(resp => resp.json()) // Transform the data into json
  .then(function (data) {
    let values = data[query];
    if (values) {
      let total = values * fromAmount;
      let toAmount = Math.round(total * 100) / 100;

      document.getElementById("toAmount").attributeName = 'value';

      document.getElementById("toAmount").value = toAmount;
    } else {
      return function (xhr, status, error) {
        console.log(status);
      };
    };
  });

  return result;
}
