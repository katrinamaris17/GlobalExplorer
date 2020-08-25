$(document).ready(function () {
    let infowindow = new google.maps.InfoWindow();
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15
    });

    // Setting Current Date
    $("#currentDate").text(moment().format('MMMM Do YYYY'));

    // Create an event listener to the searchTxt:
    $("#searchBtn").click(function (event) {
        event.preventDefault();
        photo()
        var searchTxt = $('#searchTxt').val();

        console.log(searchTxt);

        const request = {
            query: searchTxt,
            fields: ["name", "photos", "rating", "geometry"]
        };


        service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
            console.log(results[0].photos[0].getUrl());
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }

                map = map.setCenter(results[0].geometry.location);
            }
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

    const APIKey = "AIzaSyAlmutJnwSagTY5KyY3OV0fEOmGBBUoFtw"

    function photo() {
        console.log("inside photo");
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${APIKey}`

        }).then(function (results) {
            console.log("inside photo", results);
        }, function (xhr, status, error) {
            console.log(status, error)
        });
    }

});