const selectJson = document.getElementById("selectJson");
console.log(selectJson)
selectJson.addEventListener("change", (event) => {
    console.log('event',event);
    drawChart();
    drawChartJS();
});

/*window.onload = function() {
    drawChartJS();
  };*/

  window.addEventListener("load", function(event) {
    drawChartJS();
  });