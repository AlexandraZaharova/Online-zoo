const inputs = document.querySelectorAll('.filters input');
const imgContainer = document.querySelector('.img-container');
const outputs = document.querySelectorAll('.filters output');
let flag = 0;
const btnNextPicture = document.querySelector('.btn-next');
const fileInput = document.querySelector('input[type="file"]');

function drawImageFromComp() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'first');
    const img = document.querySelector('img');
    imgContainer.after(canvas);
    img.onload = function() {
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        imgContainer.setAttribute('class', 'img-none');
    }
}
function handleUpdate() {
    const suffix = this.dataset.sizing;
    this.nextElementSibling.value = this.value;
    if (document.querySelector('canvas').getAttribute('class') == "first") {
        drawImageFirst();
    } else {
        getLink(flag);
    }
}
function drawImageFirst() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.filter = `blur(${outputs[0].value}px) 
        invert(${outputs[1].value}%)
        sepia(${outputs[2].value}%) 
        saturate(${outputs[3].value}%)
        hue-rotate(${outputs[4].value}deg)`;
    ctx.drawImage(img, 0, 0);
    if (!canvas.hasAttribute('class')) {
        canvas.setAttribute('class', 'first');
    }
}
function drawImage(src) {
    const canvas = document.querySelector('canvas');
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = src;
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.filter = `blur(${outputs[0].value}px) 
        invert(${outputs[1].value}%)
        sepia(${outputs[2].value}%) 
        saturate(${outputs[3].value}%)
        hue-rotate(${outputs[4].value}deg)`;
      ctx.drawImage(img, 0, 0);
      canvas.removeAttribute('class')
    };
}
function getLink(flag) {
    let src;
    let date = new Date();
    let hours = date.getHours();
    if (hours >= 6 && hours < 12) {
      src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/";
    } else if (hours >= 12 && hours < 18) {
      src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/";
    } else if (hours >= 18 && hours < 00) {
      src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/";
    } else {
      src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/";
    }
    if (flag >20) {
      flag = 1;
      src += '01.jpg';
    } else if (flag > 9) {
      src += `${flag}.jpg`;
    } else {
      src += `0${flag}.jpg`;
    }
    drawImage(src);
}
function handleNextPicture() {
flag++;
getLink(flag);
}
function handleNewFile(e) {
    // let src;
    const image = document.querySelector('img');
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        image.innerHTML = "";
        image.replaceWith(img);
    }
    reader.readAsDataURL(file);
    fileInput.value = '';
    drawImageFirst();
}

drawImageFromComp();
inputs.forEach(input => input.addEventListener('input', handleUpdate));
btnNextPicture.addEventListener('click', handleNextPicture);
fileInput.addEventListener('change', handleNewFile);
