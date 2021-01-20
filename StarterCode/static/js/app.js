

d3.json("samples.json").then((data) => {


        data.names.forEach(name => {
                d3.select("#selDataset").append("option").text(name)
        });


        function init() {

                var filteredData = data.samples.filter(x => x.id === "940");
                console.log(filteredData);
        }

        d3.selectAll("#selDataset").on("change", function () {
                //var dropdownMenu = d3.select("#selDataset");
                // Assign the value of the dropdown menu option to a variable
                var dataset = d3.select(this).property("value");
                console.log(dataset);
                var filteredData = data.samples.filter(x => x.id === dataset);
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



        });


        init();
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
});





