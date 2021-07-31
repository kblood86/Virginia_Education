
// Trace1 
  var trace1 = {
    x: edu_data.map(row => row.year),
    y: edu_data.map(row => row.education),
    type: "line",
    name: "Education"
  };

// Trace 2 
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
    yaxis: { title: "Number of Students"},
    width: 1000,
    height: 600,
    annotations: [
      {
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        y: -0.1,
        xanchor: 'center',
        yanchor: 'top',
        text: 'Source: Virginia Deparment of Education (DOE)',
        showarrow: false,
        font: {
            family: 'Arial',
            size: 12,
            color: 'rgb(150,150,150)'
        }
      }
    ]
  };

  Plotly.newPlot("line-next", traceData, layout)
//}

// Trace1 
var traceVA = {
  x: nat_avg.map(row => row.Year),
  y: nat_avg.map(row => row.virginia_avg),
  type: "line",
  name: "Virginia Average"
};

// Trace 2 
var traceNAT = {
  x: nat_avg.map(row => row.Year),
  y: nat_avg.map(row => row.nat_avg),
  type: "line",
  name: "National Average"
};
var traceHigh = {
  x: nat_avg.map(row => row.Year),
  y: nat_avg.map(row => row.high_pay),
  type: "line",
  name: "Highest State Average"
};

var traceLow = {
  x: nat_avg.map(row => row.Year),
  y: nat_avg.map(row => row.low_pay),
  type: "line",
  name: "Lowest State Average"
};


// Combining both traces
var traceData2 = [traceVA, traceNAT, traceHigh,traceLow];

var layout2 = {
  title: "National Teacher Salary Comparison",
  yaxis: { title: "Salary (In Dollars)"},
  width: 915,
  height: 500,
  images: [
    {
      x: 1,
      y: 1.05,
      sizex: 0.2,
      sizey: 0.2,
      source: "Assets/Images/America.jpeg",
      xanchor: "right",
      xref: "paper",
      yanchor: "bottom",
      yref: "paper"
    }
  ],
  annotations: [
    {
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      y: -0.1,
      xanchor: 'center',
      yanchor: 'top',
      text: 'Source: Virginia Deparment of Education (DOE) and National Science Foundation',
      showarrow: false,
      font: {
          family: 'Arial',
          size: 12,
          color: 'rgb(150,150,150)'
      }
    }
  ]
};

Plotly.newPlot("line-avg", traceData2, layout2)

var traceTeach = {
  x: teacher_pay.map(row => row.Year),
  y: teacher_pay.map(row => row.avg_teach),
  type: "line",
  name: "Teacher Average Salary"
};

// Trace 2 
var tracePrinc = {
  x: teacher_pay.map(row => row.Year),
  y: teacher_pay.map(row => row.avg_princ),
  type: "line",
  name: "Principle Average Salary",
  line: {
    color: 'rgb(52, 212, 253)'
  }
};
var traceAsst = {
  x: teacher_pay.map(row => row.Year),
  y: teacher_pay.map(row => row.avg_asst),
  type: "line",
  name: "Assistant Principle Average Salary",
  line: {
    color: 'rgb(194, 102, 253)'
  }
};




// Combining both traces
var traceData3 = [traceTeach, tracePrinc, traceAsst];

var layout3 = {
  title: "Virginia Salary Comparison",
  yaxis: { title: "Salary (In Dollars)"},
  width: 1000,
  height: 500,
  images: [
    {
      x: 1,
      y: 1.05,
      sizex: 0.2,
      sizey: 0.2,
      source: "Assets/Images/va.png",
      xanchor: "right",
      xref: "paper",
      yanchor: "bottom",
      yref: "paper"
    }
  ],
  annotations: [
    {
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      y: -0.1,
      xanchor: 'center',
      yanchor: 'top',
      text: 'Source: Virginia Deparment of Education (DOE)',
      showarrow: false,
      font: {
          family: 'Arial',
          size: 12,
          color: 'rgb(150,150,150)'
      }
    }
  ]
};

Plotly.newPlot("line-comp", traceData3, layout3)

