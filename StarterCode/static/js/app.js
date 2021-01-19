

function buildPlot() {


        d3.json("samples.json").then((data) => {
                console.log(data);
                data.samples.sort(function compareFunction(firstObj, secondObj) {
                        return firstObj.sample_values - secondObj.sample_values;
                });
                console.log(data.samples);
                var participantID = data.samples.map(x => x.id);
                var microbesID = data.samples.map(x => x.otu_ids.slice(0, 10));
                var microbesSpiecies = data.samples.map(x => x.otu_labels.slice(0, 10));
                var microbesValues = data.samples.map(x => x.sample_values.slice(0, 10));
                console.log(participantID)
                console.log(microbesID);
                console.log(microbesSpiecies);
                console.log(microbesValues);


                //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

                //Use sample_values as the values for the bar chart.

                //Use otu_ids as the labels for the bar chart.

                //Use otu_labels as the hovertext for the chart.

                var selectDropdown = d3.select("#selDataset")



                participantID.forEach(name => {
                        var appendOption = selectDropdown.append("option").text(name);
                })



                var trace1 = {
                        x: microbesValues,
                        y: microbesID,
                        text: microbesSpiecies,
                        name: "Something",
                        type: "bar",
                        orientation: "h"
                };


                var data = [trace1];


                var layout = {
                        title: "top 10 OTUs found in that individual",

                };

                Plotly.newPlot("bar", data, layout);
        });

}

buildPlot();

