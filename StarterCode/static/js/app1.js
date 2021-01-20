d3.json("samples.json").then((data) => {

    data.names.forEach(name => {
        d3.select("#selDataset").append("option").text(name);
    });
})

d3.selectAll("#selDataset").on("change", optionChanged);


function optionChanged() {

    var dataset = d3.select(this).property("value");
    d3.json("samples.json").then((data) => {
        var filteredData = data.samples.filter(x => x.id === dataset);
        filteredData.sort(function compareFunction(firstObj, secondObj) {
            return firstObj.sample_values - secondObj.sample_values;
        });
        var chosenMetadata = data.metadata.filter(x => x.id == dataset)[0];
        buildPlot(filteredData);
        buildTable(chosenMetadata);
    });

}

function buildPlot(filteredData) {


    var microbesID = filteredData.map(x => x.otu_ids)[0];
    var microbesSpiecies = filteredData.map(x => x.otu_labels)[0];
    var microbesValues = filteredData.map(x => x.sample_values)[0];
   // console.log(microbesID);
    var microbesIDtop10 = microbesID.slice(0, 10);
    var microbesSpieciesTop10 = microbesSpiecies.slice(0, 10);
    var microbesValuesTop10 = microbesValues.slice(0, 10);
    console.log(microbesValuesTop10);
    var dataBar = [{

        x: microbesValuesTop10,
        y: microbesIDtop10,
        text: microbesSpieciesTop10,
        name: "Something",
        type: "bar",
        orientation: "h"

    }];

    var layoutBar = {
        title: "top 10 OTUs found in that individual",

    };

    Plotly.newPlot("bar", dataBar, layoutBar);

    var dataBubble = [{
        x: microbesValues,
        y: microbesID,
        text: microbesSpiecies,
        mode: 'markers',
        marker: {
            size: microbesValues
        }
    }];

    var layoutBubble = {
        title: "OTUs found in that individual",

    };

    Plotly.newPlot("bubble", dataBubble, layoutBubble);

}

function buildTable(chosenMetadata) {

    var board = d3.select("#sample-metadata");

    board.html("");

    Object.entries(chosenMetadata).forEach(([key, value]) => {
        board.append("h4").text(`${key}: ${value}`);

    });


}
