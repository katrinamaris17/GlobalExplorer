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
        var dateTime = response.events[i].datetime_local;
        var perImage = response.events[i].performers[0].image;
        var venueName = response.events[i].venue.name;
        var tickets = response.events[i].url;
        renderActivities(title, dateTime, perImage, tickets, venueName);
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
function renderActivities(short_title, dateTime, perImage, tickets, venueName) {
  const div = $("<div>");
  //   const p = $("<p>");

  //   p.text(short_title);
  div.html(`
	<div class="row">
  <div class="col-sm">
      <div class="form-container">
      <img src="${perImage}" id="activImg" alt="${short_title}"></img>
      </div>
  </div>
  <div class="col-sm activities">
      <h2>${short_title}</h2>
      <h5>${moment(dateTime).format("LLLL")}</h5>
      <h5>${venueName}</h5><br><br>
      <a href="${tickets}">Buy Tickets Here</a>
  </div>
</div>
<br>
<br>
  `);

  $("#searchResults").prepend(div);
}

// renderActivities();