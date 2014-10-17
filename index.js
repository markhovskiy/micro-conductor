var Router = function (routes) {
    this.routes = routes;
    this.on_hash_change();
    window.addEventListener('hashchange', this.on_hash_change.bind(this));
};

Router.prototype.on_hash_change = function () {
    var matches = null;
    for (var pattern in this.routes) {
        matches = location.hash.slice(1).match(new RegExp(pattern));
        if (matches) {
            this.routes[pattern].apply(null, matches.slice(1));
        }
    }
};
