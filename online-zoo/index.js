// pop-up
const coverElem = document.getElementById('cover');
const popap = document.getElementById('popap');
const donateBtn = document.getElementById('donate');
const popapDonateBtn = document.getElementById('popap-donate');
const popapSelect = document.getElementById('popap-select-animal');
const popapName = document.getElementById('popap-name');
const popapEmail = document.getElementById('popap-email');
const popapTel = document.getElementById('popap-tel');
const popapSum = document.getElementById('popap-sum');
const popapCard = document.getElementById('popap-card');
const popapDate = document.getElementById('popap-date');
const popapCvc = document.getElementById('popap-cvc');

const  validate = () => {
  if (popapSelect.validity.valid && popapName.validity.valid && popapEmail.validity.valid &&
    popapTel.validity.valid && popapSum.validity.valid && popapCard.validity.valid &&
    popapDate.validity.valid && popapCvc.validity.valid) {
    popapDonateBtn.classList.remove('invalid');
  } else {
    popapDonateBtn.classList.add('invalid');
  }
}

donateBtn.addEventListener('click', () => {
  document.body.classList.add('notScrollable');
  coverElem.classList.remove('hidden');
  popap.classList.remove('hidden');
})

coverElem.addEventListener('click', () => {
  document.body.classList.remove('notScrollable');
  coverElem.classList.add('hidden');
  popap.classList.add('hidden');
})

popapDonateBtn.addEventListener('click', () => {
  if ( popapDonateBtn.classList.contains('invalid')) return;
  document.body.classList.remove('notScrollable');
  coverElem.classList.add('hidden');
  popap.classList.add('hidden');
})

popapSelect.addEventListener('input', () => {
  validate();
})

popapName.addEventListener('input', () => {
  validate();
})

popapEmail.addEventListener('input', () => {
  validate();
})

popapTel.addEventListener('input', () => {
  validate();
})

popapSum.addEventListener('input', () => {
  validate();
})

popapCard.addEventListener('input', () => {
  validate();
})

popapDate.addEventListener('input', () => {
  validate();
})

popapCvc.addEventListener('input', () => {
  validate();
})

// slider Pets in Zoo
const gap = 30;

const carousel = document.getElementById('carousel');
const next = document.querySelector('.fourth_screen-gallery-arrow-right');
const prev = document.querySelector('.fourth_screen-gallery-arrow-left');
const slides = document.querySelectorAll('.fourth_screen-slider__img');
const range  = document.querySelector('.fourth-screen__range');
const textLabel = document.querySelector('.fourth_screen__range-label').firstElementChild;

let slideIndex = 0;
let imgWidth = document.querySelector('.fourth_screen-slider__img').offsetWidth;
let width = carousel.offsetWidth;
let valueNow = range.value;

window.addEventListener('resize', (e) => {
  width = carousel.offsetWidth;
  imgWidth = document.querySelector('.fourth_screen-slider__img').offsetWidth;
});
let allSlides = document.querySelectorAll('.fourth_screen-slider__img').length;
let remainingSlides = allSlides - Math.floor(width / imgWidth);
let visibleSlides = allSlides - remainingSlides;

next.addEventListener('click', e => {
  slideIndex++;
  if (slideIndex < slides.length) {
    // carousel.scrollTo((imgWidth + gap) * slideIndex, 0);
    if (slideIndex < visibleSlides) {
      slides[slideIndex-1].firstElementChild.classList.remove('active');
      slides[slideIndex].firstElementChild.classList.add('active');
    } else {
      remainingSlides--;
      carousel.scrollTo((imgWidth + gap) * (slideIndex - (visibleSlides - 1)), 0);
      slides[slideIndex-1].firstElementChild.classList.remove('active');
      slides[slideIndex].firstElementChild.classList.add('active');
    }
  } else {
    slideIndex = 0;
    carousel.scrollTo(0, 0);
    slides[slideIndex].firstElementChild.classList.add('active');
    remainingSlides = allSlides - Math.floor(width / imgWidth);
  }
  range.value = slideIndex + 1;
  valueNow = slideIndex + 1;
  textLabel.innerText = `0${range.value}/`;
});

prev.addEventListener('click', e => {
  if (slideIndex === 0) {
    slideIndex = slides.length;
    carousel.scrollTo((imgWidth + gap) * slides.length, 0);
    slides[slideIndex - 1].firstElementChild.classList.add('active');
  } else if (slides[slideIndex].offsetLeft > carousel.scrollLeft) {
    slides[slideIndex].firstElementChild.classList.remove('active');
    slides[slideIndex-1].firstElementChild.classList.add('active');
  } else if (slides[slideIndex].offsetLeft === carousel.scrollLeft || slides[slideIndex].offsetLeft < carousel.scrollLeft) {
    carousel.scrollTo((imgWidth + gap) * (slideIndex - 1), 0);
    slides[slideIndex].firstElementChild.classList.remove('active');
    slides[slideIndex-1].firstElementChild.classList.add('active');
  }
  slideIndex--;
  range.value = slideIndex + 1;
  valueNow = slideIndex + 1;
  textLabel.innerText = `0${range.value}/`;
});

range.addEventListener('input', e => {
  slideIndex = range.value - 1;
  if (valueNow < range.value) {
    if (slides[slideIndex].offsetLeft <= carousel.scrollLeft) {
      slides.forEach(slide => slide.firstElementChild.classList.remove('active'));
      slides[range.value-1].firstElementChild.classList.add('active');
    } else if (slides[range.value - 1].offsetLeft > carousel.scrollLeft){
      remainingSlides--;
      carousel.scrollTo((imgWidth + gap) * (range.value - visibleSlides), 0);
      slides.forEach(slide => slide.firstElementChild.classList.remove('active'));
      slides[range.value-1].firstElementChild.classList.add('active');
    }
  } else {
    if (slides[range.value - 1].offsetLeft >= carousel.scrollLeft) {
      slides.forEach(slide => slide.firstElementChild.classList.remove('active'));
      slides[range.value-1].firstElementChild.classList.add('active');
    } else if (slides[slideIndex].offsetLeft < carousel.scrollLeft) {
      carousel.scrollTo((imgWidth + gap) * slideIndex, 0);
      slides.forEach(slide => slide.firstElementChild.classList.remove('active'));
      slides[range.value-1].firstElementChild.classList.add('active');
    }
  }
  valueNow = range.value;
  textLabel.innerText = `0${range.value}/`;
})