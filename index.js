(function () {
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

    if (typeof module !== 'undefined' &&
        typeof module.exports !== 'undefined') {
        // node (to run mocha tests)
        module.exports = Router;
    } else if (typeof define === 'function' && define.amd) {
        // requirejs
        define([], function () { return Router; });
    } else {
        // browser
        window.Router = Router;
    }
})();
