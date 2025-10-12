
document.addEventListener('DOMContentLoaded', function(){
  // menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  menuToggle && menuToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('active');
  });

  // modal control
  const modal = document.getElementById('modal');
  const openFeedback = document.getElementById('openFeedback');
  const closeModal = document.getElementById('closeModal');

  function openModal(){
    modal.setAttribute('aria-hidden','false');
    // trap focus basic
    const focusable = modal.querySelector('button, [href], input, textarea');
    if(focusable) focusable.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModalFunc(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  openFeedback && openFeedback.addEventListener('click', openModal);
  closeModal && closeModal.addEventListener('click', closeModalFunc);
  modal.addEventListener('click', function(e){
    if(e.target === modal) closeModalFunc();
  });

  // form validation visual
  const form = document.querySelector('.form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      let valid = true;
      const fields = form.querySelectorAll('[required]');
      fields.forEach(f => {
        const err = f.parentElement.querySelector('.form-error');
        if(!f.value || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value))){
          valid = false;
          err.textContent = 'Campo obrigatório ou inválido';
          f.setAttribute('aria-invalid','true');
        } else {
          err.textContent = '';
          f.removeAttribute('aria-invalid');
        }
      });
      if(valid){
        // mostrar modal de sucesso
        openModal();
        form.reset();
      }
    });
  }
});
