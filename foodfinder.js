$(document).ready(function () {
  // Create an event listener to the searchTxt:
  const apiKey = "578985e3bcmsh1e46e05d8b57001p115f4ejsn2ad3f98d27ac";
  const baseUrl = `https://tripadvisor1.p.rapidapi.com/restaurants/list-in-boundary?lunit=km&restaurant_tagcategory=10591&limit=30&currency=USD&restaurant_tagcategory_standalone=10591&lang=en_US&bl_latitude=11.847676&bl_longitude=109.095887&tr_latitude=12.838442&tr_longitude=109.149359`;

  $(document).on("click", "#searchFood", function () {
    var searchFood = $("#inputSearchFood").val();
    console.log(searchFood);

    searchRestaurant("37.7749", "-122.4149");
    //   $(document).on("click", "#searchFood", function (event) {
    //     event.preventDefault();
  });

  function searchRestaurant(latitude, longitude) {
    // Food Search
    var settings = {
      async: true,
      crossDomain: true,
      url: `https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=km&lang=en_US&latitude=${latitude}&longitude=${longitude}`,
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "578985e3bcmsh1e46e05d8b57001p115f4ejsn2ad3f98d27ac",
      },
    };

    // pull the data
    $.ajax(settings).done(function (response) {
      console.log(response);
      $("#searchResults").empty();
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i].name);
        renderRestaurant(response.data[i].name, response.data[i].rating);
      }
    });
  }

  // Render to the screen
  function renderRestaurant(name, rating) {
    const div = $("<li>");
    const p = $("<p>");
    const pRating = $("<p>");
    p.text(name);
    pRating.text(rating);
    div.append(p, pRating);
    $("#searchResults").prepend(div);
  }
});

// Data [0.address.name.rating.phone]
