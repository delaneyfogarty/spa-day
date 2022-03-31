import { createSpaGuest, fetchSpaEvents } from '../fetch-utils.js';

const formEl = document.querySelector('.guest-form');

formEl.addEventListener('submit', async e => {
	e.preventDefault();

	const data = new FormData(formEl);

	const name = data.get('name');
	const eventId = data.get('event-id');

	await createSpaGuest({
		name: name,
		event_id: eventId
	});

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