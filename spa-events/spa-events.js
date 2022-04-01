import { checkAuth, logout, fetchSpaEvents, deleteSpaGuest } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const eventsDiv = document.querySelector('.events-container');

logoutButton.addEventListener('click', () => {
  logout();
});

async function fetchAndDisplaySpaEvents() {
  eventsDiv.textContent = '';

  const eventsData = await fetchSpaEvents();

  for (let event of eventsData) {
    const eventEl = document.createElement('div');
    const eventNameEl = document.createElement('h3');
    const guestDiv = document.createElement('div');

    eventNameEl.textContent = event.name;
    eventEl.classList.add('event');
    guestDiv.classList.add('guests');

    for (let guest of event.spa_guests) {
      const guestEl = document.createElement('p');

      guestEl.textContent = guest.name;
      guestEl.classList.add('guest');

      guestEl.addEventListener('click', async () => {
        await deleteSpaGuest(guest.id);
        fetchAndDisplaySpaEvents();
      });
      guestDiv.append(guestEl);
    }
    eventEl.append(eventNameEl, guestDiv);

    eventsDiv.append(eventEl);

  }
}

window.addEventListener('load', async () => {
  const events = await fetchSpaEvents();
  fetchAndDisplaySpaEvents(events);
});


