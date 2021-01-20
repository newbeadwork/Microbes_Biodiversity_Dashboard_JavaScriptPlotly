
d3.json("samples.json").then((data) => {


        data.names.forEach(name => {
                d3.select("#selDataset").append("option").text(name);
        })
})
d3.selectAll("#selDataset").on("change", optionChanged);

function init() {
        d3.json("samples.json").then((data) => {
                var board = d3.select("#sample-metadata");

                board.html("");
        
                
        
                        var chosenMetadata = data.metadata.filter(x => x.id == "940");
                        console.log(chosenMetadata);
        
                        Object.entries(chosenMetadata[0]).forEach(([key, value]) => {
                                board.append("h4").text(`${key}: ${value}`);
                                
                        });
        
                
                var filteredData = data.samples.filter(x => x.id === "940");
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

                Plotly.newPlot("bar", data, layout);
        }); 
}

function optionChanged() {

        var dataset = d3.select(this).property("value");

        buildPlot(dataset);
        buildTable(dataset);
        buildBubble(dataset);
}


function buildPlot(dataset) {
        d3.json("samples.json").then((data) => {

                var filteredData = data.samples.filter(x => x.id === dataset);
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

                Plotly.newPlot("bar", data, layout);
        });
}

function buildTable(dataset) {


        var board = d3.select("#sample-metadata");

        board.html("");

        d3.json("samples.json").then((data) => {

                var chosenMetadata = data.metadata.filter(x => x.id == dataset);
                console.log(chosenMetadata);

                Object.entries(chosenMetadata[0]).forEach(([key, value]) => {
                        board.append("h4").text(`${key}: ${value}`);
                        
                });

        })
}
function buildBubble(dataset) {
        d3.json("samples.json").then((data) => {

                var filteredData = data.samples.filter(x => x.id === dataset);

                var microbesID = filteredData.map(x => x.otu_ids);
                var microbesSpiecies = filteredData.map(x => x.otu_labels);
                var microbesValues = filteredData.map(x => x.sample_values);
                console.log(filteredData);
                console.log(microbesID[0]);
                console.log(microbesSpiecies[0]);
                console.log(microbesValues[0]);
                //microbesID.forEach(console.log(`OTU ${microbesID[0]}`));

                var trace1 = {
                        x: microbesID[0],
                        y: microbesValues[0],
                        mode: 'markers',
                        marker: {
                                size: microbesValues[0]
                        }
                };


                var data = [trace1];


                var layout = {
                        title: "top 10 OTUs found in that individual",

                };

                Plotly.newPlot("bubble", data, layout);


        });




}
init();