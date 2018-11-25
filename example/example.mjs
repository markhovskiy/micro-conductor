import Router from './index.mjs';

const router = new Router({
  '': () => console.log('router:', 'root'),
  'plain': () => console.log('router:', 'plain'),
  'params/([0-9]+)/and/([a-z]+)': (first, second) => console.log('router:', `params/${first}/and/${second}`),
  'default-context': () => console.log('router:', 'context:', router.context),
});

router.notFound = () => console.log('router:', 'not found');
router.start();

class RouterWrapper {
  constructor() {
    this.router = new Router(
      {
        'redefined-wrapper-context': () => console.log('routerWrapper:', 'context:', this.router.context),
      },
      this, // context
    );

    this.router.start();
  }
}

const routerWrapper = new RouterWrapper();

window.router = router;
window.routerWrapper = routerWrapper;
