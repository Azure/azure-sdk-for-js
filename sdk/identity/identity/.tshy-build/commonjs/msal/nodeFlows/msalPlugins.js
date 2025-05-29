"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.msalPlugins = exports.msalNodeFlowNativeBrokerControl = exports.nativeBrokerInfo = exports.msalNodeFlowCacheControl = exports.persistenceProvider = void 0;
exports.hasNativeBroker = hasNativeBroker;
const constants_js_1 = require("../../constants.js");
/**
 * The current persistence provider, undefined by default.
 * @internal
 */
exports.persistenceProvider = undefined;
/**
 * An object that allows setting the persistence provider.
 * @internal
 */
exports.msalNodeFlowCacheControl = {
    setPersistence(pluginProvider) {
        exports.persistenceProvider = pluginProvider;
    },
};
/**
 * The current native broker provider, undefined by default.
 * @internal
 */
exports.nativeBrokerInfo = undefined;
function hasNativeBroker() {
    return exports.nativeBrokerInfo !== undefined;
}
/**
 * An object that allows setting the native broker provider.
 * @internal
 */
exports.msalNodeFlowNativeBrokerControl = {
    setNativeBroker(broker) {
        exports.nativeBrokerInfo = {
            broker,
        };
    },
};
/**
 * Configures plugins, validating that required plugins are available and enabled.
 *
 * Does not create the plugins themselves, but rather returns the configuration that will be used to create them.
 *
 * @param options - options for creating the MSAL client
 * @returns plugin configuration
 */
function generatePluginConfiguration(options) {
    var _a, _b, _c, _d, _e, _f, _g;
    const config = {
        cache: {},
        broker: {
            isEnabled: (_b = (_a = options.brokerOptions) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : false,
            enableMsaPassthrough: (_d = (_c = options.brokerOptions) === null || _c === void 0 ? void 0 : _c.legacyEnableMsaPassthrough) !== null && _d !== void 0 ? _d : false,
            parentWindowHandle: (_e = options.brokerOptions) === null || _e === void 0 ? void 0 : _e.parentWindowHandle,
        },
    };
    if ((_f = options.tokenCachePersistenceOptions) === null || _f === void 0 ? void 0 : _f.enabled) {
        if (exports.persistenceProvider === undefined) {
            throw new Error([
                "Persistent token caching was requested, but no persistence provider was configured.",
                "You must install the identity-cache-persistence plugin package (`npm install --save @azure/identity-cache-persistence`)",
                "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
                "`useIdentityPlugin(cachePersistencePlugin)` before using `tokenCachePersistenceOptions`.",
            ].join(" "));
        }
        const cacheBaseName = options.tokenCachePersistenceOptions.name || constants_js_1.DEFAULT_TOKEN_CACHE_NAME;
        config.cache.cachePlugin = (0, exports.persistenceProvider)(Object.assign({ name: `${cacheBaseName}.${constants_js_1.CACHE_NON_CAE_SUFFIX}` }, options.tokenCachePersistenceOptions));
        config.cache.cachePluginCae = (0, exports.persistenceProvider)(Object.assign({ name: `${cacheBaseName}.${constants_js_1.CACHE_CAE_SUFFIX}` }, options.tokenCachePersistenceOptions));
    }
    if ((_g = options.brokerOptions) === null || _g === void 0 ? void 0 : _g.enabled) {
        if (exports.nativeBrokerInfo === undefined) {
            throw new Error([
                "Broker for WAM was requested to be enabled, but no native broker was configured.",
                "You must install the identity-broker plugin package (`npm install --save @azure/identity-broker`)",
                "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
                "`useIdentityPlugin(createNativeBrokerPlugin())` before using `enableBroker`.",
            ].join(" "));
        }
        config.broker.nativeBrokerPlugin = exports.nativeBrokerInfo.broker;
    }
    return config;
}
/**
 * Wraps generatePluginConfiguration as a writeable property for test stubbing purposes.
 */
exports.msalPlugins = {
    generatePluginConfiguration,
};
//# sourceMappingURL=msalPlugins.js.map