const toggle = document.getElementById('toggle-button');

function handleChange() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
}

toggle.addEventListener('change', handleChange);