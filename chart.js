var dataset;
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
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
        'is3D':true
    };

    // Instantiate and draw our chart, passing in some options.
    var BarChart = new google.visualization.BarChart(document.getElementById('BarChart_div'));
    var PieChart = new google.visualization.PieChart(document.getElementById('PieChart_div'));
    BarChart.draw(dataBars, options);
    PieChart.draw(dataPie, options);

    //Descargar
    document.getElementById('pie').href=`${PieChart.getImageURI()}`;
    document.getElementById('pie').download=`Pie`;
    document.getElementById('bar').href=`${BarChart.getImageURI()}`;
    document.getElementById('bar').download=`Bar ${new Date().toString()}`;
}



