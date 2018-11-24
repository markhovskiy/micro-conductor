import {expect} from 'chai';
import {spy} from 'sinon';

import Router from './index';

describe('unit', () => {
  it('trims "#" and "/" from routes', () => {
    expect(Router.normalize('')).to.equal('');
    expect(Router.normalize('#')).to.equal('');
    expect(Router.normalize('#plain')).to.equal('plain');
    expect(Router.normalize('#plain/')).to.equal('plain');
    expect(Router.normalize('#plain///')).to.equal('plain');
    expect(Router.normalize('#param/10')).to.equal('param/10');
    expect(Router.normalize('#param/10/')).to.equal('param/10');
  });
});

describe('functional', () => {
  before(() => {
    // mocking "Router" dependencies
    global.window = {
      addEventListener: () => {},
      location: {},
    };
  });

  it('handles default (empty) route', () => {
    const defaultHandler = spy();
    const router = new Router({
      '': defaultHandler,
    });

    window.location.hash = '#';
    router.start();
    expect(defaultHandler.calledOnce).to.equal(true);
  });

  it('handles plain route (without params)', () => {
    const plainHandler = spy();
    const router = new Router({
      'plain': plainHandler,
    });

    window.location.hash = '#plain';
    router.start();
    expect(plainHandler.calledOnce).to.equal(true);
  });

  it('handles parametrized routes', () => {
    const oneParamHandler = spy();
    const twoParamsHandler = spy();
    const router = new Router({
      'param/([0-9]+)': oneParamHandler,
      'params/([0-9]+)/and/([a-z]+)': twoParamsHandler,
    });

    window.location.hash = '#param/10';
    router.start();
    expect(oneParamHandler.withArgs('10').calledOnce).to.equal(true);

    window.location.hash = '#params/1/and/two';
    router.start();
    expect(twoParamsHandler.withArgs('1', 'two').calledOnce).to.equal(true);
  });

  it('supports special "notFound" handler', () => {
    const router = new Router();

    router.notFound = spy();
    window.location.hash = '#something_not_defined';
    router.start();
    expect(router.notFound.calledOnce).to.equal(true);
  });

  it('keeps a context if passed', () => {
    class Foo {
      constructor() {
        this.router = new Router(
          {
            'bar': this.bar,
          },
          this,
        );
      }
    }

    Foo.prototype.bar = spy();

    const foo = new Foo();
    window.location.hash = '#bar';
    foo.router.start();
    expect(foo.bar.calledOn(foo)).to.equal(true);
  });
});
