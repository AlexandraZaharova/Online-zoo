// slider
let gap;
if (document.documentElement.clientWidth > 640) {
  gap = 30;
} else {
  gap = 15;
}

const carousel = document.getElementById('carousel');
const next = document.querySelector('.arrowRight');
const prev = document.querySelector('.arrowLeft');
const slides = document.querySelectorAll('.img');
const range  = document.querySelector('.first-screen__range');
const textLabel = document.querySelector('.first-screen__range-label').firstElementChild;
const placeholders = document.querySelectorAll('.placeholder');
const circle = document.querySelector('.circle-active');
const firstSlide = document.querySelector('.active-img');
const btnLink = document.querySelector('.btn-link');

let slideIndex = 1;
let imgWidth = document.querySelector('.img').offsetWidth;
let width = carousel.offsetWidth;
let valueNow = range.value;
let name;
let left;
let link;

circleMovement();

window.addEventListener('resize', (e) => {
  width = carousel.offsetWidth;
  imgWidth = document.querySelector('.img').offsetWidth;
  if (document.documentElement.clientWidth > 640) {
    gap = 30;
  } else {
    gap = 15;
  }
});

function circleMovement() {
  left = slides[slideIndex].offsetLeft + 1;
  circle.style.left = `${left}px`;
}

let allSlides = document.querySelectorAll('.img').length;
let remainingSlides = allSlides - Math.floor(width / (imgWidth + gap));
let visibleSlides = allSlides - remainingSlides;
console.log(visibleSlides)

next.addEventListener('click', e => {
  slideIndex++;
  if (slideIndex < slides.length) {
    if (slideIndex < visibleSlides) {
      slides[slideIndex-1].classList.remove('active-img');
      slides[slideIndex].classList.add('active-img');
    } else {
      carousel.scrollTo((imgWidth + gap) * (slideIndex-4), 0);
      slides[slideIndex-1].classList.remove('active-img');
      slides[slideIndex].classList.add('active-img');
    }
  } else {
    slideIndex = 0;
    carousel.scrollTo(0, 0);
    slides[slides.length-1].classList.remove('active-img');
    slides[0].classList.add('active-img');
  }
  range.value = slideIndex + 1;
  valueNow = slideIndex + 1;
  textLabel.innerText = `0${range.value}/`;
  name = slides[range.value-1].classList[0];
  placeholderActive(name);
  circleMovement();
});

prev.addEventListener('click', e => {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
    carousel.scrollTo((imgWidth + gap) * slides.length, 0);
    slides[0].classList.remove('active-img');
    slides[slides.length-1].classList.add('active-img');
  } else {
    if (slides[slideIndex].offsetLeft > carousel.scrollLeft) {
      slides[slideIndex+1].classList.remove('active-img');
      slides[slideIndex].classList.add('active-img');
    } else if (slides[slideIndex].offsetLeft <= carousel.scrollLeft) {
      carousel.scrollTo((imgWidth + gap) * (slideIndex), 0);
      slides[slideIndex+1].classList.remove('active-img');
      slides[slideIndex].classList.add('active-img');
    }
  }

  range.value = slideIndex + 1;
  valueNow = slideIndex + 1;
  textLabel.innerText = `0${range.value}/`;
  name = slides[range.value-1].classList[0];
  placeholderActive(name);
  circleMovement();
});

range.addEventListener('input', e => {
  slideIndex = range.value - 1;
  if (valueNow < range.value) {
    if (slides[slideIndex].offsetLeft <= carousel.scrollLeft) {
      slides.forEach(slide => slide.classList.remove('active-img'));
      slides[range.value-1].classList.add('active-img');
    } else if (slides[range.value - 1].offsetLeft > carousel.scrollLeft){
      remainingSlides--;
      carousel.scrollTo((imgWidth + gap) * (range.value - visibleSlides), 0);
      slides.forEach(slide => slide.classList.remove('active-img'));
      slides[range.value-1].classList.add('active-img');
    }
  } else {
    if (slides[range.value - 1].offsetLeft >= carousel.scrollLeft) {
      slides.forEach(slide => slide.classList.remove('active-img'));
      slides[range.value-1].classList.add('active-img');
    } else if (slides[slideIndex].offsetLeft < carousel.scrollLeft) {
      carousel.scrollTo((imgWidth + gap) * slideIndex, 0);
      slides.forEach(slide => slide.classList.remove('active-img'));
      slides[range.value-1].classList.add('active-img');
    }
  }
  valueNow = range.value;
  textLabel.innerText = `0${range.value}/`;
  name = slides[range.value-1].classList[0];
  placeholderActive(name);
  circleMovement();
})

const handleActive = (e) => {
  name = e.target.classList[0];
  let i;
  slides.forEach((slide, index) => {
    slide.classList.remove('active-img');
    if (slide.classList.contains(`${name}`)) {
      i = index;
    }
  });
  e.target.classList.add('active-img');
  range.value = i + 1;
  valueNow = i + 1;
  textLabel.innerText = `0${range.value}/`;
  placeholderActive(name);
  slideIndex = i;
  console.log(slideIndex)
  circleMovement();
}

const placeholderActive = (name) => {
  placeholders.forEach(placeholder => {
    placeholder.firstElementChild.classList.remove('active-mark');
    if (placeholder.title === name) {
      placeholder.firstElementChild.classList.add('active-mark');
      link = placeholder.getAttribute("data-text");
    }
  });
  addLink(link);
}

const  handlePlaceholderActive = (e) => {
  let elem = e.target.closest('div.placeholder');
  name = elem.title;
  placeholders.forEach(placeholder => {
    placeholder.firstElementChild.classList.remove('active-mark');
  });
  elem.firstElementChild.classList.add('active-mark');
  link = elem.getAttribute("data-text");
  active(name);
  addLink(link);
}

const active = (name) => {
  let i;
  slides.forEach((slide, index) => {
    slide.classList.remove('active-img');
    if (slide.classList.contains(`${name}`)) {
      slide.classList.add('active-img');
      i = index;
    }
  });
  range.value = i + 1;
  valueNow = i + 1;
  textLabel.innerText = `0${range.value}/`;
  slideIndex = i;
  circleMovement();
}

const  addLink = (link) => {
  btnLink.setAttribute('href', link);
}

slides.forEach(slide => slide.addEventListener('click', handleActive));
placeholders.forEach(placeholder => placeholder.addEventListener('click', handlePlaceholderActive));