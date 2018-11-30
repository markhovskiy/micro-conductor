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
    this.router = new Router(
      {
        // "#redefined-wrapper-context"
        'redefined-wrapper-context': (route) => (
          console.log(`route: "${route}", context: ${this.router.context.constructor.name}`)
          // route: "redefined-wrapper-context", context: RouterWrapper
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
