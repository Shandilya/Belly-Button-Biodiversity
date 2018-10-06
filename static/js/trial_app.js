var default_url = "/names";
var $select = Plotly.d3.select('#selDataset');
Plotly.d3.json(default_url, (error, data) => {
    if (error) return console.warn(error);
    data.forEach((value, index) => {
        $select
            .append('option')
                .attr('value', value)
                    .html(value);
    });

    sampleMetaData(data[0]);
    pieChart(data[0]);
    bubbleChart(data[0]);
    gaugechart(data[0]);
});

function optionChanged(value){
  sampleMetaData(value);
  pieChart(value);
  bubbleChart(value);
  gaugechart(value);
}



function sampleMetaData(value){
  url = "/metadata/";
  Plotly.d3.json(url + value, (error, data) => {
      if (error) return console.warn(error);
      $cardText = Plotly.d3.select('#sample-metadata');
      $cardText.html('');
      Object.keys(data).forEach((key) => {
          $cardText
              .append('text')
                  .html(key + ": " + data[key])
              .append('br')
              .append('br')
      });
  });

}

function pieChart(value){
  url = "/samples/";
  Plotly.d3.json(url + value, (error, data) => {
      if (error) return console.warn(error);
      // Plotly.d3.json('/otu', (e,d) => {
      //   if (e) return console.warn(e);
      var labelIndex = data.otu_ids.slice(0,10);
        var trace1 = {
          values: data.sample_values.slice(0,10),
          labels: data.otu_ids.slice(0,10),
          marker: {colors: ['rgba(10, 84, 0, .5)', 'rgba(12, 97, 0, .5)', 'rgba(13, 113, 0, .5)', 'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)', 'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)', 'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)', 'rgba(245, 240, 222, .5)']},
          hole: .4,
          type: 'pie',
          text: labelIndex.map( x => data[x]),
          textinfo: 'percent',
          hoverinfo: 'label+text+value'
        };

        var plotData = [trace1];
        var layout = {
              };
        return Plotly.newPlot("pie", plotData,layout);
      });
}

function bubbleChart(value){
  url = "/samples/";
  Plotly.d3.json(url + value, (error, data) => {
      if (error) return console.warn(error);
      var trace1 = {
            x: data.otu_ids,
            y: data.sample_values,
            text: data,
            hoverinfo: "x+y+text",
            mode: "markers",
            marker: {
                size: data.sample_values,
                color: data.otu_ids
            }
        };
        var plotData = [trace1]
        var layout = {
           showLegend: false
              }
        return Plotly.newPlot("bubble", plotData,layout)

      });
}

function gaugechart(value){
  var level = 175
  var degrees = 180 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);
var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'Scrubs Per week',
    text: level,
    hoverinfo: 'text+name'},
    { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
    rotation: 90,
    text: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9"],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                         'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                         'rgba(255, 255, 255, 0)']},
    labels: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9"],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: 'Belly Button Washing Frequency Scrubs per week',
  height: 700,
  width: 700,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);




}