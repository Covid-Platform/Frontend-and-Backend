fetch('https://api.covid19api.com/summary')
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log(data);
  //const deaths = document.querySelector('.deaths');
///const recovered = document.querySelector('.recovered');
document.getElementById("active").innerHTML = data.Global.NewConfirmed.toLocaleString();
document.getElementById("cases").innerHTML = data.Global.TotalConfirmed.toLocaleString();
 document.getElementById("new").innerHTML = data.Global.NewDeaths.toLocaleString();
 document.getElementById("death").innerHTML = data.Global.TotalDeaths.toLocaleString();
 document.getElementById("recovered").innerHTML = data.Global.NewRecovered.toLocaleString();
 document.getElementById("tests").innerHTML = data.Global.TotalRecovered.toLocaleString();
//document.getElementById("flag").src = data.Global.Countries;
});