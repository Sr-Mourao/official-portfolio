document.getElementById("menu-toggle").addEventListener("click", function () {
  var navbar = document.getElementById("navbar-search");
  navbar.classList.toggle("hidden");
});

const form = document.getElementById('contactForm');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = document.getElementById('submit-button');
  const loadingButton = document.getElementById('loading-button');

  // Exibe o botão de carregamento e esconde o botão normal
  submitButton.style.display = 'none';
  loadingButton.style.display = 'inline-flex';
  // Função de validação genérica
  const validateField = (field, condition, errorId, errorMessage) => {
    const errorElement = document.getElementById(errorId);
    const isValid = condition(field.value.trim());
    field.classList.toggle('border-red-500', !isValid);
    field.classList.toggle('border-gray-600', isValid);
    errorElement.textContent = isValid ? '' : errorMessage;
    errorElement.classList.toggle('hidden', isValid);
    return isValid;
  };

  // Funções de validação específicas
  const isNotEmpty = (value) => value.length > 0;
  const isValidName = (value) => value.length >= 3;
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidMessage = (value) => value.length >= 10;

  // Captura os campos
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');

  // Validações
  const isNameValid = validateField(
    nameField,
    isValidName,
    'name-error',
    'O nome deve ter pelo menos 3 caracteres.'
  );

  const isEmailValid = validateField(
    emailField,
    isValidEmail,
    'email-error',
    'Insira um e-mail válido.'
  );

  const isMessageValid = validateField(
    messageField,
    isValidMessage,
    'message-error',
    'A mensagem deve ter pelo menos 10 caracteres.'
  );

  // Só prossegue se todos os campos forem válidos
  if (!(isNameValid && isEmailValid && isMessageValid)) return;

  // Dados do formulário
  const items = {
    nome: nameField.value.trim(),
    email: emailField.value.trim(),
    mensagem: messageField.value.trim(),
  };

  // Envio dos dados
  try {
    const baseUrl = 'https://api.mouraocode.com.br/contact/v1';
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    });

    if (!response.ok) throw new Error('Falha ao enviar o formulário.');

    Toastify({
      text: "Enviado com sucesso!",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      gravity: "bottom",
      duration: 5000
    }).showToast();

    form.reset();

    // Remove feedback visual (bordas vermelhas)
    [nameField, emailField, messageField].forEach((field) => {
      field.classList.remove('border-red-500');
      field.classList.add('border-gray-600');
    });

    // Oculta mensagens de erro
    ['name-error', 'email-error', 'message-error'].forEach((errorId) => {
      document.getElementById(errorId).classList.add('hidden');
    });
  } catch (error) {
    console.error('Erro:', error);
    alert('Ocorreu um erro ao enviar o formulário.');
  } finally {
    submitButton.style.display = 'block';
    loadingButton.style.display = 'none';
  }
});
