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