# micro-conductor

  [![travis][travis-image]][travis-url]
  [![deps][deps-image]][deps-url]
  [![license][license-image]][license-url]
  [![test coverage][test-coverage-image]][test-coverage-url]
  ![code size][code-size-image]

A routing library for the browser.
Currently works only with hash-based routes (`#plain`).
Supports RegExp parametrization in plain strings and [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates).

## usage

```js
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

router.start(); // or "router.start(false)" for not navigating immediately

...

router.stop();
```

The `Router()` constructor accepts `context` as an optional second argument:

```js
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
```

## running tests

```bash
# make sure to "yarn install" first
$ yarn test      # just tests
$ yarn coverage  # tests with coverage report
$ yarn run:dev   # run a static server for manual testing
```

[travis-image]: https://img.shields.io/travis/oleksmarkh/micro-conductor/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/oleksmarkh/micro-conductor
[deps-image]: https://img.shields.io/david/oleksmarkh/micro-conductor.svg?style=flat-square
[deps-url]: https://david-dm.org/oleksmarkh/micro-conductor
[license-image]: https://img.shields.io/github/license/oleksmarkh/micro-conductor.svg?style=flat-square
[license-url]: https://github.com/oleksmarkh/micro-conductor/blob/master/LICENSE
[test-coverage-image]: https://img.shields.io/coveralls/github/oleksmarkh/micro-conductor.svg?style=flat-square
[test-coverage-url]: https://coveralls.io/github/oleksmarkh/micro-conductor
[code-size-image]: https://img.shields.io/github/languages/code-size/oleksmarkh/micro-conductor.svg?style=flat-square
