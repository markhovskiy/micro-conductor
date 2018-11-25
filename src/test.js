import {expect} from 'chai';
import {spy} from 'sinon';

import Router from './index';

describe('Router', () => {
  before(() => {
    // mocking "Router" dependencies
    global.window = {
      addEventListener: () => {},
      removeEventListener: () => {},
      location: {},
    };
  });

  describe('unit', () => {
    describe('Router.normalize()', () => {
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

    describe('Router.prototype.start()', () => {
      describe('respects the "toNavigate" argument', () => {
        it('.start()', () => {
          const router = new Router();

          router.navigate = spy();
          router.start();
          expect(router.navigate.calledOnce).to.equal(true);
        });

        it('.start(true)', () => {
          const router = new Router();

          router.navigate = spy();
          router.start(true);
          expect(router.navigate.calledOnce).to.equal(true);
        });

        it('.start(false)', () => {
          const router = new Router();

          router.navigate = spy();
          router.start(false);
          expect(router.navigate.notCalled).to.equal(true);
        });
      });
    });
  });

  describe('functional', () => {
    it('handles a root (empty) route', () => {
      const rootHandler = spy();
      const router = new Router({
        '': rootHandler,
      });

      window.location.hash = '#';
      router.navigate();
      expect(rootHandler.calledOnce).to.equal(true);
    });

    it('handles a plain route (without params)', () => {
      const plainHandler = spy();
      const router = new Router({
        'plain': plainHandler,
      });

      window.location.hash = '#plain';
      router.navigate();
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
      router.navigate();
      expect(oneParamHandler.withArgs('param/10', '10').calledOnce).to.equal(true);

      window.location.hash = '#params/1/and/two';
      router.navigate();
      expect(twoParamsHandler.withArgs('params/1/and/two', '1', 'two').calledOnce).to.equal(true);
    });

    it.skip('handles parsed routes', () => {
      // @todo: write a set of test cases against different keys in parsed routes
    });

    it('supports special "notFound" handler', () => {
      const router = new Router();

      router.notFound = spy();
      window.location.hash = '#something_not_defined';
      router.navigate();
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
      foo.router.navigate();
      expect(foo.bar.calledOn(foo)).to.equal(true);
    });
  });
});
