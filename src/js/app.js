import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favoritesUI from './views/favorites';
import favorites from './store/favorites';


document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;
  const tickets = ticketsUI.container;
  favoritesUI.renderFavorites(favorites.favorites);
  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
    favoritesUI.renderFavorites(favorites.favorites);
  });
  tickets.addEventListener("click", (e) => {
    favorites.create(ticketsUI.addToFavorites(e, locations.lastSearch));
    favoritesUI.renderFavorites(favorites.favorites);
  });

  favoritesUI.container.addEventListener('click', (e) => {
    e.preventDefault();
    favoritesUI.deleteFromFavories(e, favorites.favorites);
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
    console.log(locations.lastSearch);
  }
});

// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI
