import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function initFooterForm() {
  const footerForm = document.getElementById('footerForm');
  if (!footerForm) return;

  const emailInput = footerForm.querySelector(
    'input[name="footer-user-email"]'
  );

  function isValidEmail(email) {
    const pattern = new RegExp(emailInput.getAttribute('pattern'));
    return pattern.test(email);
  }

  emailInput.addEventListener('input', () => {
    const emailValue = emailInput.value.trim();
    if (!emailValue || !isValidEmail(emailValue)) {
      emailInput.style.borderColor = 'red';
    } else {
      emailInput.style.borderColor = '';
    }
  });

  footerForm.addEventListener('submit', async e => {
    e.preventDefault();

    const emailValue = emailInput.value.trim();

    if (!emailValue || !isValidEmail(emailValue)) {
      emailInput.style.borderColor = 'red';
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      iziToast.success({
        title: 'Successfully',
        message: 'Signed up successfully!',
        position: 'topRight',
        backgroundColor: '#e15d05',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
      });

      footerForm.reset();
      emailInput.style.borderColor = '';
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
