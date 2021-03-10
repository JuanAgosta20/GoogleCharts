// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

//DATA
const datos = [['Mushrooms', 3],
['Onions', 1],
['Olives', 1],
['Zucchini', 1],
['Pepperoni', 2]];
// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    /*data.addRows([
    ['Mushrooms', 3],
    ['Onions', 1],
    ['Olives', 1],
    ['Zucchini', 1],
    ['Pepperoni', 2]
    ]);*/
    data.addRows(datos);
    console.log(datos);
    // Set chart options
    var options = {
        'title':'Cuanta pizza comí anoche',
        'legend':'right',
        'width':500,
        'height':300,
        'is3D':true
    };

    // Instantiate and draw our chart, passing in some options.
    var BarChart = new google.visualization.BarChart(document.getElementById('BarChart_div'));
    var PieChart = new google.visualization.PieChart(document.getElementById('PieChart_div'));
    BarChart.draw(data, options);
    PieChart.draw(data, options);

    //Descargar
    document.getElementById('pie').href=`${PieChart.getImageURI()}`;
    document.getElementById('pie').download=`Pie`;
    document.getElementById('bar').href=`${BarChart.getImageURI()}`;
    document.getElementById('bar').download=`Bar ${new Date().toString()}`;
}