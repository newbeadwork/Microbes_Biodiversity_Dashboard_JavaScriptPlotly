
function init() {
        d3.json("samples.json").then((data) => {
                data.names.forEach(name => {
                        d3.select("#selDataset").append("option").text(name);
                });
                optionChanged("940");
                
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
                        colorscale: [[0, 'rgb(239, 150, 40)'], [1, 'rgb(0, 0, 255)']],
                        size: microbesValues
                        
                }
        }];

        var layoutBubble = {
                title: "Microorganisms found on the test subject",
                height: 1000,
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
                type: "bar",
                orientation: "h",
                marker: {
                        color: "rgb(142,124,195)"
                      }

        }];

        var layoutBar = {
                title: "Top 10 microorganisms found on the test subject",

        };

        Plotly.newPlot("bar", dataBar, layoutBar);

}

function buildTable(chosenMetadata) {

        var board = d3.select("#sample-metadata");

        board.html("");

        Object.entries(chosenMetadata).forEach(([key, value]) => {
                board.append("h5").text(`${key}: ${value}`);

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
                    axis: { range: [null, 9] },
                    bar: { color: "rgb(0, 142, 140)" },
                    steps: [
                      { range: [0, 1], color: "rgb(239, 230, 100)" },
                      { range: [1, 2], color: "rgb(239, 220, 100)" },
                      { range: [2, 3], color: "rgb(239, 210, 100)" },
                      { range: [3, 4], color: "rgb(239, 200, 100)" },
                      { range: [4, 5], color: "rgb(239, 190, 100)" },
                      { range: [5, 6], color: "rgb(239, 180, 100)" },
                      { range: [6, 7], color: "rgb(239, 170, 100)" },
                      { range: [7, 8], color: "rgb(239, 160, 100)" },
                      { range: [8, 9], color: "rgb(239, 150, 100)" }
                    ],
                    
                  }
                }
              ];
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot("gauge", dataGauge, layout);

}

init();