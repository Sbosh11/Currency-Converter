
  let dropdowns = document.getElementsByClassName("country-dropdown");
  dropdowns.length = 0;

 

  const url ="https://free.currencyconverterapi.com/api/v5/countries";

  fetch(url)
    .then(function(response) {
      if (response.status !== 200) {
        console.warn(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      return response.json();
    })
    .then(function(results) {
      for (const result in results) {
        for (const id in results[result]) {
          for (i = 0; i < dropdowns.length; i++) {
            dropdown = dropdowns[i];
            option = document.createElement("option");
            option.text = results[result][id]["currencyName"];
            option.value = results[result][id]["id"];
            console.log(results[result][id]["currencyName"]);
            dropdown.appendChild(option);
          }

          document.getElementById("country-dropdown").value = "ZA";
          document.getElementById("country-dropdown1").value = "US";
        }
      }
    });




/*
  function createAndModifyDivs() {
    var boards = document.getElementsByClassName("test");
   
    for (i = 0; i < boards.length; i++) {
      board = boards[i];
     
      div = document.createElement('div');
      div.className = "blah";
    
      board.appendChild(div);
 
    
    }
  }

  
  createAndModifyDivs();

   document.getElementById("ZA").selected=true;

  
               
const dd = document.querySelector('#country-dropdown');
 
for (var i = 0; i < dd.options.length; i++) {
  {
   textToFind = 'South African rand'; 
    if (dd.options[i].text === textToFind) {
        dd.selectedIndex = i;
        break;
    }
  }
   
  
}

*/