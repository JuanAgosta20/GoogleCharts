const selectJson = document.getElementById("selectJson");
console.log(selectJson)
selectJson.addEventListener("change", (event) => {
    console.log('event',event);
    drawChart();
});