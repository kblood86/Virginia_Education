// Drop down menu function
function init() {

    // select pull down tag ID from html
    var pullDownMenu = d3.select('#selDataset_sch');

    // Building school information in panel ID_101_210
    d3.json("2008-2019_GradbySCH_v2.json").then((data) => {

        // console.log("OG data", data)
        // Function for grouping the data appropriately
        function groupBy(objectArray, property) {
            return objectArray.reduce((acc, obj) => {
                const key = obj[property];
                if (!acc[key]) {
                    acc[key] = [];
                }
                // Add object to list for given key's value
                acc[key].push(obj);
                return acc;
            }, {});
        }

        // Create a constant to hold the grouped Data
        const grouped_data_1 = groupBy(data, 'Div_Sch_Num');

        // console.log("grouped data", grouped_data_1) 
        // empty lists to store parsed data
        var div_sch_id = []
        var rest_of_data = []

        // push in to the empty list the parsed data 
        for (let [key, value] of Object.entries(grouped_data_1)) {
            div_sch_id.push(key)
            rest_of_data.push(value)
        }

        // console.log("Drop down IDs", div_sch_id)
        div_sch_id.forEach((x) => {
            pullDownMenu.append("option").property("value", x).text(x);
        })



    })

    buildPanel('ID_101_210');
    buildCharts('ID_101_210');
}

function optionChanged_sch(sample_cycle) {
    buildPanel(sample_cycle);
    buildCharts(sample_cycle);
}

init()

// Building Panel 
function buildPanel(id) {
    d3.json("panel_level_info.json").then((data) => {

        // console.log("OG data", data)
        // Function for grouping the data appropriately
        function groupBy(objectArray, property) {
            return objectArray.reduce((acc, obj) => {
                const key = obj[property];
                if (!acc[key]) {
                    acc[key] = [];
                }
                // Add object to list for given key's value
                acc[key].push(obj);
                return acc;
            }, {});
        }

        // Create a constant to hold the grouped Data
        const grouped_data_1 = groupBy(data, 'Div_Sch_ID');

        // console.log("grouped data", grouped_data_1) 
        // empty lists to store parsed data
        var div_sch_id = []
        var rest_of_data = []

        // push in to the empty list the parsed data 
        for (let [key, value] of Object.entries(grouped_data_1)) {
            div_sch_id.push(key)
            rest_of_data.push(value)
        }

        var selected_id = grouped_data_1[id]
        // console.log("ID_101_210", selected_id)

        // identify panel 
        var panel = d3.select("#sample-metadata-sch");

        // Make sure panel is clear before loading metadata
        panel.html("");

        // collect all the data in json (key value pairs) and put them in the panel
        Object.entries(selected_id[0]).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}:   ${value}`);

        });
    })
}


// build charts
function buildCharts(id) {
    d3.json("2008-2019_GradbySCH_v2.json").then((data) => {

        // console.log("OG data", data)
        // Function for grouping the data appropriately
        function groupBy(objectArray, property) {
            return objectArray.reduce((acc, obj) => {
                const key = obj[property];
                if (!acc[key]) {
                    acc[key] = [];
                }
                // Add object to list for given key's value
                acc[key].push(obj);
                return acc;
            }, {});
        }

        // Create a constant to hold the grouped Data
        const grouped_data = groupBy(data, 'Div_Sch_Num');

        // console.log("grouped data", grouped_data)
        // empty lists to store parsed data
        var div_sch_id = []
        var rest_of_data = []

        // push in to the empty list the parsed data 
        for (let [key, value] of Object.entries(grouped_data)) {
            div_sch_id.push(key)
            rest_of_data.push(value)
        }

        var selected_id = grouped_data[id]

        // console.log("selected_id", selected_id)

        var schoolYear = [];
        var numGrads = [];

        for (let [key, value] of Object.entries(selected_id[0])) {
            schoolYear.push(key)
            numGrads.push(value)
        }

        schoolYear.splice(0, 2)
        numGrads.splice(0, 2)
        var schoolYear_2 = ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"]

        console.log("schoolYear", schoolYear)
        // console.log("numGrads", numGrads) 

        var trace_line = {
            type: "scatter",
            mode: "lines",
            x: schoolYear_2,
            y: numGrads,
            line: {
                color: '#17BECF'
            }
        }

        var line_data = [trace_line];

        var line_layout = {
            title: "",
            xaxis: {
                showline: true,
                showgrid: false,
                showticklabels: true,
                linecolor: 'rgb(204,204,204)',
                linewidth: 2,
                autotick: false,
                ticks: 'outside',
                tickcolor: 'rgb(204,204,204)',
                tickwidth: 2,
                ticklen: 5,
                tickfont: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(82, 82, 82)'
                }
            },
            yaxis: {
                showline: true,
                showgrid: false,
                showticklabels: true,
                linecolor: 'rgb(204,204,204)',
                linewidth: 2,
                autotick: true,
                ticks: 'outside',
                tickcolor: 'rgb(204,204,204)',
                tickwidth: 2,
                ticklen: 5,
                tickfont: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(82, 82, 82)'
                }
            },
            autosize: false,
            margin: {
                autoexpand: false,
                l: 100,
                r: 20,
                t: 100
            },
            annotations: [
                {
                    xref: 'paper',
                    yref: 'paper',
                    x: 0.0,
                    y: 1.05,
                    xanchor: 'left',
                    yanchor: 'bottom',
                    text: `${selected_id[0].SCH_NAME}'s Trend`,
                    font: {
                        family: 'Arial',
                        size: 30,
                        color: 'rgb(37,37,37)'
                    },
                    showarrow: false
                },
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
        }

        Plotly.newPlot("line-school", line_data, line_layout)
    })
}


// ================================this state level information==================
// Drop down menu

// Drop down menu
function init_state() {

    var pullDownMenu = d3.select('#selDataset_st');

    // Building school information in panel ID_101_210
    d3.json("State_level_info_flipped.json").then((data) => {

        // console.log("state Data", data)
        // Function for grouping the data appropriately
        function groupBy(objectArray, property) {
            return objectArray.reduce((acc, obj) => {
                const key = obj[property];
                if (!acc[key]) {
                    acc[key] = [];
                }
                // Add object to list for given key's value
                acc[key].push(obj);
                return acc;
            }, {});
        }

        // Create a constant to hold the grouped Data
        const group_state = groupBy(data, 'SCHOOL_YEAR');
        // console.log("grouped", group_state)

        // empty lists to store parsed data
        var category_names = []
        var rest_of_data = []

        // push in to the empty list the parsed data 
        for (let [key, value] of Object.entries(group_state)) {
            category_names.push(key)
            rest_of_data.push(value)
        }

        // console.log("category", category_names)


        // // console.log("Drop down IDs", div_sch_id)
        category_names.forEach((x) => {
            pullDownMenu.append("option").property("value", x).text(x);
        })



    })

    buildStateChart('Total Graduates');

}

init_state()

function optionChanged_st(sample_cycle) {
    buildStateChart(sample_cycle);
}

function buildStateChart(id) {
    d3.json("State_level_info_flipped.json").then((data) => {

        // console.log("state Data", data)
        // Function for grouping the data appripriately
        function groupBy(objectArray, property) {
            return objectArray.reduce((acc, obj) => {
                const key = obj[property];
                if (!acc[key]) {
                    acc[key] = [];
                }
                // Add object to list for given key's value
                acc[key].push(obj);
                return acc;
            }, {});
        }

        const grouped_data_st = groupBy(data, 'SCHOOL_YEAR');

        // console.log('grouped data', grouped_data_st)

        // console.log('state category', state_category)
        // console.log('state rest', rest_of_data)

        var selected_cat = grouped_data_st[id]
        // console.log('Selected Data', selected_cat)

        var schoolYear = [];
        var numGrads = [];

        for (let [key, value] of Object.entries(selected_cat[0])) {
            schoolYear.push(key)
            numGrads.push(value)
        }

        schoolYear.splice(0, -1)
        numGrads.splice(0, -1)
        // console.log("school year", schoolYear)

        var trace_line = {
            type: "scatter",
            mode: "lines",
            x: schoolYear,
            y: numGrads,
            line: {
                color: '#17BECF'
            }
        }

        var line_data = [trace_line];

        var line_layout = {
            title: "",
            title: "",
            xaxis: {
                showline: true,
                showgrid: false,
                showticklabels: true,
                linecolor: 'rgb(204,204,204)',
                linewidth: 2,
                autotick: false,
                ticks: 'outside',
                tickcolor: 'rgb(204,204,204)',
                tickwidth: 2,
                ticklen: 5,
                tickfont: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(82, 82, 82)'
                }
            },
            yaxis: {
                showline: true,
                showgrid: false,
                showticklabels: true,
                linecolor: 'rgb(204,204,204)',
                linewidth: 2,
                autotick: true,
                ticks: 'outside',
                tickcolor: 'rgb(204,204,204)',
                tickwidth: 2,
                ticklen: 5,
                tickfont: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(82, 82, 82)'
                }
            },
            autosize: false,
            margin: {
                autoexpand: false,
                l: 100,
                r: 20,
                t: 100
            },
            annotations: [
                {
                    xref: 'paper',
                    yref: 'paper',
                    x: 0.0,
                    y: 1.05,
                    xanchor: 'left',
                    yanchor: 'bottom',
                    text: `State: ${selected_cat[0].SCHOOL_YEAR}`,
                    font: {
                        family: 'Arial',
                        size: 30,
                        color: 'rgb(37,37,37)'
                    },
                    showarrow: false
                },
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
        }

        Plotly.newPlot("line-State", line_data, line_layout)
    })

}






// ===============================Use this if the one above doesn't work====================
// Building chart for State level data
d3.json("State_level_info.json").then((data) => {

    // Function for grouping the data appripriately
    function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            // Add object to list for given key's value
            acc[key].push(obj);
            return acc;
        }, {});
    }

    const grouped_data_SY = groupBy(data, 'SCHOOL_YEAR');


    console.log("OG data", data)

    var school_year = ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"]
    var tot_grad = data.map(x => x.Total_Grads)
    var male_grad = data.map(x => x.Male_Grads)
    var fem_grads = data.map(x => x.Female_Grad)
    var unk_gend_grad = data.map(x => x.Unk_Gender_Grads)
    var asian = data.map(x => x.Asian_Grads)
    var black = data.map(x => x.Black_AfricanAmerican_Grads)
    var white = data.map(x => x.White_Caucasian_Grads)
    var hisp = data.map(x => x.Hispanic_Grads)
    var twoPlus = data.map(x => x.twoPlus_races_non_Hispanic_Grads)
    var unk_race_grad = data.map(x => x.Unspecified_race_Grads)
    var disab = data.map(x => x.Grads_with_Disability)
    var disad = data.map(x => x.Grads_with_Income_Disadvantage)

    console.log("Y data", male_grad)


    var trace_grad = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: tot_grad,
        colorscale: 'Jet',
        name: "Total State "
    }
    var trace_male = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: male_grad,
        colorscale: 'Jet',
        name: "Male "
    }
    var trace_fem = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: fem_grads,
        colorscale: 'Jet',
        name: "Female "
    }
    var trace_unkGend = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: unk_gend_grad,
        colorscale: 'Jet',
        name: "Unspecified/Unknown Gender "
    }
    var trace_asian = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: asian,
        colorscale: 'Jet',
        name: "Asian "
    }
    var trace_black = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: black,
        colorscale: 'Jet',
        name: "Black (African/American)"
    }
    var trace_white = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: white,
        colorscale: 'Jet',
        name: "White/Caucasian"
    }
    var trace_hisp = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: hisp,
        colorscale: 'Jet',
        name: "Hispanic"
    }
    var trace_twoPlus = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: twoPlus,
        colorscale: 'Jet',
        name: "2+ race (Non-hispanic)"
    }
    var trace_unk_race_grad = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: unk_race_grad,
        colorscale: 'Jet',
        name: "Unspecified/Unknown race"
    }
    var trace_disab = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: disab,
        colorscale: 'Jet',
        name: "Disability"
    }
    var trace_disad = {
        type: "scatter",
        mode: "lines",
        x: school_year,
        y: disab,
        colorscale: 'Jet',
        name: "Disadvantage"
    }

    var ST_line_data = [trace_grad,
        trace_male,
        trace_fem,
        trace_unkGend,
        trace_asian,
        trace_black,
        trace_white,
        trace_hisp,
        trace_twoPlus,
        trace_unk_race_grad,
        trace_disab,
        trace_disad];

    var ST_line_layout = {
        title: "",
        autosize: false,
        width: 1500,
        height: 800,
        xaxis: {
            showline: true,
            showgrid: false,
            showticklabels: true,
            linecolor: 'rgb(204,204,204)',
            linewidth: 2,
            autotick: false,
            ticks: 'outside',
            tickcolor: 'rgb(204,204,204)',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: 'rgb(82, 82, 82)'
            }
        },
        yaxis: {
            showline: true,
            showgrid: false,
            showticklabels: true,
            linecolor: 'rgb(204,204,204)',
            linewidth: 2,
            autotick: true,
            ticks: 'outside',
            tickcolor: 'rgb(204,204,204)',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: 'rgb(82, 82, 82)'
            }
        },
        autosize: true,
        annotations: [
            {
                xref: 'paper',
                yref: 'paper',
                x: 0.0,
                y: 1.05,
                xanchor: 'left',
                yanchor: 'bottom',
                text: `State Chart - Static `,
                font: {
                    family: 'Arial',
                    size: 30,
                    color: 'rgb(37,37,37)'
                },
                showarrow: false
            },
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
    }

    Plotly.newPlot("line-State-static", ST_line_data, ST_line_layout)
})

