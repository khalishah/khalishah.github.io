// Load external data and boot
Promise.all([d3.json("sgmap.json"), d3.csv("population2020.csv")]).then(data => {
    const array = ["PopMale", "PopFemale"]
    
    // Data Binding of Population Numbers to Subzone Polygons
    array.forEach(function (item, index) {
        // Loop through each subzone
        for (var i = 0; i < data[1].length; i++) {

            var dataSubzone = data[1][i].Subzone.toLowerCase();
            var dataValue = data[1][i][item];

            // Match Subzone values from both files
            for (var j = 0; j < data[0].features.length; j++) {
                var jsonSubzone = data[0].features[j].properties.Name.toLowerCase();
                
                if (dataSubzone == jsonSubzone) {
                    data[0].features[j].properties[item] = dataValue;
                    break;
                }
            }
        }
    });

    console.log(JSON.stringify(data[0]))

});