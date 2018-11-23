# micro-conductor

  [![travis][travis-image]][travis-url]
  [![deps][deps-image]][deps-url]
  [![license][license-image]][license-url]
  [![test coverage][test-coverage-image]][test-coverage-url]
  ![code size][code-size-image]

a routing library for the browser

## usage

```js
var router = new Router({
    // "#" <- root
    '': function () {
        console.log('default');
    },
    // "#plain"
    'plain': function () {
        console.log('plain');
    },
    // "#params/1/and/two"
    'params/([0-9]+)/and/([a-z]+)': function (first, second) {
        console.log('params/' + first + '/and/' + second);
    }
});

// optional
router.notFound = function () {
    console.log('not found');
};

router.start();
```

The `Router()` constructor accepts `context` as an optional second argument:

```js
var Foo = function () {
    new Router({
        'bar': this.bar
    }, this).start();
};

Foo.prototype.bar = function () {
    console.log(this instanceof Foo);
};

var foo = new Foo;
```

## running tests

```bash
$ npm test
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
