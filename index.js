export default class Router {
  constructor(routes, context) {
    this.routes = routes || {};
    this.context = context;
    this.notFound = null;
  }

  // removes "#" from the beginning and "/"s from the end
  static normalize(hash) {
    return hash.replace(/^#|\/*$/g, '');
  }

  start() {
    window.addEventListener('hashchange', this.navigate.bind(this));
    this.navigate();
  }

  navigate() {
    const normalizedHash = this.constructor.normalize(window.location.hash);
    let found = false;

    Object.entries(this.routes).forEach(([route, go]) => {
      const matches = normalizedHash.match(new RegExp(`^${route}$`));

      if (matches) {
        go.apply(this.context, matches.slice(1));
        found = true;
      }
    });

    if (!found && typeof this.notFound === 'function') {
      this.notFound.apply(this.context);
    }
  }
}
