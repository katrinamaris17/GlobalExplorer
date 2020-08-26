$(document).ready(function () {
  function seatGeek(city) {
    var queryURL =
      "https://api.seatgeek.com/2/events?client_id=MjEyNTQ5ODF8MTU5ODMwNjk2Mi43&q=" +
      city;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Printing the entire object to console
	  console.log(response);
	  $("#searchResults").empty();
      for (let i = 0; i < response.events.length; i++) {
        console.log(response.events[i].short_title);
		var title = response.events[i].short_title;
		var newVariable = response.events[i].datetime_local;
		var perImage = response.events[i].performers[0].image;
        renderActivities(title, newVariable, perImage);
      }
    });
  }

  // Event handler for user clicking the select-city button
  $("#searchBtn").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    console.log(moment().format());
    // Storing the city name
    var city = $("#searchTxt").val().trim();
    seatGeek(city);
  });
});
//short title AND event come from the array in dev
function renderActivities(short_title, newVariable, perImage) {
  const div = $("<div>");
//   const p = $("<p>");
  
//   p.text(short_title);
  div.html(`
	<p>${short_title}</p>
	<p>${moment(newVariable).format("LLLL")}</p>
	<img src="${perImage}"></img>
  `);

  $("#searchResults").prepend(div);
}

// renderActivities();
