



function buildPlot() {
        d3.json("samples.json").then(function (data) {
                data.samples.sort(function compareFunction(firstObj, secondObj) {
                        return firstObj.sample_values - secondObj.sample_values;
                });
                console.log(data.samples);
        
                var microbesID = data.samples.map(x => x.otu_ids.slice(0, 10));
                var microbesSpiecies = data.samples.map(x => x.otu_labels.slice(0, 10));
                var microbesValues = data.samples.map(x => x.sample_values.slice(0, 10));
                console.log(microbesID);
                console.log(microbesSpiecies);
                console.log(microbesValues);
        
                var trace1 = {
                        x: microbesValues,
                        y: microbesID,
                        text: microbesSpiecies,
                        name: "Something",
                        type: "bar",
                        orientation: "h"
                      };
                      
                      // data
                      var data = [trace1];
                      
                      //  Create a layout, what else can you do here besides titles?
                      var layout = {
                        title: "top 10 OTUs found in that individual",
                        margin: {
                          l: 100,
                          r: 100,
                          t: 100,
                          b: 100
                        }
                      };
        
        Plotly.newPlot("bar", data, layout);
        });
        
        //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

//Use sample_values as the values for the bar chart.

//Use otu_ids as the labels for the bar chart.

//Use otu_labels as the hovertext for the chart.
        

}


buildPlot();