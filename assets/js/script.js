// slider
document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.mySwiper', {
    direction: "vertical",
    slidesPerView: 1,
    mousewheel: {
      releaseOnEdges: true,
    },
    speed: 1000,
    pagination: {
      el: '.pagination ul',
      clickable: true,
    },
    keyboard: {
      enabled: true,
    },
    on: {
      init: function () {
        animateBannerText(this.slides[this.activeIndex]);
      },
      slideChangeTransitionStart: function () {
        gsap.to('.banner-text', { opacity: 0, x: -200, duration: 0.5 });
      },
      slideChangeTransitionEnd: function () {
        animateBannerText(this.slides[this.activeIndex]);
      },
      slideChange: function () {
        const activeIndex = this.realIndex + 1;
        const paginationNumbers = document.querySelectorAll('.pagination ul li');
        paginationNumbers.forEach((number, index) => {
          number.textContent = pad(index + 1, 2); // Pad the number with 2 digits
          number.classList.remove('active-page');
          if (index === activeIndex - 1) {
            number.classList.add('active-page');
            updateDotPosition(number); // Update dot position based on active page
          }
        });
      },
    },
  });

  swiper.on('slideChange', function () {
    // Custom behavior for the last slide (slide number 5)
    if (swiper.realIndex === swiper.slides.length - 1) {
      // Enable scrolling to the next section
      window.addEventListener('wheel', handleScrollOnLastSlide, { passive: false });
    } else {
      window.removeEventListener('wheel', handleScrollOnLastSlide, { passive: false });
    }
  });

  function handleScrollOnLastSlide(event) {
    if (event.deltaY > 0) {
      console.log('Scrolling down on the last slide.');
      // Allow default scrolling behavior to next section
      window.removeEventListener('wheel', handleScrollOnLastSlide, { passive: false });
    } else if (event.deltaY < 0) {
      // Prevent default scrolling behavior and go to the previous slide
      swiper.slideTo(swiper.realIndex - 1);
      console.log('Scrolling up on the last slide.');
      event.preventDefault(); // Prevent default behavior
    }
  }

  swiper.on('keydown', function (event) {
    if (swiper.realIndex === swiper.slides.length - 1) {
      if (event.key === 'ArrowDown') {
        // Allow default scrolling behavior to next section
        console.log('Scrolling down on the last slide.');
      } else if (event.key === 'ArrowUp') {
        // Prevent default scrolling behavior and go to the previous slide
        swiper.slideTo(swiper.realIndex - 1);
        console.log('Scrolling up on the last slide.');
        event.preventDefault(); // Prevent default behavior
      }
    }
  });

  // Populate pagination numbers
  const paginationList = document.querySelector('.pagination ul');
  for (let i = 0; i < swiper.slides.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = pad(i + 1, 2); // Pad the number with 2 digits
    paginationList.appendChild(listItem);
  }

  // Function to pad numbers with leading zeros
  function pad(number, length) {
    return String(number).padStart(length, '0');
  }

  // Function to update dot position based on active page
  function updateDotPosition(activePage) {
    const dot = document.querySelector('.dot');
    const activePageIndex = [...activePage.parentNode.children].indexOf(activePage); // Get index of active page
    const dotTop = 7 + (activePageIndex * 6); // Calculate top position
    dot.style.top = `${dotTop}%`; // Set top position of the dot
  }

  // Function to animate banner text
  function animateBannerText(activeSlide) {
    gsap.fromTo(activeSlide.querySelector('.banner-text'),
      { opacity: 0, x: -200 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.3 }
    );
  }
});

var tl = gsap.timeline();

tl.from("nav .navbar-brand, nav .nav-item, nav .rightdiv", {
  y: -40,
  duration: 0.7,
  delay: 0.5,
  opacity: 0,
  stagger: 0.15
})

tl.from(".banner .banner-text h2", {
  opacity: 0,
  x: -200,
  stagger: 0.15,
  duration: 0.6
})

tl.from(".banner .banner-text p", {
  opacity: 0,
  x: -200,
  stagger: 0.15,
  duration: 0.6
})

tl.from(".banner .banner-text .banner-read", {
  opacity: 0,
  x: -200,
  stagger: 0.15,
  duration: 0.6
})

tl.from(".banner .banner-text .banner-read-icon", {
  opacity: 0,
  x: -200,
  stagger: 0.15,
  duration: 0.6
})

tl.from(".pagination", {
  opacity: 0,
  x: 100,
  stagger: 0.15,
  duration: 0.6
})

tl.from(".social li", {
  opacity: 0,
  y: 30,
  stagger: 0.15,
  duration: 0.6
})



// slider


// card slider

const carousel3Dswiper = new Swiper(".carousel-3D-swiper", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 2,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 1200,
    modifier: 1,
    slideShadows: true
  },
   navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination"
  }
});

// card slider

