import Router, {parse} from './index.mjs';

const router = new Router({
  // "#"
  '': (route) => (
    console.log(route)
    // ""
  ),

  // "#plain"
  'plain': (route) => (
    console.log(route)
    // "plain"
  ),

  // "#params/50/and/ten"
  'params/([0-9]+)/and/([a-z]+)': (route, ...keys) => (
    console.log(route, keys)
    // "params/50/and/ten" ["50", "ten"]
  ),

  // "#parse/1/and/two/and/3/and/Four/and/whatever"
  [parse`parse/${1}/and/${'two'}/and/${/[0-9]+/}/and/${/[a-z,A-Z]+/}/and/${null}`]: (route, ...keys) => (
    console.log(route, keys)
    // "parse/1/and/two/and/3/and/Four/and/whatever" ["1", "two", "3", "Four", "whatever"]
  ),

  // "#default-context"
  'default-context': (route) => (
    console.log(route, router.context.constructor.name)
    // "default-context" Router
  ),
});

// "#non-existing-route"
router.notFound = (route) => (
  console.log(`"${route}" (not found)`)
  // "non-existing-route" (not found)
);

router.start();

class RouterWrapper {
  constructor() {
    const r1 = new Router(
      {
        // "#original-context-fat-arrow-function"
        'original-context-fat-arrow-function': () => {
          console.log(this.constructor.name, r1.context.constructor.name);
          // RouterWrapper Router
        },

        // "#original-context-regular-function"
        'original-context-regular-function': function () {
          console.log(this.constructor.name, r1.context.constructor.name);
          // Router Router
        },
      },
      // context is not redefined
    );

    const r2 = new Router(
      {
        // "#redefined-context-fat-arrow-function"
        'redefined-context-fat-arrow-function': () => {
          console.log(this.constructor.name, r2.context.constructor.name);
          // RouterWrapper RouterWrapper
        },

        // "#redefined-context-regular-function"
        'redefined-context-regular-function': function () {
          console.log(this.constructor.name, r2.context.constructor.name);
          // RouterWrapper RouterWrapper
        },
      },
      this, // context of "RouterWrapper"
    );

    r1.start();
    r2.start();
  }
}

const routerWrapper = new RouterWrapper();

window.router = router;
window.routerWrapper = routerWrapper;
