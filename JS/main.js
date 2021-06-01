const TypeWriter = function (txtElement, words, wait=3000) { //words is the data element, txtElement is the text inputed
  this.txtElement = txtElement; //this refers to the dom element itself
  this.words = words;
  this.txt = '';
  this.wordIndex = 0; //set up the function by gathering the needed variables and setting the ones we need
  this.wait = parseInt(wait, 10);
  this.type(); //this is a method we must create 
  this.isDeleting = false; //boolean flag for if we are deleting or not
}

//type method
TypeWriter.prototype.type = function() {
  //this is now the method that we want to run
  const current = this.wordIndex % this.words.length; //default = 0
  //full text of the current word
  const fullTxt = this.words[current];

  //check if deleting
  if (this.isDeleting) {
    //remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //add char
    this.txt = fullTxt.substring(0, this.txt.length + 1); //increase the substring by one
  }

  //insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //initial type speed
  let typeSpeed = 80;

  //if we are deleting
  if (this.isDeleting) {
    typeSpeed /= 3;
  }

  //check if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    this.isDeleting = !this.isDeleting;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = !this.isDeleting;
    //move to next word
    this.wordIndex++;

    typeSpeed = 300; // sets pause before typing next word
  }
  
  setTimeout(() => this.type(), typeSpeed) //this now run every half second, arrow function because function determines how it is run
}

const TypeWriter2 = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.type();
}

TypeWriter2.prototype.type = function () {
  const fullTxt = this.words[this.wordIndex];
  if (this.txt === fullTxt) {
    document.querySelector('.h-txt-body').style.border = "none";
    return;
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1); //increase the substring by one
  }

  this.txtElement.innerHTML = `<span class="h-txt-body">${this.txt}</span>`;
  
  setTimeout(() => this.type(), 85);
}



//for clicking and changing color
$('.nav-link').on("click", function () {
  let elem = $(this);
  // remove the active, then add active to the element that was clicked
  let navBar = elem.parent().parent();
  $(navBar).find('li a').removeClass('my-color-active');
  if (!elem.hasClass('my-color-active')) {
    elem.addClass('my-color-active');
  }
});

// so navbar autocloses within the page
$('.navbar-collapse a').on("click", function() {
  $(".navbar-collapse").collapse('hide');
});

jQuery(function() {
  init();
  scrollWatch();
});

// for scrolling
function scrollWatch() {
  //cache the object with the elements, get all necessary components
  let aboutY = $(".about").position().top - 100;
  let projectY = $(".projects").position().top - 100;
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

//Init app (stuff to pass to typewriter function on load by event)
function init() {
  setTimeout(function () {
    const txtElement = document.querySelector('.h-txt');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    new TypeWriter2(txtElement, words);
  }, 3200);
  setTimeout(function () {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words')); //JSON parse the text because it comes in as a string literal
    const wait = txtElement.getAttribute('data-wait');
    //Init typewriter 
    new TypeWriter(txtElement, words, wait); 
  }, 5050);
}