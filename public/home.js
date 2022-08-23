
function loadPopular(){
    fetch("/allflights")
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            const arrOfFlights = [];
            for (let singleFlight of res) {
                arrOfFlights.push(singleFlight);
            }
            showPopular(arrOfFlights);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            //console.log("flights Ratings loaded successfully");
        });
}

function showPopular(arrOfFlights){
    arrOfFlights.sort((a,b)=>{
       return b.Rating-a.Rating;
    });
    let imgLoc0 = document.getElementById("img-0");
    imgLoc0.src=arrOfFlights[0].URL;
    let nameLoc0 =document.getElementById("title-0");
    nameLoc0.append(arrOfFlights[0].Name);
    let priceLoc0=document.getElementById("price-0");
    priceLoc0.append(arrOfFlights[0].Price + "$");
    /*let weatherLoc0=document.getElementById("weather-0");
    weatherLoc0.append(arrOfFlights[0].API);*/
    console.log(arrOfFlights[0].Name);

    let imgLoc1 = document.getElementById("img-1");
    imgLoc1.src=arrOfFlights[1].URL;
    let nameLoc1=document.getElementById("title-1");
    nameLoc1.append(arrOfFlights[1].Name);
    let priceLoc1=document.getElementById("price-1");
    priceLoc1.append(arrOfFlights[1].Price + "$");
    /*let weatherLoc1=document.getElementById("weather-1");
    weatherLoc1.append(arrOfFlights[1].API);*/
    console.log(arrOfFlights[1].Name);

    let imgLoc2 = document.getElementById("img-2");
    imgLoc2.src=arrOfFlights[2].URL;
    let nameLoc2=document.getElementById("title-2");
    nameLoc2.append(arrOfFlights[2].Name);
    let priceLoc2=document.getElementById("price-2");
    priceLoc2.append(arrOfFlights[2].Price + "$");
    /*let weatherLoc2=document.getElementById("weather-2");
    weatherLoc2.append(arrOfFlights[2].API);*/
    console.log("Popular flights are shown");
    console.log(arrOfFlights[2].Name)
}

loadPopular();