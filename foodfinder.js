$(document).ready(function () {
  // Create an event listener to the searchTxt:
  const apiKey = "578985e3bcmsh1e46e05d8b57001p115f4ejsn2ad3f98d27ac";
  const baseUrl = `https://tripadvisor1.p.rapidapi.com/restaurants/list-in-boundary?lunit=km&restaurant_tagcategory=10591&limit=30&currency=USD&restaurant_tagcategory_standalone=10591&lang=en_US&bl_latitude=11.847676&bl_longitude=109.095887&tr_latitude=12.838442&tr_longitude=109.149359`;

  $("#searchFood").click(function () {
    var searchFood = $("#form-control").val();
    console.log(searchFood);

    //   $(document).on("click", "#searchFood", function (event) {
    //     event.preventDefault();

    // Food Search
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://tripadvisor1.p.rapidapi.com/restaurants/list-in-boundary?lunit=km&restaurant_tagcategory=10591&limit=30&currency=USD&restaurant_tagcategory_standalone=10591&lang=en_US&bl_latitude=11.847676&bl_longitude=109.095887&tr_latitude=12.838442&tr_longitude=109.149359",
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "578985e3bcmsh1e46e05d8b57001p115f4ejsn2ad3f98d27ac",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  });

  function photo() {}
});
