var expect = require('chai').expect,
    sinon = require('sinon'),
    Router = require('./index');

// mocking "Router" dependencies
global.window = {
    addEventListener: function() {}
};
global.location = {};

describe('unit', function () {
    it('trims special chars from hashes', function () {
        var router = new Router();

        expect(router._normalize('')).to.equal('');
        expect(router._normalize('#')).to.equal('');
        expect(router._normalize('#plain')).to.equal('plain');
        expect(router._normalize('#plain/')).to.equal('plain');
        expect(router._normalize('#plain///')).to.equal('plain');
        expect(router._normalize('#param/10')).to.equal('param/10');
        expect(router._normalize('#param/10/')).to.equal('param/10');
    });
});

describe('functional', function () {
    it('handles default (empty) route', function () {
        var default_handler = sinon.spy(),
            router = new Router({'': default_handler});

        location.hash = '#';
        router.start();
        expect(default_handler.called).to.be.true;
    });

    it('handles plain route (without params)', function () {
        var plain_handler = sinon.spy(),
            router = new Router({'plain': plain_handler});

        location.hash = '#plain';
        router.start();
        expect(plain_handler.called).to.be.true;
    });

    it('handles parametrized routes', function () {
        var one_param_handler = sinon.spy(),
            two_params_handler = sinon.spy(),
            router = new Router({
                'param/([0-9]+)': one_param_handler,
                'params/([0-9]+)/and/([a-z]+)': two_params_handler
            });

        location.hash = '#param/10';
        router.start();
        expect(one_param_handler.calledWith('10')).to.be.true;

        location.hash = '#params/1/and/two';
        router.start();
        expect(two_params_handler.calledWith('1', 'two')).to.be.true;
    });

    it('supports special "notFound" handler', function () {
        var router = new Router();

        router.notFound = sinon.spy();
        location.hash = '#something_not_defined';
        router.start();
        expect(router.notFound.called).to.be.true;
    });

    it('keeps a context if passed', function () {
        var Foo = function () {
            this.router = new Router({
                'bar': this.bar
            }, this);
        };

        Foo.prototype.bar = sinon.spy();

        var foo = new Foo();
        location.hash = '#bar';
        foo.router.start();
        expect(foo.bar.calledOn(foo)).to.be.true;
    });
});
