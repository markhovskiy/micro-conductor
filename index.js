var Router = function (routes, context) {
    this.routes = routes;
    this.context = context;
    this.notFound = null;
};

Router.prototype.start = function () {
    window.addEventListener('hashchange', this._go.bind(this));
    this._go();
    return this;
};

Router.prototype._go = function () {
    var normalized = location.hash.replace(/^#|\/$/g, ''),
        matches = null;

    for (var pattern in this.routes) {
        matches = normalized.match(new RegExp('^' + pattern + '$'));
        if (matches) {
            this.routes[pattern].apply(this.context, matches.slice(1));
            return;
        }
    }

    if (typeof this.notFound === 'function') {
        this.notFound.apply(this.context);
    }
};

// Node export, to run mocha tests
if (typeof module !== 'undefined' &&
    typeof module.exports !== 'undefined') {
    module.exports = Router;
}
