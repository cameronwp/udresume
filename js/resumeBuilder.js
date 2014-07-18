var HTMLname, HTMLemail, HTMLprofilepic;


HTMLprofilepic = '<img src="%data%" class="biopic">'

var bioInformation = {
  "name" : "John Doe",
  "mobile": "650-555-5555",
  "email": "john@example.com",
  "github": "johndoe",
  "twitter": "johndoe",
  "currentCity": "San Francisco" 
}

function displayBioItem(itemName, itemValue) {
  var content = '<li class="flex-item">';
  if (item == 'currentCity') {
    content += '<span class="orange-text">location</span></li>'
  } else {
    content += '<span class="orange-text">%itemName%</span>'+
          '<span class="white-text">%itemValue%</span>'+    
          '</li>'
  }
  content = content.replace('%itemName%', itemName);
  content = content.replace('%itemValue%', itemValue);
  return content;
}

function displayBio(bioInfo) {
  var content = '<ul class="flex-box">';
  for (item in bioInfo) {
    if ((item != 'skills') && (item != 'name')) {
      content += displayBioItem(item, bioInfo[item]);
    }
  }
  content += '</ul>';
  return content;
}

var education = {
  "schools": [
    {
      "name": "Nova Southeastern University",
      "city": "Fort Lauderdale, FL",
      "degree": "Masters",
      "major": ["CS"],
      "graduationDate": 2013,
      "url": "http://example.com"
    },
    {
      "name": "Eckerd College",
      "city": "Saint Petersburg, FL",
      "degree": "BA",
      "major": ["CS"],
      "graduationDate": 2003,
      "url": "http://example.com"
    },
    {
      "courseTitle": "Introduction to Machine Learning",
      "name" : "Udacity",
      "graduationDate": 2014,
      "url": "http://example.com"
    }
  ]
}

function displaySchoolItem(item) {
  var content = '<div class="education-entry"><a href="'+item.url+'">';
  if (item.courseTitle != undefined) {
    content += item.courseTitle +' - '+ item.name +'</a>';
  } else {
    content += item.name + ' - ' + item.degree;
  }
  content += '<div class="date-text">'+item.graduationDate+'</div></div>';
  return content;
}

function displaySchool(education) {
  var content = '<div id="education" class="gray">';
  content += '<h2>Educational Experience</h2>';
  for(var i = 0; i<education.schools.length; i++) {
    var school = education.schools[i];
    if (school.courseTitle == undefined) {
      content += displaySchoolItem(school);
    }
  }
  content += '<h3>Online Courses</h3>';
  for(var i = 0; i<education.schools.length; i++) {
    var school = education.schools[i];
    if (school.courseTitle != undefined) {
      content += displaySchoolItem(school);
    }
  }
  content += '</div>';
  return content;
}


/*
<a href="#">Planet Express - Senior package delivery boy</a>
        <div class='date-text'>January 3000 - Future</div>
        <p>Who moved my cheese cheesy feet cauliflower cheese. Queso taleggio when the cheese 
        comes out everybody's happy airedale ricotta cheese and wine paneer camembert de 
        normandie. Swiss mozzarella cheese slices feta fromage frais airedale swiss cheesecake. 
        Hard cheese blue castello halloumi parmesan say cheese stinking bishop jarlsberg.</p>
*/
function displayWork() {
  var content = '<a href="#">Planet Express - Senior package delivery boy</a>';
}

function timeSinceLastUpdate() {
  
}

var Work = {
  displayWork: function() {} 
}
