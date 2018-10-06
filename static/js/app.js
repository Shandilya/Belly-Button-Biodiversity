var selDataset = document.getElementById("selDataset");
var samplemetadata = document.getElementById("sample-metadata");
var pie = document.getElementById("pie");
var bubble = document.getElementById("bubble");
var gauge = document.getElementById("gauge");

d3.json("/names",function(error, response){
  if (error) return console.log(error);
  var vals = response;
  console.log(vals);
  for (i=0; i< vals.length;i++){
    var options = document.createElement("option");
    options.setAttribute("value", vals[i]);
    options.innerHTML=vals[i];
    selDataset.appendChild(options);
  } 
});


function init() {
  Plotly.d3.json("/metadata/940", function(error,response){
    if (error) return console.log(error);
    var keys = Object.keys(response);
    console.log("key is "+ keys);
    for (var j= 0; j< keys.length;j++){
       var initoption = document.createElement("initoption");
       initoption.innerHTML=`${keys[j]}:${response[keys[j]]}}`;
       samplemetadata.appendChild(initoption);
    }
    // getdata(sampleNames[0],buildcharts);
    });

    // Working on Pie
    d3.json("/samples/940", function(error,response){
      if (error) console.log(error);
      var id_slice = response.otu_ids.slice(0,10);
      var val_slice = response.sample_values.slice(0,10);

      var pie_ids  = [];
      var pie_values =[];

      for (var i = 0 ; i<val_slice.length; i++){
        if (val_slice != 0){
          pie_ids.push(id_slice[i]);
          pie_values.push(val_slice[i]);
        }
      }
      var pie_labels = [];
      for (var i = 0; i< pie_ids.length; i++){
        pie_labels.push(response[pie_ids[i]]);
      }
      var pie_chart = [{
        values: pie_values,
        labels: pie_ids,
        type: "pie",
        hovertext: pie_labels
      }];

      Plotly.newPlot("pie",pie_chart);
    });
//  Working on Bubble
      var bubble_ids  = [];
      var bubble_values =[];

      for (var i = 0 ; i<response.sample_values.length; i++){
        if (response.sample_values.length != 0){
          bubble_ids.push(response.otu_ids[i]);
          bubble_values.push(response.sample_values[i]);
        };
      };

    var bubble_labels = [];
      for (var i = 0; i< bubble_ids.length; i++){
        bubble_labels.push(response[bubble_ids[i]]);
      }

    var bubble_chart = [{
        x: bubble_ids,
        y: bubble_values,
        mode:"markers",
        text: bubble_labels,
        hovertext: bubble_labels
      }];

      var bubble_layout = {
              }
      Plotly.newPlot("bubble",bubble_chart);
   

}



function buildMetadata(data) {
  var panel = document.getElementById("sample-metadata");
  panel.innerHTML="";
  for (var i in samplevalue){
    ele_title = document.createElement("h5");
    ele_text = document.createTextNode(`${i}:${samplevalue[i]}`);
    ele_title.append(ele_text);
    panel.appendChild(ele_title);
  }
}



function getdata(sample,display){
  Plotly.d3.json('/samples/${sample}',function(error,sampledata){
    if(error) return console.warn(error);
    display(sampledata);
      });
  Plotly.d3.json('/metadata/${sample}',function(error, metadata){
    if (error) return console.warn(error);
    buildMetadata(metadata);
  });
}


function optionChanged(dataset) {
    var dataurl = `/metadata/${dataset}`;
    d3.json(dataurl, function(error,response){
      if (error) return console.log(error);
      samplemetadata.innerHTML="";
      var keys = Object.keys(response);
      for (var i =0; i<keys.length; i++){
        var p = document.createElement("p");
        p.innerHTML=`${keys[i]}: ${response[keys[i]]}}`;
        samplemetadata.appendChild(p);
       };
    });

    var ploturl = `/samples/${dataset}`;
    d3.json(dataurl, function(error,response){
      if (error) return console.log(error);
      var newpie= {};
      new newbubble = {};

      var id_slice = response.otu_ids.slice(0,10);
      var val_slice = response.sample_values.slice(0,10);
      
    var pie_ids= [];
    var pie_values=[];
    for (var i = 0 ; i<val_slice.length; i++){
        if (val_slice != 0){
          pie_ids.push(id_slice[i]);
          pie_values.push(val_slice[i]);
        };
      };
    
    newpie["values"]=pie_values;
    newpie["labels"]=pie_labels;

    var bubble_ids= [];
    var bubble_values=[];
    for (var i = 0; i< response.sample_values.length; i++){
      if (response.sample_values[i] != 0){
        bubble_ids.push(response.otu_ids[i]);
        bubble_values.push(response.sample_values[i]);
      };
    };
    newbubble["x"]=bubble_ids;
    newbubble["y"]=bubble_values;
    
    var pie_labels = [];
      for (var i = 0; i< pie_ids.length; i++){
        pie_labels.push(response[pie_ids[i]]);
      }

    var bubble_labels = [];
      for (var i = 0; i< bubble_ids.length; i++){
        bubble_labels.push(response[bubble_ids[i]]);
      }


    }
    
    init();
  


    
