
d3.json("samples.json").then((data) => {

        
        data.names.forEach(name => {
                d3.select("#selDataset").append("option").text(name);
        })
})
d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
            
        var dataset = d3.select(this).property("value");
        //console.log(dataset);
        updateDash(dataset);
        }

function updateDash(dataset) {
        buildPlot(dataset);
 
}
function buildPlot(dataset) {
d3.json("samples.json").then((data) => {

       /* function init() {

                var filteredData = data.samples.filter(x => x.id === "940");
                console.log(filteredData);
                filteredData.sort(function compareFunction(firstObj, secondObj) {
                        return firstObj.sample_values - secondObj.sample_values;
                });

                var microbesID = filteredData.map(x => x.otu_ids.slice(0, 10));
                var microbesSpiecies = filteredData.map(x => x.otu_labels.slice(0, 10));
                var microbesValues = filteredData.map(x => x.sample_values.slice(0, 10));
                console.log(filteredData);
                console.log(microbesID);
                console.log(microbesSpiecies);
                console.log(microbesValues);
                
                /*var trace1 = {
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

        }

        /*d3.selectAll("#selDataset").on("change", function optionChanged() {
                
                var dataset = d3.select(this).property("value");
                console.log(dataset);*/
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
                        title: "top 10 OTUs found in that individual",
 
                };
 
                Plotly.newPlot("bar", data, layout); 
                /*var data = [{
                        type: 'bar',
                        x: microbesValues[0],
                        y: microbesID[0],
                        orientation: 'h'
                      }];
                      
                      Plotly.newPlot('bar', data);*/

        });


        //init();
        /*function handleChange() {
          // Prevent the page from refreshing
          d3.event.preventDefault();
        
          
          buildPlot(id);
        }
        
        function buildPlot(id) {
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
        }

       */
//});

}




