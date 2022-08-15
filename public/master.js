
const loadRating = () => {
    fetch('/order')
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            const arrOfCountries = [];
            for (let singleCountry of res) {
                arrOfCountries.push(singleCountry);
            }
            graph_flights_ratings(arrOfCountries);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            console.log("flights Ratings loaded successfully")
        })
}

function graph_flights_ratings(rating_json){
    //proportion for the graph kavim -> yaani amudot.
    const margin = {top: 10 , right: 10, bottom: 30, left: 10};
    const width = 1200 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#rating_garph")
        .append('svg')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleBand()
        .domain(d3.range(rating_json.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top]);

    svg
        .append("g")
        .selectAll("rect")
        .data(rating_json)
        .join("rect")
        .attr("fill", d => {
            return 'royalblue';})
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d.Rating))
        .attr('title', (d) => d.Rating)
        .attr("class", "rect")
        .attr("height", d => y(0) - y(d.Rating))
        .attr("width", x.bandwidth());

    // creating names for the axis
    function yAxis(g) {
        g.attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(null, rating_json.format))
            .attr("font-size", '15px')
    }
    function xAxis(g) {
        g.attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat(i => rating_json[i].Name))
            .attr("font-size", '15px')
    }

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
    svg.node();
}

function createFlight(name,URL,duration,departure,arrivle,price,temperature,continent,date,category,API){
    console.log(name);
    // $.post("/create", obj);
    $.ajax({
      url: "http://localhost:8080/create",
      type: "POST",
      data: JSON.stringify({ name: name ,
        URL:URL,
        duration:duration,
        departure:departure,
        arrivle:arrivle,
        price:price,
        temperature:temperature,
        continent:continent,
        date:date,
        category:category,
        API:API
      }),
      contentType: "application/json",
      dataType: "json",
      success: function() {
        console.log("request successfully!");
        window.alert("Created successfully");
      }
    });
  }

  function findFlight(name,characteristic,new_val){
    $.get("/allflights",(data)=>{
        var _id="-1";
        for (var i = 0; i < data.length; i++){
         if(data[i].Name==name){
           _id=data[i]._id; 
            break;
         }
        }
        if(_id=="-1"){
         window.alert("There is no flight as requested");
         return;
        }
        
        var new_val_final;
        if((characteristic=="Duration")||(characteristic=="Price")||(characteristic=="Temperature")||(characteristic=="Rating"))
        new_val_final=parseInt(new_val);

        else new_val_final=new_val;
            $.ajax({
            url: "http://localhost:8080/update",
            type: "PUT",
            data: JSON.stringify({ "_id":_id,
                "characteristic":characteristic,
                "value":new_val_final}),
            contentType: "application/json",
            dataType: "json",
            success: function() {
              console.log("request successfully!");
              window.alert("successfully updated");
            }
          });
    })
}

  //})



