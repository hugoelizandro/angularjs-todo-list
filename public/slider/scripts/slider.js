(function () {

  var parentElement;
  var elements = [];
  var buttons = [];

  var viewportElement;
  var sliderElement;

  var slideWidth = 0;
  var currentIndex = 0;

  var config = {};

  var xTouch;

  // exporting carousel
  window.Carousel = Carousel;

  /**
   * go(index);
   * Changes the slider active element
   * @param {integer} index
   */
  Carousel.prototype.go = go;

  /**
   * init();
   * Initializate the slider
   */
  Carousel.prototype.init = init;

  /**
   * next();
   * Goes to the next slide
   */
  Carousel.prototype.next = next;

  /**
   *  prev();
   *  Goes to the prev slide
   */
  Carousel.prototype.prev = prev;

  /**
   *
   * @param {string} elementSelector  class/id selector
   * @param {object} options
   * @constructor
   */
  function Carousel(elementSelector, options) {
    config.steps = options.steps || 1;
    parentElement = document.querySelector(elementSelector);
  }

  /**
   * Inits the slider
   */
  function init() {
    // transforms htmlCollection in js array
    [].slice.call(parentElement.children).forEach(function (element) {
      elements.push(element);
    });

    setupCarouselElements();
    setupViewportHeight();
    setupSliderWidth();

    setupNavbuttons();
    setupTouchEvents();

    go(0);
  }

  /**
   * Sets up the slider.
   */
  function setupCarouselElements() {
    // element that will contain the slider and buttons
    viewportElement = document.createElement('div');
    viewportElement.className = 'carousel-viewport';

    // element that will contain the slides
    sliderElement = document.createElement('div');
    sliderElement.className = 'carousel-slider';

    elements.forEach(function (element, index) {
      // appending parent child elements into sliderElement
      sliderElement.appendChild(element);
    });

    viewportElement.appendChild(sliderElement);
    parentElement.appendChild(viewportElement);
  }

  /**
   * Sets up the viewport height based on the biggest child
   */
  function setupViewportHeight() {
    // resets viewportHeight
    viewportElement.style.height = '0px';

    elements.forEach(function (element, index) {
      // removing 'px'
      var viewportHeight = viewportElement.style.height.slice(0, -2);

      // finds the biggest child and sets its height to the viewport
      if (element.offsetHeight > viewportHeight) {
        viewportElement.style.height = element.offsetHeight + 'px';
      }
    });
  }
  /**
   * Sets up the slider width
   */
  function setupSliderWidth() {
    // resets sliderElement
    sliderElement.style.width = '0px';

    var totalWidth = 0;
    elements.forEach(function (element, index) {
      slideWidth = element.offsetWidth;
      totalWidth = totalWidth += slideWidth;
    });
    sliderElement.style.width = totalWidth + 'px';
  }

  /**
   * Creates and places the navbuttons
   */
  function setupNavbuttons() {
    var prevBtn = document.createElement('a');
    prevBtn.className = 'prev';

    buttons.push(prevBtn);
    parentElement.appendChild(prevBtn);

    prevBtn.addEventListener('click', function (event) {
      event.preventDefault();
      prev();
    });
    
    var nextBtn = document.createElement('a');
    nextBtn.className = 'next';

    buttons.push(nextBtn);
    parentElement.appendChild(nextBtn);

    nextBtn.addEventListener('click', function (event) {
      event.preventDefault();
      next();
    });
  }

  /**
   * Sets up the touch events
   */
  function setupTouchEvents() {
    sliderElement.addEventListener('touchstart', function (event) {
      xTouch = event.touches[0].clientX;
    });

    sliderElement.addEventListener('touchmove', function (event) {
      if (!xTouch) {
        return;
      }

      var xRelease = event.touches[0].clientX;
      if (xRelease - xTouch > 0) {
        prev();
      } else {
        next();
      }

      xTouch = null;
    });
  }

  function go(index) {
    if (index >= elements.length) {
      index = 0;
    } else if (index < 0) {
      index = elements.length - 1;
    }

    if((viewportElement.offsetWidth + (slideWidth * index)) > sliderElement.offsetWidth){
      index = 0;
    }
    currentIndex = index;
    console.log(viewportElement.offsetWidth);
    console.log(slideWidth * index);
    console.log(sliderElement.offsetWidth);

    // moving slider
    sliderElement.style.left = '-' + (slideWidth * index) + 'px';

    buttons.forEach(function (button) {
//      if (button.getAttribute('data-carousel-index') === currentIndex.toString()) {
//        // adding active class
//        button.className = 'carousel-navbutton active';
//      } else {
//        // removing active class
//        button.className = 'carousel-navbutton';
//      }
    });
  }


  function next() {
    go(currentIndex + 1);
  }

  function prev() {
    go(currentIndex - 1);
  }
})();