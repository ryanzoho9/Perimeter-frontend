// Default variables
perimeter.origin = perimeter.origin || "https://zohowww.com";
perimeter.dateTimeRefreshInterval = perimeter.dateTimeRefreshInterval || 500;
perimeter.allowZoomPWA = perimeter.allowZoomPWA || false;
perimeter.promptCookies = perimeter.promptCookies || false;

perimeter.navigation.topBuffer = perimeter.navigation.topBuffer || false

// Url variables
url = window.location.href;
urlProtocol = window.location.protocol;
urlDomain = window.location.hostname
urlOrigin = window.location.origin;
urlPath = window.location.pathname;
urlParam = window.location.search;
urlParamSearch = new URLSearchParams(urlParam);
urlHash = window.location.hash;


// Initialize
$(document).ready(function() {
  currentDateTime();
  setInterval(function(){
    currentDateTime(); 
  }, perimeter.dateTimeRefreshInterval);
  themeAuto();
  $("body").prepend("<div style='display: none;' class='pModalContainer'><div class='pModal BackGrey0'><a class='DestyleButton pModalCloseX' onclick='closeModal()'><img class='pModalCloseXIcon' src='" + perimeter.origin + "/perimeter/icons/ui/close-x.svg' alt='close icon'></a><div class='pModalText'><p class='SectionTitle Grey9 CenterTXT pModalTitle'></p><p class='Subtitle Grey9 CenterTXT pModalDescription'></p><div style='display: none' class='pModalTheme'><input onclick='theme()' type='checkbox' name='darkModeAuto' id='darkModeAuto' class='checkToggle DestyleButton'><label class='Subtitle settingsCheckItem Grey10' for='darkModeAuto'><span class='checkToggleBtn'></span>Auto dark mode</label><br><input onclick='theme()' type='checkbox' name='darkMode' id='darkMode' class='checkToggle DestyleButton'><label class='Subtitle settingsCheckItem Grey10' for='darkMode'><span class='checkToggleBtn'></span>Dark mode</label><br></div></div><div class='pModalButtonContainer'></div></div></div>");
  if (localStorage.getItem("userLat") == null && localStorage.getItem("userLocation") !== "denied" && perimeter.requestLocation == true) {
    setLocation();
  };
  if (CSS.supports('color', 'var(--test-var)') == false) {
    showModal("modalMessage", "Unsupported browser", "You are using an unsupported browser. This site may not be displayed properly.")
  };
  if (urlParamSearch.has("error") == true) {
    var errorCodes = {
    "e404": {"title": "An error has occurred", "description": "Error 404. The resource requested was not found."},
    "e403": {"title": "An error has occurred", "description": "Error 403. You do not have access to the requested resource."},
    "e500": {"title": "An error has occurred", "description": "Error 500. There was an issue with the server."},
    "eOther": {"title": "An error has occurred", "description": "An unknown error has occured. Error code: "},
    };
    var errorID = urlParamSearch.get('error');
    if (errorCodes.hasOwnProperty(errorID) == true) {
      showModal("modalMessage", errorCodes[errorID].title, errorCodes[errorID].description);
    } else {
      showModal("modalMessage", errorCodes.eOther.title, errorCodes.eOther.description + errorID);
    };
  };
});


function perimeterSetup() {
  if (perimeter.navigation) {navigationSetup();}
  if (perimeter.footer) {footerSetup();}
};


if (window.matchMedia('(display-mode: standalone)').matches) {

};

if (window.matchMedia('(display-mode: standalone)').matches && perimeter.allowZoomPWA == false) {
  document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.999;
  });
  document.addEventListener("gesturechange", function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.999;
  });
  document.addEventListener("gestureend", function (e) {
    e.preventDefault();
    document.body.style.zoom = 1;
  });
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(perimeter.origin + '/perimeter/scripts/service-worker.js');
};

// Retrieve and format current date and time
function currentDateTime() {
  date = new Date();
  monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  dayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  
  currentYear = date.getFullYear();
  currentMonth = monthNames[date.getMonth()];
  currentDayWeek = dayNames[date.getDay()];
  currentDay = date.getDate();
  hour = date.getHours();
  min = date.getMinutes();
  sec = date.getSeconds();
  //ampm;
  //twelveHour;
  //zeroMin;

  if (hour > 11) {
    ampm = "pm";
  } else {
    ampm = "am";
  };
    
  if (hour > 12) {
    twelveHour = hour - 12;
  } else if (hour == 0) {
    twelveHour = 12;
  } else {
    twelveHour = hour;
  };
    
  if (min < 10) {
    zeroMin = "0" + min;
  } else {
    zeroMin = min;
  };
};

// Request and locally save user location on request
function setLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(saveLocation, locationPermissionCheck);
  } else {
    alert("Unable to retrieve location");
    localStorage.setItem("userLocation", "denied");
  };
};

function locationPermissionCheck(error) {
  if (error.PERMISSION_DENIED) {
    localStorage.setItem("userLocation", "denied");
  };
};

function saveLocation(position) {
  localStorage.removeItem('userLocation');
  localStorage.setItem("userLat", position.coords.latitude.toFixed(3));
  localStorage.setItem("userLong", position.coords.longitude.toFixed(3));
  alert("Location successfully updated");
};

// Convert svg images to svg code on request
function toSVG() {
  $(document).ready(function() {
    $('img').filter(function() {
        return this.src.match(/.*\.svg$/);
      }).each(function(){
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgStyle = $img.attr('style');
      var imgURL = $img.attr('src');
  
      if ($img.hasClass('toSVG') == true) {
      $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');
  
        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        if(typeof imgStyle !== 'undefined') {
          $svg = $svg.attr('style', imgStyle);
        }
  
        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');
  
        // Replace image with new SVG
        $img.replaceWith($svg);
  
      }, 'xml');
      };
  
    });
  });
};

// Manage modal requests and formatting
function showModal(modalAction, modalTitle, modalDescription) {
  $(".pModalTitle").empty();
  $(".pModalDescription").empty();
  $(".pModalTheme").css("display", "none");
  $(".pModalButtonContainer").empty();
  $(".pModalTitle").html(modalTitle);
  $(".pModalDescription").html(modalDescription);

  switch (modalAction) {
    case "modalClose":
      $(".pModalButtonContainer").html("<a onclick='closeModal()' class='DestyleButton SquaredButton APullInTint BackSiteBlue SBPaddingPosition CenterTXT NoCopy Subtitle Grey0' ontouchstart style='box-sizing: border-box;'>Close</a>");
      break;
    case "modalTheme":
      $(".pModalTitle").html("Change Theme");
      $(".pModalTheme").css("display", "block");
      $(".pModalButtonContainer").html("<a onclick='closeModal()' class='DestyleButton SquaredButton APullInTint BackSiteBlue SBPaddingPosition CenterTXT NoCopy Subtitle Grey0' ontouchstart style='box-sizing: border-box;'>Close</a>");  
      break;
    case "modalShare":
  
  };

  setTimeout(function(){$(".pModalContainer").addClass("pShowModal");}, 1);
  $(".pModalContainer").css("display", "flex");
};

function closeModal() {
  $(".pModalContainer").removeClass("pShowModal");
  setTimeout(function(){$(".pModalContainer").css("display", "none");}, 500);
};

// Set site theme based on default or user settings
function themeAuto() {
  if (localStorage.getItem("themeAuto") == null) {
    localStorage.removeItem('themeAuto');
    $("#darkModeAuto").prop("checked", true);
    $("#darkMode").prop("disabled", true);

    // 17 represents 6:00
    if (hour < 7 || hour > 17) {
      changeTheme("Dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      changeTheme("Dark");
    } else {
      changeTheme("Light");
    };

  } else if (localStorage.getItem("theme") == "Dark") {
    changeTheme("Dark");
  };
};

function theme() {
  if ($("#darkModeAuto").prop("checked") == true) {
    localStorage.removeItem('themeAuto');
    themeAuto();
  } else if ($("#darkModeAuto").prop("checked") == false) {
    $("#darkMode").removeAttr("disabled");
    localStorage.setItem('themeAuto', 'off');
  };
  if ($("#darkMode").prop("checked") == true) {
    changeTheme("Dark");
  } else if ($("#darkMode").prop("checked") == false) {
    changeTheme("Light");
  };

};

function changeTheme(theme) {
  if (theme == "Dark") {
    localStorage.setItem('theme', 'Dark');
    $("#darkMode").prop("checked", true);
    $("html").addClass("Dark");
  } else if (theme == "Light") {
    localStorage.removeItem('theme');
    $("#darkMode").prop("checked", false);
    $("html").removeClass("Dark");
  };
};


function navigationSetup() {
  $(document).ready(function() {

    // Insert navigation template
    $(perimeter.navigation.parent).prepend("<nav class='NavContainer'><div class='NavListContainer'><div class='NavListMobile'><button onclick='menu()' class='DestyleButton pHamburgerContainer'><span class='pHamburger'></span></button></div><div class='navDesktopLogo'></div><ul class='NavListInner'></ul><div class='navDesktopSecondIcon'></div><div></div></div></div><div class='NavSpace'></nav>");
    
    // Insert navigation items
    $.each(perimeter.navigation.items, function(navItemTitle, navItemLink) {
      $(".NavListInner").append("<li class='NavListItem'><a class='DestyleButton NavItem BodyText Grey9' href='" + navItemLink + "'>" + navItemTitle + "</a></li>")
    });
    
    // Insert navigation desktop logo
    if (perimeter.navigation.logo !== undefined && perimeter.navigation.logo !== false) {
      $(".navDesktopLogo").prepend("<a href='" + perimeter.navigation.logoLink + "' class='DestyleButton APullUp NavLogo' ontouchstart><img src='" + perimeter.navigation.logo + "' class='NavLogoImg' alt='Logo'></a>");
    };
    
    // Insert navigation mobile logo
    if (perimeter.navigation.mobile.logo !== undefined && perimeter.navigation.mobile.logo !== false) {
      $(".NavListMobile").prepend("<a href='" + perimeter.navigation.logoLink + "' class='DestyleButton APullUp NavLogo' ontouchstart><img src='" + perimeter.navigation.logo + "' class='NavLogoImg' alt='Logo'></a>");
    } else if (perimeter.navigation.logo !== undefined && perimeter.navigation.logo !== false) {

    };
    
    // Set navigation second button function
    switch (perimeter.navigation.secondIcon) {
      case "search":
        secondIconImg = perimeter.origin + "/perimeter/icons/ui/search.svg";
        secondIconAlt = "search";
        secondIconAction = "href='" + perimeter.navigation.secondIconLink + "'";
        break;
      case "share":
        secondIconImg = perimeter.origin + "/perimeter/icons/ui/share.svg";
        secondIconAlt = "share button";
        secondIconAction = "onclick='navShare()'";
        break;
      case "custom":
        secondIconImg = perimeter.navigation.secondIconImage;
        secondIconAlt = "open url";
        secondIconAction = "href='" + perimeter.navigation.secondIconLink + "'";
    };
    
    // Insert navigation desktop second button
    if (perimeter.navigation.showSecondIcon !== false) {
      $(".navDesktopSecondIcon").prepend("<a " + secondIconAction + " class='DestyleButton APullUp desktopSecondIcon' ontouchstart><img src='" + secondIconImg + "' class='SecondIconImg DarkInvert' alt='" + secondIconAlt + "'></a>");
    };
    
    // Insert navigation mobile second button
    if (perimeter.navigation.mobile.showSecondIcon !== false) {
      $(".NavListMobile").prepend("<a " + secondIconAction + " class='DestyleButton APullUp mobileSecondIcon' ontouchstart><img src='" + secondIconImg + "' class='SecondIconImg DarkInvert' alt='" + secondIconAlt + "'></a>");
    };

    // Determine if navigation should be transparant at top on mobile
    if (perimeter.navigation.mobile.transparantAtTop !== undefined && perimeter.navigation.mobile.transparantAtTop !== false) {
      checkClassesMobile();
      $(window).scroll(checkClassesMobile);
    } else {
      $(".NavContainer").addClass("NavContainerBackground");
      $(".NavLogo").addClass("NavLogoShow");
    };

    // Determine if top should have buffer
    if (perimeter.navigation.topBuffer == true) {
      $(".NavSpace").addClass("navDesktopBuffer");
    }
    if (perimeter.navigation.mobile.topBuffer == true) {
      $(".NavSpace").addClass("navMobileBuffer");
    }

    // Detect navigation changing from mobile to desktop
    checkSize();
    $(window).resize(checkSize);
  });
};


// Navigation share menu
function navShare() {
  navigator.share(perimeter.navigation.shareData);
  };
  
  // Toggle navigation mobile menu
  function menu() {
  $(".pHamburgerContainer").toggleClass("pHamburgerOpen");
  $(".NavListInner").slideToggle();
  checkClassesMobile();
  };
  
  // Modify navigation when css change is detected
  function checkSize() {
  if ($(".mobileSecondIcon").css("display") == "none") {
    $(".NavListInner").css("display", "");
    $(".pHamburgerContainer").removeClass("pHamburgerOpen");
  };
  };
  
  function checkClassesMobile() {
  var s = $(".NavContainer");
  var pos = s.position();
  var windowpos = $(window).scrollTop();
  
  
  if (perimeter.navigation.mobile.transparantAtTop !== undefined && perimeter.navigation.mobile.transparantAtTop !== false) {
    if ((windowpos >= pos.top & windowpos > perimeter.navigation.mobile.transparantAtTop) || $(".pHamburgerContainer").hasClass("pHamburgerOpen")) {
    s.addClass("NavContainerBackground");
    $(".NavLogo").addClass("NavLogoShow");
    }
    else {
    s.removeClass("NavContainerBackground");
    $(".NavLogo").removeClass("NavLogoShow");
    }
  }
  else {
    s.addClass("NavContainerBackground");
    $(".NavLogo").addClass("NavLogoShow");
  }
  };
  
  
  




function footerSetup() {
  $(document).ready(function() {
    // Insert footer template
    $(perimeter.footer.parent).append("<footer class='pFooter'></footer>");

    // Insert footer items
    $.each(perimeter.footer.items, function(footerItemTitle, footerItemLink) {
      $(".pFooter").append("<a class='BodyText TextBlue FooterLink' href='" + footerItemLink + "'>" + footerItemTitle + "</a>");
    });

    if (perimeter.footer.themeToggle !== false) {
      $(".pFooter").append("<a class='BodyText TextBlue FooterLink' onclick='showModal(\"modalTheme\")'>Change Theme</a>");
    };

    // Insert footer social container
    $(".pFooter").append("<div class='pFooterSocialContainer'></div>");

    // Insert footer social items
    $.each(perimeter.footer.social, function(socialPlatform, socialLink) {
      $(".pFooterSocialContainer").append("<a class='DestyleButton pFooterSocial' href='" + socialLink + "'><img class='pFooterSocialIcon' src='/perimeter/icons/footer/" + socialPlatform + ".svg' alt='" + socialPlatform + " icon'></a>");
    });
    
    // Insert footer copyright
    if (perimeter.footer.copyright !== undefined && perimeter.footer.copyright !== false) {
      $(".pFooter").append("<p style='margin-top: 16px;' class='SmallText NoCopy CenterTXT Grey9'><span style='display: inline-block;'>Copyright &copy; " + currentYear + " " + perimeter.footer.copyright + ".</span> <span style='display: inline-block;'>All rights reserved.</span></p>");
    };
  });
};