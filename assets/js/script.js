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
    if (swiper.realIndex === swiper.slides.length - 1) {
      window.addEventListener('wheel', handleScrollOnLastSlide, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    } else {
      window.removeEventListener('wheel', handleScrollOnLastSlide, { passive: false });
      window.removeEventListener('touchstart', handleTouchStart, { passive: false });
      window.removeEventListener('touchmove', handleTouchMove, { passive: false });
    }
  });

  let touchStartY = 0;

  function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
  }

  function handleTouchMove(event) {
    const touchEndY = event.touches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    
    if (swiper.realIndex === swiper.slides.length - 1) {
      if (deltaY > 0) {
        console.log('Scrolling down on the last slide.');
        window.removeEventListener('touchstart', handleTouchStart, { passive: false });
        window.removeEventListener('touchmove', handleTouchMove, { passive: false });
      } else if (deltaY < 0) {
        swiper.slideTo(swiper.realIndex - 1);
        console.log('Scrolling up on the last slide.');
        event.preventDefault(); // Prevent default behavior
      }
    }
  }

  function handleScrollOnLastSlide(event) {
    if (swiper.realIndex === swiper.slides.length - 1) {
      if (event.deltaY > 0) {
        console.log('Scrolling down on the last slide.');
        window.removeEventListener('wheel', handleScrollOnLastSlide, { passive: false });
      } else if (event.deltaY < 0) {
        swiper.slideTo(swiper.realIndex - 1);
        console.log('Scrolling up on the last slide.');
        event.preventDefault(); // Prevent default behavior
      }
    }
  }

  swiper.on('keydown', function (event) {
    if (swiper.realIndex === swiper.slides.length - 1) {
      if (event.key === 'ArrowDown') {
        console.log('Scrolling down on the last slide.');
      } else if (event.key === 'ArrowUp') {
        swiper.slideTo(swiper.realIndex - 1);
        console.log('Scrolling up on the last slide.');
        event.preventDefault(); // Prevent default behavior
      }
    }
  });

  const paginationList = document.querySelector('.pagination ul');
  for (let i = 0; i < swiper.slides.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = pad(i + 1, 2); // Pad the number with 2 digits
    paginationList.appendChild(listItem);
  }

  function pad(number, length) {
    return String(number).padStart(length, '0');
  }

  function updateDotPosition(activePage) {
    const dot = document.querySelector('.dot');
    const activePageIndex = [...activePage.parentNode.children].indexOf(activePage); // Get index of active page
    const dotTop = 7 + (activePageIndex * 6); // Calculate top position
    dot.style.top = `${dotTop}%`; // Set top position of the dot
  }

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

// testimonial

// vars
'use strict'
var	testim = document.getElementById("testim"),
		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
		touchStartPos,
		touchEndPos,
		touchPosDiff,
		ignoreTouch = 30;
;

window.onload = function() {

    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
		
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
	
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
			
				touchPosDiff = touchStartPos - touchEndPos;
			
				console.log(touchPosDiff);
				console.log(touchStartPos);	
				console.log(touchEndPos);	

			
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
			
		})
}

// testimonial

