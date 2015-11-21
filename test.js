var expect = require('chai').expect;
var sinon = require('sinon');
var Router = require('./index');

describe('unit', function () {
    it('trims special chars from hashes', function () {
        var normalize = (new Router())._normalize;

        expect(normalize('')).to.equal('');
        expect(normalize('#')).to.equal('');
        expect(normalize('#plain')).to.equal('plain');
        expect(normalize('#plain/')).to.equal('plain');
        expect(normalize('#plain///')).to.equal('plain');
        expect(normalize('#param/10')).to.equal('param/10');
        expect(normalize('#param/10/')).to.equal('param/10');
    });
});

describe('functional', function () {
    before(function () {
        // mocking "Router" dependencies
        global.window = {addEventListener: function () {},
                         location: {}};
    });

    it('handles default (empty) route', function () {
        var defaultHandler = sinon.spy();
        var router = new Router({'': defaultHandler});

        window.location.hash = '#';
        router.start();
        expect(defaultHandler.calledOnce).to.equal(true);
    });

    it('handles plain route (without params)', function () {
        var plainHandler = sinon.spy();
        var router = new Router({'plain': plainHandler});

        window.location.hash = '#plain';
        router.start();
        expect(plainHandler.calledOnce).to.equal(true);
    });

    it('handles parametrized routes', function () {
        var oneParamHandler = sinon.spy();
        var twoParamsHandler = sinon.spy();
        var router = new Router({'param/([0-9]+)': oneParamHandler,
                                 'params/([0-9]+)/and/([a-z]+)': twoParamsHandler});

        window.location.hash = '#param/10';
        router.start();
        expect(oneParamHandler.withArgs('10').calledOnce).to.equal(true);

        window.location.hash = '#params/1/and/two';
        router.start();
        expect(twoParamsHandler.withArgs('1', 'two').calledOnce).to.equal(true);
    });

    it('supports special "notFound" handler', function () {
        var router = new Router();

        router.notFound = sinon.spy();
        window.location.hash = '#something_not_defined';
        router.start();
        expect(router.notFound.calledOnce).to.equal(true);
    });

    it('keeps a context if passed', function () {
        var Foo = function () {
            this.router = new Router({'bar': this.bar},
                                     this);
        };

        Foo.prototype.bar = sinon.spy();

        var foo = new Foo();
        window.location.hash = '#bar';
        foo.router.start();
        expect(foo.bar.calledOn(foo)).to.equal(true);
    });
});
