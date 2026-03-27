document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById('resume-form');
const fileInput = document.getElementById('resume');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const resultSection = document.getElementById('result-section');
const atsScoreEl = document.getElementById('ats-score');
const skillsListEl = document.getElementById('skills-list');
const missingSkillsListEl = document.getElementById('missing-skills-list');
const suggestionsListEl = document.getElementById('suggestions-list');

if (!form) {
  console.error("Form not found in DOM");
  return;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  if (!file) {
    showError('Please select a PDF file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('resume', file);

  setLoading(true);
  clearError();

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    renderResult(result.data);

  } catch (err) {
    showError("Failed to analyze resume");
  } finally {
    setLoading(false);
  }
});

function setLoading(isLoading) {
  loadingEl.classList.toggle("hidden", !isLoading);
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}

function clearError() {
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
}

function renderResult(data) {
  resultSection.classList.remove("hidden");
}

});