// Drop down menu
function init() {

    var pullDownMenu = d3.select('#selDataset');

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

function optionChanged(sample_cycle) {
    buildPanel(sample_cycle);
    buildCharts(sample_cycle);
}

init()

// Building Panel 
function buildPanel(id) {
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

        var selected_id = grouped_data_1[id]
        console.log("ID_101_210", selected_id)

        // identify panel 
        var panel = d3.select("#sample-metadata");

        // Make sure panel is clear before loading metadata
        panel.html("");

        // collect all the data in json (key value pairs) and put them in the panel
        Object.entries(selected_id[0]).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);

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

        console.log("grouped data", grouped_data)
        // empty lists to store parsed data
        var div_sch_id = []
        var rest_of_data = []

        // push in to the empty list the parsed data 
        for (let [key, value] of Object.entries(grouped_data)) {
            div_sch_id.push(key)
            rest_of_data.push(value)
        }

        var selected_id = grouped_data[id]

        console.log("selected_id", selected_id)

        var schoolYear = [];
        var numGrads = [];

        for (let [key, value] of Object.entries(selected_id[0])) {
            schoolYear.push(key)
            numGrads.push(value)
        }

        schoolYear.splice(0, 2)
        numGrads.splice(0, 2)

        // console.log("schoolYear", schoolYear) 
        // console.log("numGrads", numGrads) 

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
            title: `Number of grad students through out the years for ${selected_id[0].SCH_NAME}`
        }

        Plotly.newPlot("line-school", line_data, line_layout)
    })
}


// ================================this chart is static==================
// Building chart for State level data
d3.json("2008-2019_GradbySTATE.json").then((data) => {

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

    // console.log('grouped data', grouped_data_SY)

    const grouped_data_GN = groupBy(data, 'COHORT_CNT');

    var State_Year = [];
    var State_GradNum = [];


    for (let [key, value] of Object.entries(grouped_data_SY)) {
        State_Year.push(key)
    }

    for (let [key, value] of Object.entries(grouped_data_GN)) {
        State_GradNum.push(key)
    }

    // console.log("school year", State_Year)

    var State_GradNum = State_GradNum.map(x => +x)
    // console.log("school grads", State_GradNum)

    var trace_line_ST = {
        type: "scatter",
        mode: "lines",
        x: State_Year,
        y: State_GradNum,
        line: {
            color: '#17cf2c'
        }
    }

    var ST_line_data = [trace_line_ST];

    var ST_line_layout = {
        title: 'State Level Graduates',
        height: 600,
        width: 1200,
        // hovermode: "closest",
        xaxis: { title: "School Year" }
    }

    Plotly.newPlot("line-State", ST_line_data, ST_line_layout)
})

