import { TypeWriter, AltTypeWriter } from './components/typewriter.js';

// JS after page loaded
jQuery(function() {
  init();
})

// initialize JS for site
function init() {
  setTimeout(function () {
    let textElement = $('.h-txt');
    let word = textElement.attr('data-words');
    new AltTypeWriter(textElement, word);
  }, 3200);
  setTimeout(function () {
    let textElement = $('.txt-type');
    let words = JSON.parse(textElement.attr('data-words'));
    let wait = textElement.attr('data-wait');
    new TypeWriter(textElement, words, wait);
  }, 5050);
  initNavbar();
  initResizes();
}

// initialize JS for navbar stuff
function initNavbar() {
  // to change active navbar item on click
  $('.nav-link').on("click", function () {
    let elem = $(this), navBar = elem.parent().parent();
    navBar.find('li a').removeClass('my-color-active');
    if (!elem.hasClass('my-color-active')) {
      elem.addClass('my-color-active');
    }
  });
  // enforce navbar collapses when clicked on mobile
  $('.navbar-collapse a').on("click", function() {
    $(".navbar-collapse").collapse('hide');
  });
  // open modal when clicked
  $('#contact-button').on("click", function() {
    $("#contact-modal").modal('toggle');
  });
}

// initialize JS for scroll/click watching on resizes
function initResizes() {
  scrollAndClickWatch();
  $(window).on("resize", function() {
    scrollAndClickWatch();
  });
}

function scrollAndClickWatch() {
  console.log("Resize event happened");
  let aboutY = $(".about").position().top - 65;
  let projectY = $(".projects-and-work").position().top - 60;
  let homeLink = $("#home-link"), aboutLink = $("#about-link"), projectWorkLink = $("#project-work-link");
  // update navbar "active" depending on screen location 
  $(window).on("scroll", function() {
    let scroll = $(window).scrollTop();
    if (scroll >= aboutY && scroll < projectY) {
      homeLink.removeClass("my-color-active");
      projectWorkLink.removeClass("my-color-active");
      aboutLink.addClass("my-color-active");
    } else if (scroll >= projectY) {
      homeLink.removeClass("my-color-active");
      projectWorkLink.addClass("my-color-active");
      aboutLink.removeClass("my-color-active");
    } else {
      homeLink.addClass("my-color-active");
      projectWorkLink.removeClass("my-color-active");
      aboutLink.removeClass("my-color-active");
    }
  });
  // update where navbar items will send user if clicked after resizing
  aboutLink.on("click", function() {
    window.scrollTo(0, aboutY);
  });
  projectWorkLink.on("click", function() {
    window.scrollTo(0, projectY + 5);
  });
  homeLink.on("click", function() {
    window.scrollTo(0, 0);
  });
}