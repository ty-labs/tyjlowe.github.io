import { TypeWriter, AltTypeWriter } from './components/typewriter.js';

// JS after page loaded
jQuery(function() {
  init();
  scrollWatch();
})

// init app
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
}

// to change active navbar item on click
$('.nav-link').on("click", function () {
  let elem = $(this), navBar = elem.parent().parent();
  navBar.find('li a').removeClass('my-color-active');
  if (!elem.hasClass('my-color-active')) {
  }
});

// enforce navbar collapsed on click for mobile
$('.navbar-collapse a').on("click", function() {
  $(".navbar-collapse").collapse('hide');
});

// for scrolling
function scrollWatch() {
  //cache the object with the elements, get all necessary components
  let aboutY = $(".about").position().top - 65;
  let projectY = $(".projects-and-work").position().top - 65;
  let homeLink = $("#home-link");
  let aboutLink = $("#about-link");
  let projectWorkLink = $("#project-work-link");
  console.log(homeLink, aboutLink, projectWorkLink);
  $(window).scroll(function() {
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
  })
}