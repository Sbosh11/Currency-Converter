
function convertCurrency() {
  let fromCurrency = encodeURIComponent($('#from').val());
  let toCurrency = encodeURIComponent($('#to').val());
  let fromAmount = $('#fromAmount').val();
  let query = fromCurrency + '_' + toCurrency;
   //let toAmount =  ;
  /** Looping through currency **/
  let currenciesUrl  = 'https://free.currencyconverterapi.com/api/v5/currencies';
      $.ajax({
              url: currenciesUrl,
              type:"GET",
              success: (result) => {
                result = result.results;
               for (const props in result) {
                  console.log(props);
                 //  if(props === "USD") {
                 //     delete result[props];
                 // }  
              let html = `<option value="${props}">${result[props]["currencyName"]}(${props})</option>`;
              
                 $(".currency").append(html);
                } 
              },
              error: (xhr,status,error) => {console.log(status)}, 
              dataType: 'jsonp',
        });  
  

  let url = 'https://free.currencyconverterapi.com/api/v5/convert?q='
            + query + '&compact=ultra&apiKey=';
    
   var result = $.ajax({
              url: url,
              type:"GET",
              success: (data) => {
               let val = data[query];
                  if (val) {
              let total = val * fromAmount;
              let toAmount = Math.round(total * 100) / 100;
                 $('#toAmount').val(toAmount);
              } else {
                var err = new Error("Value not found for " + query);
              
            }
              },
              error: function(xhr,status,error) {
                console.log(status);
              }, dataType: 'jsonp',
        });  
       return result;
}

