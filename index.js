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

    Router.prototype._normalize = function (hash) {
        return hash.replace(/^#|\/*$/g, '');
    };

    Router.prototype._go = function () {
        var normalizedHash = this._normalize(window.location.hash);
        var matches = null;

        for (var route in this.routes) {
            matches = normalizedHash.match(new RegExp('^' + route + '$'));
            if (matches) {
                this.routes[route].apply(this.context, matches.slice(1));
                return;
            }
        }

        if (typeof this.notFound === 'function') {
            this.notFound.apply(this.context);
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
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
