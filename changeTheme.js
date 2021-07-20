const toggle = document.getElementById('toggle-button');
if (!localStorage.theme) {
  localStorage.theme = "light";
}
document.body.className = localStorage.theme;
if (document.body.classList.contains('dark')) {
  toggle.setAttribute('checked', true);
}
console.log(toggle.checked)

function handleChange() {
  document.body.classList.toggle('dark');
  localStorage.theme = document.body.className || "light";
}

toggle.addEventListener('change', handleChange);