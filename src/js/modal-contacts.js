import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function initModalContacts() {
  const modal = document.getElementById('contactsModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');
  const form = document.getElementById('contactsForm');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const subtitleEl = modal.querySelector('.modal-contacts-text');

  const STORAGE_KEY = 'register-form-data';

  const nameInput = form.elements.name;
  const emailInput = form.elements.email;
  const messageInput = form.elements.message;

  // ===== Відкриття модалки =====
  function openModal(subtitle = '') {
    subtitleEl.textContent = subtitle;
    modal.style.display = 'block';
    backdrop.style.display = 'block';
    document.body.classList.add('modal-open');

    // Очистити форму і localStorage при кожному відкритті
    localStorage.removeItem(STORAGE_KEY);
    form.reset();

    window.addEventListener('keydown', onEscPress);
  }

  // ===== Закриття модалки =====
  function closeModal() {
    modal.style.display = 'none';
    backdrop.style.display = 'none';
    document.body.classList.remove('modal-open');
    window.removeEventListener('keydown', onEscPress);
  }

  // ===== Закриття по ESC =====
  function onEscPress(e) {
    if (e.key === 'Escape') closeModal();
  }

  // ===== Обробники відкриття =====
  openButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const subtitle = btn.dataset.subtitle || '';
      openModal(subtitle);
    });
  });

  // ===== Обробники закриття =====
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });

  // ===== Валідація Email =====
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  //===== Збереження у localStorage =====
  function saveToStorage() {
    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // ===== Збереження при введенні =====
  [nameInput, emailInput, messageInput].forEach(input =>
    input.addEventListener('input', saveToStorage)
  );

  // ===== Відправка форми =====
  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!isValidEmail(emailInput.value.trim())) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a valid email.',
        position: 'topRight',
        backgroundColor: ' #b44a04',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
      });
      return;
    }

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    };

    try {
      // Імітація "відправки" без сервера
      await new Promise(resolve => setTimeout(resolve, 1000));

      iziToast.success({
        title: 'Successfully',
        message: 'Data sent successfully!',
        position: 'topRight',
        backgroundColor: '#e15d05',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
      });

      // Очистити форму та закрити модалку
      localStorage.removeItem(STORAGE_KEY);
      form.reset();

      setTimeout(() => closeModal(), 200);
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'An error occurred. Please try again.',
        position: 'topRight',
        backgroundColor: '#ff4757',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
      });
    }
  });
}
