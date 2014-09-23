var HTMLheaderName = "<h1 id='name'>%data%</h1>";
var HTMLheaderRole = "<span>%data%</span><hr/>";

var HTMLcontactGeneric = "<li class='flex-item'><span class='orange-text'>%contact%</span><span class='white-text'>%data%</span></li>";
var HTMLmobile = "<li class='flex-item'><span class='orange-text'>mobile</span><span class='white-text'>%data%</span></li>";
var HTMLemail = "<li class='flex-item'><span class='orange-text'>email</span><span class='white-text'>%data%</span></li>";
var HTMLtwitter = "<li class='flex-item'><span class='orange-text'>twitter</span><span class='white-text'>%data%</span></li>";
var HTMLgithub = "<li class='flex-item'><span class='orange-text'>github</span><span class='white-text'>%data%</span></li>";
var HTMLblog = "<li class='flex-item'><span class='orange-text'>blog</span><span class='white-text'>%data%</span></li>";
var HTMLlocation = "<li class='flex-item'><span class='orange-text'>location</span><span class='white-text'>%data%</span></li>"; // current city?
var HTMLbioPic = "<img src='%data%' class='biopic'>";
var HTMLWelcomeMsg = "<span class='welcome-message'>%data%</span>";

var HTMLskillsStart = "<h3 id='skillsH3'>Skills at a Glance:</h3><ul id='skills' class='flex-box'></ul>";
var HTMLskills = "<li class='flex-item'><span class='white-text'>%data%</span></li>";

var HTMLworkStart = "<div class='work-entry'></div>";
var HTMLworkEmployer = "<a href='#'>%data%";
var HTMLworkTitle = " - %data%</a>";
var HTMLworkDates = "<div class='date-text'>%data%</div>";
var HTMLworkLocation = "<div class='location-text'>%data%</div>";
var HTMLworkDescription = "<p><br>%data%</p>";

var HTMLprojectStart = "<div class='project-entry'></div>";
var HTMLprojectTitle = "<a href='#'>%data%</a>";
var HTMLprojectDates = "<div class='date-text'>%data%</div>";
var HTMLprojectDescription = "<p><br>%data%</p>";
var HTMLprojectImage = "<img src='%data%'>";

var HTMLschoolStart = "<div class='education-entry'></div>"
var HTMLschoolName = "<a href='#'>%data%";
var HTMLschoolDegree = " -- %data%</a>";
var HTMLschoolDates = "<div class='date-text'>%data%</div>";
var HTMLschoolLocation = "<div class='location-text'>%data%</div>";
var HTMLschoolMajor = "<em><br>Major: %data%</em>"

var HTMLonlineClasses = "<h3>Online Classes</h3>";
var HTMLonlineTitle = "<a href='#'>%data%";
var HTMLonlineSchool = " - %data%</a>";
var HTMLonlineDates = "<div class='date-text'>%data%</div>";
var HTMLonlineURL = "<br><a href='#'>%data%</a>";

var internationalizeButton = "<button>Internationalize</button>";
var googleMap = "<div id='map'></div>";

$(document).ready(function() {
  $('button').click(function() {
    var iName = inName();
    $('#name').html(iName);  
  });
})

clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      "x": x,
      "y": y
    }
  );
  console.log("x location: " + x + "; y location: " + y);
}

$(document).click(function(loc) {
  logClicks(loc.pageX, loc.pageY);
});


// Google Maps here


var map;  // declares a global map variable

function initializeMap() {     // called when page is loaded

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);    // defines a new Google Map Object


  // The fun starts here
  function locationFinder() {   // returns an array of location strings from locations in resumeBuilder.js JSONs
    
    var locations = [];

    locations.push(bio.contacts.location);    // assumes a single bio location
    
    for (var school in education.schools) {   // iterates through school locations
      locations.push(education.schools[school].location);
    }

    for (var job in work.jobs) {              // iterates through work locations
      locations.push(work.jobs[job].location);
    }

    return locations;
  }

  function createMapMarker(placeData) {       // formats Google Places search results to create pins

    // all of the pin data
    var lat = placeData.geometry.location.k;  // latitude from the place service
    var lon = placeData.geometry.location.B;  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current bounds of the map window

    var marker = new google.maps.Marker({     // wait, is this really just automatically picked up by bounds.extend???
      map: map,
      position: placeData.geometry.location,
      title: name
    });
    
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);                     // probably going to cut this line for the student quiz
    });

    bounds.extend(new google.maps.LatLng(lat, lon));    // this is where the pin actually gets added
    map.fitBounds(bounds);                              // fit the map to the new marker
    map.setCenter(bounds.getCenter());                  // center the map
  }

  function callback(results, status) {            // makes sure the search worked and creates a new map marker
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0])
    }
  }

  function pinPoster(locations) {       // posts pins on the map

    var service = new google.maps.places.PlacesService(map);    // creates a Google place search service object
    
    for (place in locations) {    // Iterates through an array of locations, creates a search object for each location

      var request = {
        query: locations[place]
      }

      service.textSearch(request, callback);    // actually searches the Google Maps API and runs the callback function
    }
  }

  window.mapBounds = new google.maps.LatLngBounds();    // sets the boundaries of the map based on pin locations

  locations = locationFinder();   // gets the locations from the resume, saves them as locations
  pinPoster(locations);           // creates pins on the map for each location
  
};

window.addEventListener('load', initializeMap);     // calls the initialize map function when the page loads


// Vanilla JS way to listen for resizing of the window 
// and adjust map bounds
window.addEventListener('resize', function(e) {
  // Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});