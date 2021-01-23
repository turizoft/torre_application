import dayjs from 'dayjs';
import 'dayjs/locale/es';
import RelativeTime from 'dayjs/plugin/relativeTime';
import IsYesterday from 'dayjs/plugin/isYesterday';
import IsToday from 'dayjs/plugin/isToday';
import IsTomorrow from 'dayjs/plugin/isTomorrow';

export function parseDates(root_element = 'body') {
  dayjs.locale('es');
  dayjs.extend(IsYesterday);
  dayjs.extend(RelativeTime);
  dayjs.extend(IsToday);
  dayjs.extend(IsTomorrow);

  root_element.querySelectorAll('[data-dayjs-format]').forEach((element) => {
    const date = dayjs(element.textContent);
    const date_formatted = date
      .format(element.dataset.dayjsFormat || 'MMMM D, YYYY')
      .replace('of', 'de')
      .toLowerCase();
    element.outerHTML = (function () {
      if (element.hasAttribute('data-dayjs-humanize')) {
        switch (false) {
          case !date.isYesterday():
            return 'ayer';
          case !date.isToday():
            return 'hoy';
          case !date.isTomorrow():
            return 'mañana';
          default:
            return `el ${date_formatted}`;
        }
      } else {
        return date_formatted;
      }
    })();
  });

  root_element.querySelectorAll('[data-dayjs-from-now]').forEach((element) => {
    element.outerHTML = dayjs(element.textContent).fromNow();
  });
}
