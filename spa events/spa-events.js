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
    guestDiv.classList.add('guest');

    for (let guest of guest.spa_guests) {
      const guestEl = document.createElement('p');

      guestEl.textContent = guest.name;

      guestEl.addEventListener('click', async () => {
        await deleteSpaGuest(guest.id);
        fetchAndDisplaySpaEvents();
      });
      guestDiv.append(guestEl);
    }
    eventEl.append(guestDiv, eventNameEl);

    eventsDiv.append(eventEl);

  }
}


window.addEventListener('load', () => {
  fetchAndDisplaySpaEvents();
});


