



//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.



        //var x = sample_values.sort(function compare(a, b) {
//   return a - b;
// });
//var topTen = x.slice(0, 10)

//Use sample_values as the values for the bar chart.

//Use otu_ids as the labels for the bar chart.

//Use otu_labels as the hovertext for the chart.


d3.json("samples.json").then(function (data) {
    console.log(data.samples);
    var microbesValues = data.samples.map(x => x.sample_values);
    var microbesID = data.samples.map(x => x.otu_ids);
    var microbesSpiecies = data.samples.map(x => x.otu_labels);
    console.log(microbesID);
    console.log(microbesSpiecies);
    console.log(microbesValues);

});

