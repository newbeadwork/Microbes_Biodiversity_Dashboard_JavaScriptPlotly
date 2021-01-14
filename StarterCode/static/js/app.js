//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.



        //var x = sample_values.sort(function compare(a, b) {
//   return a - b;
// });
//var topTen = x.slice(0, 10)

//Use sample_values as the values for the bar chart.

//Use otu_ids as the labels for the bar chart.

//Use otu_labels as the hovertext for the chart.




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


});