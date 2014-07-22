// TODO: convert experiences to images and hide text. When someone click on one,
// the page expands to show details
// -or-
// TODO: show small snippet of info at a glance in two columns for each entry
// onclick, expand details, give options for multimedia inclusion

var bio = {
  "name" : "John Doe",
  "role": "Web Developer",
  "contacts": {
    "mobile": "650-555-5555",
    "email": "john@example.com",
    "github": "johndoe",
    "twitter": "@johndoe",
    "location": "San Francisco"
  },
  "welcomeMessage": "lorem ipsum dolor sit amet etc etc etc.",
  "skills": [
    "awesomeness", "delivering things", "cryogenic sleep", "saving the universe"
  ],
  "bioPic": "images/fry.jpg"
}

var education = {
  "schools": [
    {
      "name": "Nova Southeastern University",
      "city": "Fort Lauderdale, FL",
      "degree": "Masters",
      "majors": ["CS"],
      "dates": 2013,
      "url": "http://example.com"
    },
    {
      "name": "Eckerd College",
      "city": "Saint Petersburg, FL",
      "degree": "BA",
      "majors": ["CS"],
      "dates": 2003,
      "url": "http://example.com"
    }
  ],
  "onlineCourses": [
    {
      "title": "JavaScript Crash Course",
      "school" : "Udacity",
      "dates": 2014,
      "url": "http://www.udacity.com/course/ud804"
    }
  ]
}

var work = {
  "jobs": [
    {
      "employer": "Planet Express",
      "title": "Delivery Boy",
      "dates": "January 3000 - Future",
      "description": "Who moved my cheese cheesy feet cauliflower cheese. Queso taleggio when the cheese comes out everybody's happy airedale ricotta cheese and wine paneer camembert de normandie. Swiss mozzarella cheese slices feta fromage frais airedale swiss cheesecake. Hard cheese blue castello halloumi parmesan say cheese stinking bishop jarlsberg."
    },
    {
      "employer": "Panucci's Pizza",
      "title": "Delivery Boy",
      "dates": "1998 - December 31, 1999",
      "description": "Who moved my cheese cheesy feet cauliflower cheese. Queso taleggio when the cheese comes out everybody's happy airedale ricotta cheese and wine paneer camembert de normandie. Swiss mozzarella cheese slices feta fromage frais airedale swiss cheesecake. Hard cheese blue castello halloumi parmesan say cheese stinking bishop jarlsberg."
    }
  ]
}

var projects = {
  "projects": [
    {
      "title": "Sample Project 1",
      "dates": "2014",
      "description": "Who moved my cheese cheesy feet cauliflower cheese. Queso taleggio when the cheese comes out everybody's happy airedale ricotta cheese and wine paneer camembert de normandie. Swiss mozzarella cheese slices feta fromage frais airedale swiss cheesecake. Hard cheese blue castello halloumi parmesan say cheese stinking bishop jarlsberg.",
      "images": [
        "https://lh3.ggpht.com/23-sqOpOGqF06YX3BwIYPIXLX_Ma_clLXySKEHlphqlxr2l-PPbC80U8SjDi96KTWbNjKfY2Pdq_gyFK9A=s300#w=1757&h=1080",
        "https://lh3.ggpht.com/23-sqOpOGqF06YX3BwIYPIXLX_Ma_clLXySKEHlphqlxr2l-PPbC80U8SjDi96KTWbNjKfY2Pdq_gyFK9A=s300#w=1757&h=1080"
      ]   
    }
  ]
}


// could create vars to save all of the complex object infos used in replace() methods
function displayHeader() {
  var formattedRole = HTMLheaderRole.replace("%data%", bio.role)
  $("#header").prepend(formattedRole);

  var formattedName = HTMLheaderName.replace("%data%", bio.name);
  $("#header").prepend(formattedName);

  // not sure why the spacing is off between contact info and contact category
  for (contact in bio.contacts) {
    var formattedContact = HTMLcontactGeneric.replace("%data%", bio.contacts[contact]);
    formattedContact = formattedContact.replace("%contact%", contact);
    $("#topContacts").append(formattedContact);
  }

  var formattedPic = HTMLbioPic.replace("%data%", bio.bioPic);
  $("#header").append(formattedPic);

  var formattedDescription = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
  $("#header").append(formattedDescription);

  if(bio.skills.length > 0) {
    $("#header").append(HTMLskillsStart);
  }

  // needs styling, currently flows outside of header on mobile resolution
  for (skill in bio.skills) {
    var formattedSkill = HTMLskills.replace("%data%", bio.skills[skill]);
    $("#skills").append(formattedSkill);
  }

}

function displayWork() {
  for (job in work.jobs) {
    // create new div for work experience
    $("#workExperience").append(HTMLworkStart);
    // concat employer and title
    var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
    var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
    var formattedEmployerTitle = formattedEmployer + formattedTitle;
    $(".work-entry:last").append(formattedEmployerTitle);

    var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
    $(".work-entry:last").append(formattedDates);

    var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
    $(".work-entry:last").append(formattedDescription);
  }
}

function displayProjects() {
  for (project in projects.projects) {
    $("#projects").append(HTMLprojectStart);

    var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
    $(".project-entry:last").append(formattedTitle);

    var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
    $(".project-entry:last").append(formattedDates);

    var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
    $(".project-entry:last").append(formattedDescription);

    if (projects.projects[project].images.length > 0) {
      for (image in projects.projects[project].images) {
        var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
        $(".project-entry:last").append(formattedImage);
      }
    }
  }
}

function displayEducation() {
  for (school in education.schools) {
    $("#education").append(HTMLschoolStart);

    var formattedSchoolName = HTMLworkEmployer.replace("%data%", education.schools[school].name);
    var formattedDegree = HTMLworkTitle.replace("%data%", education.schools[school].degree);
    var formattedSchoolHeader = formattedSchoolName + formattedDegree;
    $(".education-entry:last").append(formattedSchoolHeader);

    //deal with majors

    var formattedDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
    $(".education-entry:last").append(formattedDates);

    // TODO: style better
    for (major in education.schools[school].majors) {
      var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].majors[major]);
      $(".education-entry:last").append(formattedMajor);
    }
  }
  
  $("#education").append(HTMLonlineClasses);

  for (course in education.onlineCourses) {
    $("#education").append(HTMLschoolStart);

    var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
    var formattedSchool = HTMLonlineSchool.replace("%data%",education.onlineCourses[course].school);
    var formattedOnlineHeader  = formattedTitle + formattedSchool;
    $(".education-entry:last").append(formattedOnlineHeader);
    
    var formattedDates = HTMLonlineDates.replace("%data%",education.onlineCourses[course].dates);
    $(".education-entry:last").append(formattedDates);

    // TODO: style better
    var formattedURL = HTMLonlineURL.replace("%data%",education.onlineCourses[course].url);
    $(".education-entry:last").append(formattedURL);
  }
}

function displayFooter() {
  for (contact in bio.contacts) {
    var formattedContact = HTMLcontactGeneric.replace("%data%", bio.contacts[contact]);
    formattedContact = formattedContact.replace("%contact%", contact);
    $("#footerContacts").append(formattedContact);
  }
}

displayHeader();
displayWork();
displayProjects();
displayEducation();
displayFooter();

function internationalize() {
  var name = bio.name.split(" ");
  name[1] = name[1].toUpperCase();
  name[0] = name[0].slice(0,1).toUpperCase() + name[0].slice(1).toLowerCase();
  return name[0] +" "+name[1];
}

$('#main').append(internationalizeButton);











