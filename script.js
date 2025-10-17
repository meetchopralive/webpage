// Save as: script.js
document.addEventListener('DOMContentLoaded',()=>{
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #year2, #year3, #year4, #year5').forEach(el=>{ if(el) el.textContent = y });
});

/* small mailto handler for contact form */
function handleContact(e){
  if(!e) return;
  e.preventDefault();
  const name = document.getElementById('name')?.value || '';
  const email = document.getElementById('email')?.value || '';
  const message = document.getElementById('message')?.value || '';
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\n(from: ' + name + ' | ' + email + ')');
  window.location.href = `mailto:meetchopra@example.com?subject=${subject}&body=${body}`;
}
