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
    'params/([0-9]+)/and/([0-9]+)': function (first, second) {
        console.log('params/' + first + '/and/' + second);
    }
});

router.notFound = function () {
    console.log('not found');
};

router.start();
```
