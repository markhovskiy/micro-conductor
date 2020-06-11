# micro-conductor

  [![license][license-image]][license-url]
  [![deps][deps-image]][deps-url]
  ![code size][code-size-image]

A tiny routing library for the browser. Simple configuration, no dependencies.

## Status
*In progress*, *experimental*.

## How does it look like?
### Features
- [x] RegExp parametrization in plain strings - every `route` is wrapped into `new RegExp('^' + route + '$')` for matching.
- [ ] Parsing helpers:
  - [x] `parse` [tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates): empty placeholders translate into wildcard matching groups (`${null|undefined}` -> `(.*)`) and non-empty placeholders wrap into literal matching groups (e.g. `${foo}` -> `(foo)`).
  - [ ] `param()` function: simple wildcard parametrization (`{}` -> `(.*)`).
- [x] Optional handler for *not found* scenario. Please note that if multiple routers are started and some of them have `.notFound()` handlers, those would be still triggered if a given route isn't matched for those routers but is matched for the others.
- [x] Optional context preservation. If not redefined, context of the `Router` instance is used.

### Limitations
* Works only with hash-based routes, browser history API is not involved.
* No nesting for routes.
* No composition for routers. It's possible to have multiple instances, but each one will listen for the `hashchange` event individually.

These limitations could be transformed into feature requests if there's demand.

### Usage
```js
import Router, {parse} from './src/index';

const router = new Router({
  '': (route) => (
    console.log(route)
    // ""
  ),

  'plain': (route) => (
    console.log(route)
    // "plain"
  ),

  'params/([0-9]+)/and/([a-z]+)': (route, ...keys) => (
    console.log(route, keys)
    // "params/50/and/ten" ["50", "ten"]
  ),

  [parse`parse/${1}/and/${'two'}/and/${/[0-9]+/}/and/${/[a-z,A-Z]+/}/and/${null}`]: (route, ...keys) => (
    console.log(route, keys)
    // "parse/1/and/two/and/3/and/Four/and/whatever" ["1", "two", "3", "Four", "whatever"]
  ),
});

router.notFound = (route) => (
  console.warn(`"${route}" (not found)`)
  // "non-existing-route" (not found)
);

router.start();          // navigates immediately by current hash
// router.start(false);  // navigates on the next hash change
// router.stop();        // unsubscribes from "hashchange"
```

## How to run it?
It's not published to npm yet.
Just take the [`src/index.js`](src/index.js) file and copy it to your project.

## Development setup
```bash
$ npm install       # dev deps
$ npm test          # run unit tests
$ npm run coverage  # run unit tests and generate coverage report
$ npm run dev       # run a static server for manual testing (see "./example/" folder)
```

[license-image]: https://img.shields.io/github/license/oleksmarkh/micro-conductor.svg?style=flat-square
[license-url]: https://github.com/oleksmarkh/micro-conductor/blob/master/LICENSE
[deps-image]: https://img.shields.io/david/oleksmarkh/micro-conductor.svg?style=flat-square
[deps-url]: https://david-dm.org/oleksmarkh/micro-conductor
[code-size-image]: https://img.shields.io/github/languages/code-size/oleksmarkh/micro-conductor.svg?style=flat-square
