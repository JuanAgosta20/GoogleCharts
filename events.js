const selectJson = document.getElementById("selectJson");
console.log(selectJson)
selectJson.addEventListener("change", (event) => {
    console.log('event',event);
    drawChart();
    drawChartJS();
});

/*window.onload = function() {
    drawChartJS();
  };

  document.addEventListener('DOMContentLoaded', function() {
    //drawChart();
    console.log('asd')
 }, false);*/