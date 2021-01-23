import Rails from '@rails/ujs';
import Turbolinks from 'turbolinks';
import { initializeRoutes } from 'scripts/router';

require.context('../images', true);

Rails.start();
Turbolinks.start();

document.addEventListener('turbolinks:load', () => {
  initializeRoutes();
});
