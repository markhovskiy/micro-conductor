# micro-conductor

  [![travis][travis-image]][travis-url]
  [![deps][deps-image]][deps-url]
  [![license][license-image]][license-url]
  [![test coverage][test-coverage-image]][test-coverage-url]
  ![code size][code-size-image]

A tiny routing library for the browser. Simple configuration, No dependencies.

## Features

- [x] RegExp parametrization in plain strings - every `route` is wrapped into `new RegExp('^' + route + '$')` for matching.
- [ ] Parsing helpers:
  - [x] `parse` [tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates): empty placeholders translate into wildcard matching groups (`${null|undefined}` -> `(.*)`) and non-empty placeholders wrap into literal matching groups (e.g. `${foo}` -> `(foo)`).
  - [ ] `param()` function: simple wildcard parametrization (`{}` -> `(.*)`).
- [x] Optional handler for *not found* scenario. Please note that if multiple routers are started and some of them have `.notFound()` handlers, those would be still triggered if a given route isn't matched for those routers but is matched for the others.
- [x] Optional context preservation. If not redefined, context of the `Router` instance is used.

## Limitations

* Works only with hash-based routes, browser history API is not involved.
* No nesting for routes.
* No composition for routers. It's possible to have multiple instances, but each one will listen for the `hashchange` event individually.

These limitations could be transformed into feature requests if there's demand.
I.e. there's no technical reason not to support composable routers or nested routes, it's not there yet simply because of YAGNI.

## Installation

TBD.

## Usage

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
    const r1 = new Router(
      {
        // "#original-context-fat-arrow-function"
        'original-context-fat-arrow-function': (route) => {
          console.log(`route: "${route}"`);
          console.log(`current context: ${this.constructor.name}`);      // RouterWrapper
          console.log(`router context: ${r1.context.constructor.name}`); // Router
        },

        // "#original-context-regular-function"
        'original-context-regular-function': function(route) {
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
        'redefined-context-regular-function': function(route) {
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
```

## Setup

```bash
$ yarn install   # dev deps
$ yarn test      # run unit tests
$ yarn coverage  # run unit tests and generate coverage report
$ yarn run:dev   # run a static server for manual testing (see "./example/" folder)
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
