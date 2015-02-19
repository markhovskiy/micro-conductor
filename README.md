# micro-conductor

[![Build Status](https://api.travis-ci.org/markhovskiy/micro-conductor.svg)](https://travis-ci.org/markhovskiy/micro-conductor)
[![Dependency Status](https://david-dm.org/markhovskiy/micro-conductor.svg?style=flat)](https://david-dm.org/markhovskiy/micro-conductor)
[![Coverage Status](https://coveralls.io/repos/markhovskiy/micro-conductor/badge.svg)](https://coveralls.io/r/markhovskiy/micro-conductor)

a routing library for browser


## usage

```js
var router = new Router({
    // "#"
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
npm test
```
