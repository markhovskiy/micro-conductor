# micro-conductor

[![Code Climate](https://codeclimate.com/github/markhovskiy/micro-conductor/badges/gpa.svg)](https://codeclimate.com/github/markhovskiy/micro-conductor)

a routing library for browser

## usage

```js
var router = new Router({
    '': function () {
        console.log('default');
    },
    'plain': function () {
        console.log('plain');
    },
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
    console.log(this);
};

var foo = new Foo;
```

## running tests

```bash
npm test
```
