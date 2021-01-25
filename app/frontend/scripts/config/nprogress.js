import NProgress from 'nprogress';

document.addEventListener('DOMContentLoaded', () => {
  NProgress.configure({
    showSpinner: false,
    easing: 'ease-in-out',
    speed: 300,
  });

  document.addEventListener('turbolinks:request-start', () => {
    NProgress.start();
    NProgress.set(0.75);
  });

  document.addEventListener('turbolinks:request-end', () => {
    NProgress.set(0.99);
    NProgress.remove();
  });

  document.addEventListener('turbolinks:load', () => {
    NProgress.done();
  });

  document.addEventListener('turbolinks:before-cache', () => {
    NProgress.remove();
  });
});
