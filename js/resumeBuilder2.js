var bioInformation = {
  "name" : "John Doe",
  "role": "Web Developer",
  "mobile": "650-555-5555",
  "email": "john@example.com",
  "github": "johndoe",
  "twitter": "johndoe",
  "currentCity": "San Francisco",
  "welcomeMessage": "lorem ipsum dolor sit amet etc etc etc.",
  "bioPic": "http://img2.wikia.nocookie.net/__cb20110606042505/es.futurama/images/0/0b/55692752-Philip_J_Fry.jpg"
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
    }
  ],
  "onlineCourses": [
    {
      "courseTitle": "Introduction to Machine Learning",
      "name" : "Udacity",
      "graduationDate": 2014,
      "url": "http://example.com"
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

var formattedRole = HTMLheaderRole.replace("%data%", bioInformation.role)
$("#header").prepend(formattedRole);

var formattedName = HTMLheaderName.replace("%data%", bioInformation.name);
$("#header").prepend(formattedName);

var formattedEmail = HTMLemail.replace("%data%",bioInformation.email);
$("#topContacts").append(formattedEmail);

var formattedMobile = HTMLmobile.replace("%data%",bioInformation.mobile);
$("#topContacts").append(formattedMobile);

var formattedPic = HTMLbioPic.replace("%data%", bioInformation.bioPic);
$("#header").append(formattedPic);

var formattedDescription = HTMLWelcomeMsg.replace("%data%", bioInformation.welcomeMessage);
$("#header").append(formattedDescription);

for (job in work.jobs) {

  $("#workExperience").append(HTMLworkStart);
  // concat employer and title
  var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
  var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
  var formattedEmployerTitle = formattedEmployer + formattedTitle;
  $("#workExperience").append(formattedEmployerTitle);

  var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
  $("#workExperience").append(formattedDates);

  var formattedDescription = HTMLworkDates.replace("%data%", work.jobs[job].description);
  $("#workExperience").append(formattedDescription);
}




















