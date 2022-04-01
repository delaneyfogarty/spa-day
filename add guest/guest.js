import { createSpaGuest, fetchSpaEvents, checkAuth, logout } from '../fetch-utils.js';
// import { fetchAndDisplaySpaEvents } from '../spa-events.js';

const formEl = document.querySelector('.guest-form');
const logoutButton = document.getElementById('logout');

formEl.addEventListener('submit', async e => {
  e.preventDefault();

  const data = new FormData(formEl);

  const name = data.get('name');
  const eventId = data.get('event_id');

  await createSpaGuest({
    name: name,
    event_id: eventId
  });

	// fetchAndDisplaySpaEvents();
  formEl.reset();
  window.location.href = '../spa-events';

});

window.addEventListener('load', async () => {
  const select = document.querySelector('select');

  const options = await fetchSpaEvents();

  for (let option of options) {
    const optionEl = document.createElement('option');
    optionEl.textContent = option.name;
    optionEl.value = option.id;

    select.append(optionEl);
  }

});

checkAuth();

logoutButton.addEventListener('click', () => {
  logout();
});