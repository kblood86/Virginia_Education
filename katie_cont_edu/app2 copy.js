// Initializes the page with a default plot
//function init() {
// Trace1 for the Greek Data
  var trace1 = {
    x: edu_data.map(row => row.year),
    y: edu_data.map(row => row.education),
    type: "line",
    name: "Education"
  };

// Trace 2 for the Roman Data
  var trace2 = {
    x: edu_data.map(row => row.year),
    y: edu_data.map(row => row.military),
    type: "line",
    name: "Military"
  };
  var trace3 = {
    x: edu_data.map(row => row.year),
    y: edu_data.map(row => row.employment),
    type: "line",
    name: "Employment"
  };

  var trace4 = {
    x: edu_data.map(row => row.year),
    y: edu_data.map(row => row.other),
    type: "line",
    name: "Other"
  };


// Combining both traces
  var traceData = [trace1, trace2, trace3, trace4];

  var layout = {
    title: "Post-Secondary Plans for the Commonwealth of Virginia",
    
  };

  Plotly.newPlot("plot", traceData, layout);
//}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");

  // Initialize x and y arrays
  var x = [];
  var y = [];

  if (dataset === 'dataset1') {
    x = [2003,2004,2005,2006,2007,2008,2009];
    y = [1, 2, 4, 8, 16];
  }

  else if (dataset === 'dataset2') {
    x = [2003,2004,2005,2006,2007,2008,2009];
    y = [1, 10, 100, 1000, 10000];
  }

  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle("plot", "x", [x]);
  Plotly.restyle("plot", "y", [y]);
}

//init();