import Router from './index.mjs';

const router = new Router({
  '': () => console.log('root'),
  'plain': () => console.log('plain'),
  'params/([0-9]+)/and/([a-z]+)': (first, second) => console.log(`params/${first}/and/${second}`),
});

router.notFound = () => console.log('not found');
router.start();
