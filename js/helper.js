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

var googleMap = "<google-map fittomarkers='true' disableDefaultUI></google-map>";

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

// This is an event listener. When the Google Map is ready, the 'google-map-ready' event is called
// The series of steps below will find all the locations in your resume and use them to put pins on the map
window.addEventListener('google-map-ready', function(e) {
  var locations;

  // step 1
  // returns an array of location strings from locations in resumeBuilder.js JSONs
  function locationFinder() {
    var locations = [];

    locations.push(bio.contacts.location);
    
    for (var school in education.schools) {
      locations.push(education.schools[school].location);
    }

    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);
    }

    return locations;
  }
  
  // formats Google Places search results to create pin
  function createMapMarkerHTML(placeData) {
    var html;

    var lat = placeData.geometry.location.k;
    var lon = placeData.geometry.location.B;
    var name = placeData.formattedAddress;

    html = "<google-map-marker latitude='" + lat + "' longitude='" + lon + "' title='" + name + "'></google-map-marker>";

    return html;
  }

  // makes sure the search worked and creates a new map marker
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var mapMarker = createMapMarkerHTML(results[0])
      $("google-map").append(mapMarker);
    }
    // console.log(results[0]);
    // console.log(results[0].geometry.location.B);
  }

  // posts pins on the map
  function pinPoster(locations) {
    var request;

    // Search service
    var service = new google.maps.places.PlacesService(gmap);
    
    // Iterates through an array of locations
    for (place in locations) {
      // console.log(locations[place]);
      // the search object
      var request = {
        query: locations[place]
      }
      // console.log(request);

      // actually searches the Google Maps API and runs the callback function
      service.textSearch(request, callback);
    }
  }

  var gmap = document.querySelector('google-map');

  locations = locationFinder();
  locations = pinPoster(locations);

});