import Router, {parse} from './index.mjs';

const router = new Router({
  // "#"
  '': (route) => (
    console.log(`route: "${route}" (root)`)
    // route: "" (root)
  ),

  // "#plain"
  'plain': (route) => (
    console.log(`route: "${route}"`)
    // route: "plain"
  ),

  // "#params/50/and/ten"
  'params/([0-9]+)/and/([a-z]+)': (route, ...keys) => (
    console.log(`route: "${route}", keys: ${JSON.stringify(keys)}`)
    // route: "params/50/and/ten", keys: ["50","ten"]
  ),

  // "#parse/1/and/two/and/3/and/Four/and/whatever"
  [parse`parse/${1}/and/${'two'}/and/${/[0-9]+/}/and/${/[a-z,A-Z]+/}/and/${null}`]: (route, ...keys) => (
    console.log(`route: "${route}", keys: ${JSON.stringify(keys)}`)
    // route: "parse/1/and/two/and/3/and/Four/and/whatever", keys: ["1","two","3","Four","whatever"]
  ),

  // "#default-context"
  'default-context': (route) => (
    console.log(`route: "${route}", context: ${router.context.constructor.name}`)
    // route: "default-context", context: Router
  ),
});

// "#non-existing-route"
router.notFound = (route) => (
  console.log(`route: "${route}" (not found)`)
  // route: "non-existing-route" (not found)
);

router.start();

class RouterWrapper {
  constructor() {
    const r1 = new Router(
      {
        // "#original-context-fat-arrow-function"
        'original-context-fat-arrow-function': (route) => {
          console.log(`route: "${route}"`);
          console.log(`current context: ${this.constructor.name}`);      // RouterWrapper
          console.log(`router context: ${r1.context.constructor.name}`); // Router
        },

        // "#original-context-regular-function"
        'original-context-regular-function': function (route) {
          console.log(`route: "${route}"`);
          console.log(`current context: ${this.constructor.name}`);      // Router
          console.log(`router context: ${r1.context.constructor.name}`); // Router
        },
      },
      // context is not redefined
    );

    const r2 = new Router(
      {
        // "#redefined-context-fat-arrow-function"
        'redefined-context-fat-arrow-function': (route) => {
          console.log(`route: "${route}"`);
          console.log(`current context: ${this.constructor.name}`);      // RouterWrapper
          console.log(`router context: ${r2.context.constructor.name}`); // RouterWrapper
        },

        // "#redefined-context-regular-function"
        'redefined-context-regular-function': function (route) {
          console.log(`route: "${route}"`);
          console.log(`current context: ${this.constructor.name}`);      // RouterWrapper
          console.log(`router context: ${r2.context.constructor.name}`); // RouterWrapper
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
