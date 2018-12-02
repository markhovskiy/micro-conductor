function getPatternPart(key) {
  if (key instanceof RegExp) {
    return key.source;
  }

  if (key === null || key === undefined) {
    return '.*';
  }

  return key;
}

// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates
export function parse(strings, ...keys) {
  return keys.reduce(
    (patternParts, key, index) => patternParts.concat(
      `(${getPatternPart(key)})`,
      strings[index + 1],
    ),
    [strings[0]],
  ).join('');
}

export default class Router {
  constructor(routes, context) {
    this.routes = routes || {};
    this.context = context || this;
    this.notFound = null;
    this.navigate = this.navigate.bind(this);
  }

  // removes "#" from the beginning and "/"s from the end
  static normalize(hash) {
    return hash.replace(/^#|\/*$/g, '');
  }

  start(toNavigate = true) {
    window.addEventListener('hashchange', this.navigate);

    if (toNavigate) {
      this.navigate();
    }
  }

  stop() {
    window.removeEventListener('hashchange', this.navigate);
  }

  navigate() {
    const normalizedHash = this.constructor.normalize(window.location.hash);
    let found = false;

    Object.entries(this.routes).forEach(([route, go]) => {
      const matches = normalizedHash.match(new RegExp(`^${route}$`));

      if (matches) {
        go.apply(this.context, matches);
        found = true;
      }
    });

    if (!found && typeof this.notFound === 'function') {
      this.notFound.call(this.context, normalizedHash);
    }
  }
}
