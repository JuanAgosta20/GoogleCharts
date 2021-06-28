var dataset;
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

//DATA
//const datos = [['Mushrooms', 3],['Onions', 1],['Olives', 1],['Zucchini', 1],['Pepperoni', 2]];

//DATA FROM JSON
fetch("./data.json")
.then(response => {
   return response.json();
})
.then((data) => {
    dataset = data;
    dataset.forEach((e,index) => {
        let x = document.getElementById("selectJson");
        let option;
        if(index == 0) option = new Option(e.Usuario,index, true, true);
        else option = new Option(e.Usuario,index, false, false);
        x.add(option);
    });
    console.log('dataset',dataset);
    drawChartJS();
    // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);
})

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    let selectedOption = document.getElementById("selectJson").value;
    console.log('sel', selectedOption);

    let datos = [];
    datos.push(["Revisado a Tiempo", dataset[selectedOption].RevisadosATiempo]);
    datos.push(["Excedidos de Tiempo", dataset[selectedOption].ExcedidosDeTiempo]);

    // Create the data table.
    let dataPie = new google.visualization.DataTable();
    dataPie.addColumn('string', 'Estado');
    dataPie.addColumn('number', 'Documentos');
    dataPie.addRows(datos);
    console.log('DatosPie',dataPie);
    /*data.addRows([['Total Revisado', 3],['Onions', 1],['Olives', 1],['Zucchini', 1],['Pepperoni', 2] ]);*/
    let dataBars = new google.visualization.DataTable();
    dataBars.addColumn('string', 'Estado');
    dataBars.addColumn('number', 'Documentos');
    datos.push(["Total Revisado", dataset[selectedOption].TotalRevisado]);
    console.log('DatosBars',dataBars);
    dataBars.addRows(datos);

    // Set chart options
    var options = {
        'title':dataset[selectedOption].Usuario,
        'legend':'right',
        'width':600,
        'height':300,
        colors: ['blue', 'red', 'green'],
        'is3D':true
        };

    // Instantiate and draw our chart, passing in some options.
    var BarChart = new google.visualization.BarChart(document.getElementById('BarChart_div'));
    var PieChart = new google.visualization.PieChart(document.getElementById('PieChart_div'));

   /* let data = google.visualization.arrayToDataTable([
        ["Element", "Documentos", { role: "style" } , { role: 'annotation' }],
        ["Revisado a Tiempo", dataset[selectedOption].RevisadosATiempo, "#0000ff"],
        ["Excedidos de Tiempo", dataset[selectedOption].ExcedidosDeTiempo, #ff0000],
        ["Total Revisado", dataset[selectedOption].TotalRevisado, "#3cb371"],
      ]);*/


    BarChart.draw(dataBars, options);
    PieChart.draw(dataPie, options);

    //Descargar
    document.getElementById('pie').href=`${PieChart.getImageURI()}`;
    document.getElementById('pie').download=`Pie`;
    document.getElementById('bar').href=`${BarChart.getImageURI()}`;
    document.getElementById('bar').download=`Bar ${new Date().toString()}`;
}

//CHART.JS
function drawChartJS(){
    resetCanvas();
    document.getElementById('ChartWrapper').style.width = '600px';
    document.getElementById('ChartWrapper').style.height = '300px';
    
    document.getElementById('ChartWrapperPie').style.width = '400px';
    document.getElementById('ChartWrapperPie').style.height = '400px';

    let selectedOption = document.getElementById("selectJson").value;
      const labels = [
        'Revisado a Tiempo',
        'Excedidos de Tiempo',
        'Total Revisado'
      ];
      const data = {
        labels: labels,
        datasets: [{
          label: 'Documentos',
          backgroundColor: ['rgba(0, 0, 255, 1)', 'rgba(255, 0, 0, 1)', 'rgba(60, 179, 113,1)'],
          borderColor: 'rgba(0, 0, 255, 0.6)',
          data: [dataset[selectedOption].RevisadosATiempo,dataset[selectedOption].ExcedidosDeTiempo, dataset[selectedOption].TotalRevisado],
        }]
      };
      const config = {
        type: 'bar',
        data,
        options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            },
            indexAxis: 'y'
          }
      };
      const config2 = {
        type: 'pie',
        data,
        options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            },
            indexAxis: 'y'
          }
      };

      let myChart = new Chart(
        document.getElementById('Chartjs'),
        config
      );
      let myChartPie = new Chart(
        document.getElementById('ChartjsPie'),
        config2
      );
      //document.getElementById('ChartjsPie').style.height ='400px'
      //document.getElementById('ChartjsPie').style.width ='400px';
}

function resetCanvas(){
    const e = document.getElementById('Chartjs');
    e.parentElement.removeChild(e);
    let canvas = document.createElement('canvas')
    canvas.id = 'Chartjs';
    document.getElementById('ChartWrapper').append(canvas);

    const eP = document.getElementById('ChartjsPie');
    eP.parentElement.removeChild(eP);
    let Pie = document.createElement('canvas')
    Pie.id = 'ChartjsPie';
    document.getElementById('ChartWrapperPie').append(Pie);
}



