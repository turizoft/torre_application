import Rails from '@rails/ujs';
import Turbolinks from 'turbolinks';

Rails.start();
Turbolinks.start();

require.context('../images', true);
