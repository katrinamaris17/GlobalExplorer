$(document).ready(function () {
    var input = document.getElementById('searchTxt');
    var searchTxt = new google.maps.places.Autocomplete(input, {
        types: ['(cities)']
    });
    let infowindow = new google.maps.InfoWindow();
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17
    });

    // Weather API
    var APIkey = 'fd37870e3efc4ef4cbd12f30d7ae76f2';

    // Setting Current Date
    $("#currentDate").text(moment().format('MMMM Do YYYY'));
    // Create an event listener to the searchTxt:
    $("#searchBtn").click(function (event) {
        event.preventDefault();
        // photo()
        var searchTxt = $('#searchTxt').val();
        $(".localTime").text(moment().format('LLLL'));



        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${searchTxt}&appid=${APIkey}&units=imperial`,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var temperature = response.main.temp;
            var humidity = response.main.humidity;
            var weatherDescription = response.weather[0].description

            $('.temperature').append('<p>').text(`Temperature: ${temperature} F`)
            $('.humidity').append('<p>').text(`Humidity: ${humidity}`)
            $('.currentConditions').append('<p>').text(`Current Conditions: ${weatherDescription}`)


            var iconCode = response.weather[0].icon;
            var codeUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            $(".weatherIcon").html("<img src='" + codeUrl + "'>");



        })


        const request = {
            query: searchTxt,
            fields: ["name", "photos", "rating", "geometry"]
        };


        service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
            console.log(results[0].photos[0].getUrl());
            console.log(results[0]);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                    createPhotoMarker(results[i]);
                }

                map = map.setCenter(results[0].geometry.location);
            }
            var photoHolder = $(`<img class='cityPhoto' src='${results[0].photos[0].getUrl()}'>`);
            $(".photos").append(photoHolder);
        });


    });


    function createMarker(place) {
        const marker = new google.maps.Marker({
            map,
            position: place.geometry.location
        });
        google.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(place.name);
            infowindow.open(map);
        });

    }

    function createPhotoMarker(place) {
        var photos = place.photos;
        if (!photos) {
            return;
        }

        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name,
            icon: photos[0].getUrl({
                maxWidth: 35,
                maxHeight: 35
            })
        });
    }



});