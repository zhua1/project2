d3.csv('drugTop10ByCountry.csv', function(data) {
    // Create dropdown name
    d3.select("body")
    .append('h5')
    .text('Select Country');

    // Create a dropdown
	d3.select("body")
    .append("select")
    .attr("id", "countrySelector")
    .selectAll("option")
    .data(d3.map(data, function(d){return d.Country;}).keys().sort(d3.ascending))
    .enter()
    .append("option")
    .text(function(d) {return d;})
    .attr("value", function(d){
        return d;
    });

    function graphSomething(countryName) {

        var d3 = Plotly.d3;
        d3.select('#graph').remove();
        d3.select('svg').remove();
        
        var WIDTH_IN_PERCENT_OF_PARENT = 90,
            HEIGHT_IN_PERCENT_OF_PARENT = 80;

        var gd3 = d3.select('body')
            .append('div')
            .attr('id','graph')
            .style({
                width: WIDTH_IN_PERCENT_OF_PARENT + '%',
                'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',
        
                height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
                'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh'
            });
        
        var gd = gd3.node();    

        var drugs = [];
        var counts = [];
        var country = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].Country == countryName) {
                country.push(data[i].Country);
                drugs.push(data[i].Drug);
                counts.push(parseInt(data[i].Values))
            };
        };

        Plotly.plot(gd, [{
            x: drugs,
            y: counts,
            marker: {color: 'Teal'},
            type: 'bar'
            }], {
            title: 'Popular Drugs in ' + country.slice(0,1),
            font: {
                size: 12
            }
            });
        window.onresize = function() {
            Plotly.Plots.resize(gd);
        };
    };        

    graphSomething('Australia');

    d3.select("#countrySelector")
    .on("change", function(d) {
        graphSomething(this.value);
    });
});