'use strict';
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

function saveToLS(key = 'empty', value = '') {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}
function loadFromLS(key) {
  const data = localStorage.getItem(key);

  try {
    const result = JSON.parse(data);
    return result;
  } catch {
    return data;
  }
}

function getFormData() {
  const userEmail = form.elements.email.value.trim();
  const userMessage = form.elements.message.value.trim();

  return {
    email: userEmail,
    message: userMessage,
  };
}

form.addEventListener('input', e => {
  const data = getFormData();
  saveToLS(STORAGE_KEY, data);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = getFormData();

  if (data.email === '' || data.message === '') {
    alert('Please fill out all fields.');
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  form.reset();

  console.log(data);
});

function loadDataToForm() {
  const data = loadFromLS(STORAGE_KEY) || {};
  form.elements.email.value = data.email || '';
  form.elements.message.value = data.message || '';
}
loadDataToForm();
