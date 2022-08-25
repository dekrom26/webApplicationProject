function showallFlights() {
  $("#search").empty();
  $("#main").empty();
  $("#create").empty();
  $("#update").empty();
  $("#delete").empty();
  $("#graphs").empty();
  $("#users").empty();
  $("#search").append(showSearch());
  $.get("/allflights", function (data, status) {
    for (var i = 0; i < data.length; i++) {
      $("#main").append(
        showCardMater(
          i,
          data[i].Name,
          data[i].Date,
          data[i].URL,
          data[i].Duration,
          data[i].Departure,
          data[i].Arrivle,
          data[i].Price,
          data[i].Temperature,
          data[i].Continent,
          data[i].Category
        )
      );
    }
  });
}

function showSearch() {
  return `<div class="input-group">
  <div class="form-outline">
    <input type="search" id="form1" class="form-control" />
    <label class="form-label" for="form1">Search</label>
  </div>
  <button type="button" onclick=search(document.getElementById("form1").value) class="btn btn-primary">
    <i class="fa fa-search"></i>
  </button>
</div>`;
}

function search(name) {
  console.log(name);
  $("#main").empty();
  $.get("/allflights", function (data, status) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].Name == name) {
        $("#main").append(
          showCardMater(
            i,
            data[i].Name,
            data[i].Date,
            data[i].URL,
            data[i].Duration,
            data[i].Departure,
            data[i].Arrivle,
            data[i].Price,
            data[i].Temperature,
            data[i].Continent,
            data[i].Category
          )
        );
      }
    }
  });
}

function showCardMater(
  i,
  name,
  date,
  url,
  duration,
  Departure,
  Arrivle,
  Price,
  Temperature,
  Continent,
  Category
) {
  return `<section class="light">
    <body>
    <div class="container py-2">
      <article class="postcard light blue">
        <a class="postcard__img_link" href="#">
          <img
            class="postcard__img"
            src="${url}"
            alt="Image Title"
          />
        </a>
        <div class="postcard__text t-light">
          <h1 class="postcard__title blue"><a href="#">${name}</a></h1>
    
          <div class="postcard__subtitle small">
              <i class="fas fa-calendar-alt mr-2"></i>${date}
          </div>
          <div class="postcard__bar"></div>
       
          <ul class="postcard__tagbox">
            <li class="tag__item"><i class="fas fa-clock mr-2"></i>Duration(Hours): ${duration}</li>
            <li class="tag__item"><i class="fas fa-clock mr-2"></i>Departure: ${Departure}</li>
            <li class="tag__item"><i class="fas fa-clock mr-2"></i>Arrivle: ${Arrivle}</li>
            <li class="tag__item"><i class="fas fa-clock mr-2"></i>Price: ${Price} $</li>
            <li class="tag__item"><i class="fas fa-clock mr-2"></i>Temperature: ${Temperature}</li>
            <li class="tag__item"><i class="fas fa-clock mr-2"></i>Continent: ${Continent}</li>
            <li class="tag__item"><i class="fas fa-clock mr-2"></i>Category: ${Category}</li>          
            </div>
            </li>
            </li>
          </ul>
        </div>
     
    </div>
    </section>
    <body>
    `;
}

function loadRatings() {
  fetch("/allflights")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const arrOfFlights = [];
      for (let singleFlight of res) {
        arrOfFlights.push(singleFlight);
      }
      graph_flights_ratings(arrOfFlights);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("flights Ratings loaded successfully");
    });
}
function loadSales() {
  fetch("/allflights")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const arrOfFlights = [];
      for (let singleFlight of res) {
        arrOfFlights.push(singleFlight);
      }
      graph_flights_sales(arrOfFlights);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("flights Ratings loaded successfully");
    });
}

function graph_flights_ratings(flights_json) {
  const margin = { top: 10, right: 10, bottom: 30, left: 10 };
  const width = 1200 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#rating_garph")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

  const x = d3
    .scaleBand()
    .domain(d3.range(flights_json.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

  svg
    .append("g")
    .selectAll("rect")
    .data(flights_json)
    .join("rect")
    .attr("fill", (d) => {
      return "green";
    })
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.Rating))
    .attr("title", (d) => d.Rating)
    .attr("class", "rect")
    .attr("height", (d) => y(0) - y(d.Rating))
    .attr("width", x.bandwidth());

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2 + 10)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Flights ratings");

  // creating names for the axis
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, flights_json.format))
      .attr("font-size", "15px");
  }
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((i) => flights_json[i].Name))
      .attr("font-size", "15px");
  }

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();
}

function graph_flights_sales(flights_json) {
  const margin = { top: 10, right: 10, bottom: 30, left: 10 };
  const width = 1200 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#sales_graph")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

  const x = d3
    .scaleBand()
    .domain(d3.range(flights_json.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

  svg
    .append("g")
    .selectAll("rect")
    .data(flights_json)
    .join("rect")
    .attr("fill", (d) => {
      return "royalblue";
    })
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.Sales))
    .attr("title", (d) => d.Sales)
    .attr("class", "rect")
    .attr("height", (d) => y(0) - y(d.Sales))
    .attr("width", x.bandwidth());

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2 + 10)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Flights Sales");

  // creating names for the axis
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, flights_json.format))
      .attr("font-size", "15px");
  }
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((i) => flights_json[i].Name))
      .attr("font-size", "15px");
  }

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();
}

/*$(() => {
  loadRatings();
  loadSales();
});*/

function createFlight(
  name,
  URL,
  duration,
  departure,
  arrivle,
  price,
  temperature,
  continent,
  date,
  category,
  API
) {
  console.log(name);
  // $.post("/create", obj);
  $.ajax({
    url: "http://localhost:8080/create",
    type: "POST",
    data: JSON.stringify({
      name: name,
      URL: URL,
      duration: duration,
      departure: departure,
      arrivle: arrivle,
      price: price,
      temperature: temperature,
      continent: continent,
      date: date,
      category: category,
      API: API,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function () {
      console.log("request successfully!");
      window.alert("Created successfully");
    },
  });
}

function findFlight(name, characteristic, new_val) {
  $.get("/allflights", (data) => {
    var _id = "-1";
    for (var i = 0; i < data.length; i++) {
      if (data[i].Name == name) {
        _id = data[i]._id;
        break;
      }
    }
    if (_id == "-1") {
      window.alert("There is no flight as requested");
      return;
    }

    var new_val_final;
    if (
      characteristic == "Duration" ||
      characteristic == "Price" ||
      characteristic == "Temperature" ||
      characteristic == "Rating"
    )
      new_val_final = parseInt(new_val);
    else new_val_final = new_val;
    $.ajax({
      url: "http://localhost:8080/update",
      type: "PUT",
      data: JSON.stringify({
        _id: _id,
        characteristic: characteristic,
        value: new_val_final,
      }),
      contentType: "application/json",
      dataType: "json",
      success: function () {
        console.log("request successfully!");
        window.alert("successfully updated");
      },
    });
  });
}

function DeleteFlight(name) {
  $.get("/allflights", (data) => {
    var _id = "-1";
    for (var i = 0; i < data.length; i++) {
      if (data[i].Name == name) {
        _id = data[i]._id;
        break;
      }
    }
    if (_id == "-1") {
      window.alert("There is no flight as requested");
      return;
    }

    $.ajax({
      url: "http://localhost:8080/delete",
      type: "DELETE",
      data: JSON.stringify({ _id: _id }),
      contentType: "application/json",
      dataType: "json",
      success: function () {
        console.log("request successfully!");
        window.alert("successfully deleted");
      },
    });
  });
}

function loadGraphs() {
  $("#main").empty();
  $("#create").empty();
  $("#update").empty();
  $("#delete").empty();
  $("#users").empty();
  $("#graphs").empty();
  // graph=$("#graphs").detach();
  $("#graphs").load("view/master/graph.html");
}





