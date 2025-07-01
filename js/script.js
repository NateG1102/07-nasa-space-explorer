// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const getImagesBtn = document.getElementById('getImages');
const gallery = document.getElementById('gallery');
const loading = document.getElementById('loading');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalExplanation = document.getElementById('modal-explanation');
const closeButton = document.querySelector('.close-button');

setupDateInputs(startInput, endInput);

const API_KEY = 'ujwhMSBJVeAMYTCayj9EQO8B4xXmubVYY4Sl4SZe';

getImagesBtn.addEventListener('click', () => {
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (!startDate || !endDate) return;

  loading.classList.remove('hidden');
  gallery.innerHTML = '';

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`)
    .then(res => res.json())
    .then(data => {
      loading.classList.add('hidden');
      if (!Array.isArray(data)) {
        gallery.innerHTML = '<p>⚠️ No data available for this date range.</p>';
        return;
      }

      data.reverse().forEach(item => {
        if (item.media_type !== 'image') return;
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
          <img src="${item.url}" alt="${item.title}" />
          <p><strong>${item.title}</strong><br>${item.date}</p>
        `;
        div.addEventListener('click', () => {
          modal.classList.remove('hidden');
          modalImg.src = item.hdurl || item.url;
          modalTitle.textContent = item.title;
          modalDate.textContent = item.date;
          modalExplanation.textContent = item.explanation;
        });
        gallery.appendChild(div);
      });
    })
    .catch(err => {
      loading.classList.add('hidden');
      gallery.innerHTML = `<p>🚫 Failed to load images. Try again later.</p>`;
      console.error(err);
    });
});

closeButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('load', () => {
  modal.classList.add('hidden');
});