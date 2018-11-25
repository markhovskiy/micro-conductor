import Router, {parse} from './index.mjs';

const router = new Router({
  // "#"
  '': (route) => (
    // "Router route:  (root)"
    console.log(router.constructor.name, 'route:', route, '(root)')
  ),

  // "#plain"
  'plain': (route) => (
    // "Router route: plain"
    console.log(router.constructor.name, 'route:', route)
  ),

  // "#params/50/and/ten"
  'params/([0-9]+)/and/([a-z]+)': (route, ...keys) => (
    // "Router route: params/50/and/ten keys: 50 ten"
    console.log(router.constructor.name, 'route:', route, 'keys:', ...keys)
  ),

  // "#parse/1/and/two/and/3/and/Four/and/whatever"
  [parse`parse/${1}/and/${'two'}/and/${/[0-9]+/}/and/${/[a-z,A-Z]+/}/and/${null}`]: (route, ...keys) => (
    // "Router route: parse/1/and/two/and/3/and/Four/and/whatever keys: 1 two 3 Four whatever"
    console.log(router.constructor.name, 'route:', route, 'keys:', ...keys)
  ),

  // "#default-context"
  'default-context': (route) => (
    // "Router route: default-context context: Router {routes: {…}, context: Router, notFound: ƒ, navigate: ƒ}"
    console.log(router.constructor.name, 'route:', route, 'context:', router.context)
  ),
});

// "#not-found"
router.notFound = (route) => (
  // "Router route: not-found (not found)"
  console.log(router.constructor.name, 'route:', route, '(not found)')
);

router.start();

class RouterWrapper {
  constructor() {
    this.router = new Router(
      {
        // "#redefined-wrapper-context"
        'redefined-wrapper-context': (route) => (
          // "RouterWrapper route: redefined-wrapper-context context: RouterWrapper {router: Router}"
          console.log(this.constructor.name, 'route:', route, 'context:', this.router.context)
        ),
      },
      this, // context
    );

    this.router.start();
  }
}

const routerWrapper = new RouterWrapper();

window.router = router;
window.routerWrapper = routerWrapper;
