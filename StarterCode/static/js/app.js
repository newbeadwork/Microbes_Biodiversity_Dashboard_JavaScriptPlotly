
/*d3.json("samples.json").then((data) => {

        data.names.forEach(name => {
                d3.select("#selDataset").append("option").text(name);
        })
})*/
function init() {
        d3.json("samples.json").then((data) => {
                data.names.forEach(name => {
                        d3.select("#selDataset").append("option").text(name);
                });
                optionChanged("940");
                /*var board = d3.select("#sample-metadata");

                board.html("");



                var chosenMetadata = data.metadata.filter(x => x.id == "940");
                console.log(chosenMetadata);

                Object.entries(chosenMetadata[0]).forEach(([key, value]) => {
                        board.append("h4").text(`${key}: ${value}`);

                });*/


               /* var filteredData = data.samples.filter(x => x.id === "940");
                filteredData.sort(function compareFunction(firstObj, secondObj) {
                        return firstObj.sample_values - secondObj.sample_values;
                });

                var microbesID = filteredData.map(x => x.otu_ids.slice(0, 10));
                var microbesSpiecies = filteredData.map(x => x.otu_labels.slice(0, 10));
                var microbesValues = filteredData.map(x => x.sample_values.slice(0, 10));
                console.log(filteredData);
                console.log(microbesID[0]);
                console.log(microbesSpiecies[0]);
                console.log(microbesValues[0]);


                var trace1 = {
                        x: microbesValues[0],
                        y: microbesID[0],
                        text: microbesSpiecies[0],
                        name: "Something",
                        type: "bar",
                        orientation: "h"
                };

                var data = [trace1];

                var layout = {
                        title: "OTUs found in that individual",

                };

                Plotly.newPlot("bar", data, layout);*/
        });
}
d3.selectAll("#selDataset").on("change", function () {
        var dataset = d3.select(this).property("value");
        optionChanged(dataset);
        }

);



function optionChanged(dataset) {

        
        d3.json("samples.json").then((data) => {
                var filteredData = data.samples.filter(x => x.id === dataset);
                console.log(filteredData);
                var chosenMetadata = data.metadata.filter(x => x.id == dataset)[0];

                buildBubble(filteredData);
                buildBar(filteredData);
                buildTable(chosenMetadata);
                buildGauge(chosenMetadata);
        });

}

function buildBubble(filteredData) {

        var microbesID = filteredData.map(x => x.otu_ids)[0];
        var microbesSpiecies = filteredData.map(x => x.otu_labels)[0];
        var microbesValues = filteredData.map(x => x.sample_values)[0];
        console.log(microbesID);
        console.log(microbesValues);
        
        var dataBubble = [{
                
                x: microbesID,
                y: microbesValues,
                text: microbesSpiecies,
                mode: 'markers',
                marker: {
                        color: microbesID,
                        colorscale: [[0, 'rgb(239, 177, 40)'], [1, 'rgb(0, 0, 255)']],
                        size: microbesValues
                        
                }
        }];

        var layoutBubble = {
                title: "OTUs found in that individual",
                height: 600,
                width: 1000


        };

        Plotly.newPlot("bubble", dataBubble, layoutBubble);
}
function buildBar(filteredData) {
        
        var microbesIDtop10 = filteredData.map(x => x.otu_ids.slice(0, 10))[0];
        var microbesSpieciesTop10 = filteredData.map(x => x.otu_labels.slice(0, 10))[0];
        var microbesValuesTop10 = filteredData.map(x => x.sample_values.slice(0, 10))[0];
        console.log(microbesValuesTop10);
        var microbesIDNames = [];
        microbesIDtop10.forEach(x => {
                microbesIDNames.push(`OTU ${x}`);
        })
        var dataBar = [{

                x: microbesValuesTop10,
                y: microbesIDNames,
                text: microbesSpieciesTop10,
                name: "Something",
                type: "bar",
                orientation: "h",
                marker: {
                        color: 'rgb(142,124,195)'
                      }

        }];

        var layoutBar = {
                title: "top 10 OTUs found in that individual",

        };

        Plotly.newPlot("bar", dataBar, layoutBar);

}

function buildTable(chosenMetadata) {

        var board = d3.select("#sample-metadata");

        board.html("");

        Object.entries(chosenMetadata).forEach(([key, value]) => {
                board.append("h4").text(`${key}: ${value}`);

        });

}
function buildGauge(chosenMetadata) {
       
        var dataGauge = [
                {
                  domain: { x: [0, 1], y: [0, 1] },
                  value: chosenMetadata.wfreq,
                  title: { text: "Belly Button Washing Frequency (scrubs per week)" },
                  type: "indicator",
                  mode: "gauge+number",
                  
                  gauge: {
                    axis: { range: [null, 10] },
                    steps: [
                      { range: [0, 1], color: "lightgray" },
                      { range: [1, 2], color: "lightgray" },
                      { range: [2, 3], color: "lightgray" },
                      { range: [3, 4], color: "lightgray" },
                      { range: [4, 5], color: "lightgray" },
                      { range: [5, 6], color: "lightgray" },
                      { range: [6, 7], color: "lightgray" },
                      { range: [7, 8], color: "lightgray" },
                      { range: [8, 9], color: "gray" }
                    ],
                    
                  }
                }
              ];
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot("gauge", dataGauge, layout);

}

init();