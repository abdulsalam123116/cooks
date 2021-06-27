(function(root, factory) {
    var routing = factory();
    if (typeof define === 'function' && define.amd) {
        define([], routing.Routing);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = routing.Routing;
    } else {
        root.Routing = routing.Routing;
        root.fos = {
            Router: routing.Router
        };
    }
}(this, function() {
    'use strict';
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    var Router = function() {
        function Router(context, routes) {
            _classCallCheck(this, Router);
            this.context_ = context || {
                base_url: '',
                prefix: '',
                host: '',
                port: '',
                scheme: '',
                locale: ''
            };
            this.setRoutes(routes || {});
        }
        _createClass(Router, [{
            key: 'setRoutingData',
            value: function setRoutingData(data) {
                this.setBaseUrl(data['base_url']);
                this.setRoutes(data['routes']);
                if ('prefix' in data) {
                    this.setPrefix(data['prefix']);
                }
                if ('port' in data) {
                    this.setPort(data['port']);
                }
                if ('locale' in data) {
                    this.setLocale(data['locale']);
                }
                this.setHost(data['host']);
                this.setScheme(data['scheme']);
            }
        }, {
            key: 'setRoutes',
            value: function setRoutes(routes) {
                this.routes_ = Object.freeze(routes);
            }
        }, {
            key: 'getRoutes',
            value: function getRoutes() {
                return this.routes_;
            }
        }, {
            key: 'setBaseUrl',
            value: function setBaseUrl(baseUrl) {
                this.context_.base_url = baseUrl;
            }
        }, {
            key: 'getBaseUrl',
            value: function getBaseUrl() {
                return this.context_.base_url;
            }
        }, {
            key: 'setPrefix',
            value: function setPrefix(prefix) {
                this.context_.prefix = prefix;
            }
        }, {
            key: 'setScheme',
            value: function setScheme(scheme) {
                this.context_.scheme = scheme;
            }
        }, {
            key: 'getScheme',
            value: function getScheme() {
                return this.context_.scheme;
            }
        }, {
            key: 'setHost',
            value: function setHost(host) {
                this.context_.host = host;
            }
        }, {
            key: 'getHost',
            value: function getHost() {
                return this.context_.host;
            }
        }, {
            key: 'setPort',
            value: function setPort(port) {
                this.context_.port = port;
            }
        }, {
            key: 'getPort',
            value: function getPort() {
                return this.context_.port;
            }
        }, {
            key: 'setLocale',
            value: function setLocale(locale) {
                this.context_.locale = locale;
            }
        }, {
            key: 'getLocale',
            value: function getLocale() {
                return this.context_.locale;
            }
        }, {
            key: 'buildQueryParams',
            value: function buildQueryParams(prefix, params, add) {
                var _this = this;
                var name = void 0;
                var rbracket = new RegExp(/\[\]$/);
                if (params instanceof Array) {
                    params.forEach(function(val, i) {
                        if (rbracket.test(prefix)) {
                            add(prefix, val);
                        } else {
                            _this.buildQueryParams(prefix + '[' + ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? i : '') + ']', val, add);
                        }
                    });
                } else if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                    for (name in params) {
                        this.buildQueryParams(prefix + '[' + name + ']', params[name], add);
                    }
                } else {
                    add(prefix, params);
                }
            }
        }, {
            key: 'getRoute',
            value: function getRoute(name) {
                var prefixedName = this.context_.prefix + name;
                var sf41i18nName = name + '.' + this.context_.locale;
                var prefixedSf41i18nName = this.context_.prefix + name + '.' + this.context_.locale;
                var variants = [prefixedName, sf41i18nName, prefixedSf41i18nName, name];
                for (var i in variants) {
                    if (variants[i] in this.routes_) {
                        return this.routes_[variants[i]];
                    }
                }
                throw new Error('The route "' + name + '" does not exist.');
            }
        }, {
            key: 'generate',
            value: function generate(name, opt_params) {
                var absolute = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
                var route = this.getRoute(name),
                    params = opt_params || {},
                    unusedParams = _extends({}, params),
                    url = '',
                    optional = true,
                    host = '',
                    port = typeof this.getPort() == "undefined" || this.getPort() === null ? '' : this.getPort();
                route.tokens.forEach(function(token) {
                    if ('text' === token[0]) {
                        url = token[1] + url;
                        optional = false;
                        return;
                    }
                    if ('variable' === token[0]) {
                        var hasDefault = route.defaults && token[3] in route.defaults;
                        if (false === optional || !hasDefault || token[3] in params && params[token[3]] != route.defaults[token[3]]) {
                            var value = void 0;
                            if (token[3] in params) {
                                value = params[token[3]];
                                delete unusedParams[token[3]];
                            } else if (hasDefault) {
                                value = route.defaults[token[3]];
                            } else if (optional) {
                                return;
                            } else {
                                throw new Error('The route "' + name + '" requires the parameter "' + token[3] + '".');
                            }
                            var empty = true === value || false === value || '' === value;
                            if (!empty || !optional) {
                                var encodedValue = encodeURIComponent(value).replace(/%2F/g, '/');
                                if ('null' === encodedValue && null === value) {
                                    encodedValue = '';
                                }
                                url = token[1] + encodedValue + url;
                            }
                            optional = false;
                        } else if (hasDefault && token[3] in unusedParams) {
                            delete unusedParams[token[3]];
                        }
                        return;
                    }
                    throw new Error('The token type "' + token[0] + '" is not supported.');
                });
                if (url === '') {
                    url = '/';
                }
                route.hosttokens.forEach(function(token) {
                    var value = void 0;
                    if ('text' === token[0]) {
                        host = token[1] + host;
                        return;
                    }
                    if ('variable' === token[0]) {
                        if (token[3] in params) {
                            value = params[token[3]];
                            delete unusedParams[token[3]];
                        } else if (route.defaults && token[3] in route.defaults) {
                            value = route.defaults[token[3]];
                        }
                        host = token[1] + value + host;
                    }
                });
                url = this.context_.base_url + url;
                if (route.requirements && "_scheme" in route.requirements && this.getScheme() != route.requirements["_scheme"]) {
                    url = route.requirements["_scheme"] + "://" + (host || this.getHost()) + ('' === port ? '' : ':' + port) + url;
                } else if ("undefined" !== typeof route.schemes && "undefined" !== typeof route.schemes[0] && this.getScheme() !== route.schemes[0]) {
                    url = route.schemes[0] + "://" + (host || this.getHost()) + ('' === port ? '' : ':' + port) + url;
                } else if (host && this.getHost() !== host + ('' === port ? '' : ':' + port)) {
                    url = this.getScheme() + "://" + host + ('' === port ? '' : ':' + port) + url;
                } else if (absolute === true) {
                    url = this.getScheme() + "://" + this.getHost() + ('' === port ? '' : ':' + port) + url;
                }
                if (Object.keys(unusedParams).length > 0) {
                    var prefix = void 0;
                    var queryParams = [];
                    var add = function add(key, value) {
                        value = typeof value === 'function' ? value() : value;
                        value = value === null ? '' : value;
                        queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                    };
                    for (prefix in unusedParams) {
                        this.buildQueryParams(prefix, unusedParams[prefix], add);
                    }
                    url = url + '?' + queryParams.join('&').replace(/%20/g, '+');
                }
                return url;
            }
        }], [{
            key: 'getInstance',
            value: function getInstance() {
                return Routing;
            }
        }, {
            key: 'setData',
            value: function setData(data) {
                var router = Router.getInstance();
                router.setRoutingData(data);
            }
        }]);
        return Router;
    }();
    Router.Route;
    Router.Context;
    var Routing = new Router();
    return {
        Router: Router,
        Routing: Routing
    };
}));