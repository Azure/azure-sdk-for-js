// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CACHE_CAE_SUFFIX, CACHE_NON_CAE_SUFFIX, DEFAULT_TOKEN_CACHE_NAME, } from "../../constants.js";
/**
 * The current persistence provider, undefined by default.
 * @internal
 */
export let persistenceProvider = undefined;
/**
 * An object that allows setting the persistence provider.
 * @internal
 */
export const msalNodeFlowCacheControl = {
    setPersistence(pluginProvider) {
        persistenceProvider = pluginProvider;
    },
};
/**
 * The current native broker provider, undefined by default.
 * @internal
 */
export let nativeBrokerInfo = undefined;
export function hasNativeBroker() {
    return nativeBrokerInfo !== undefined;
}
/**
 * An object that allows setting the native broker provider.
 * @internal
 */
export const msalNodeFlowNativeBrokerControl = {
    setNativeBroker(broker) {
        nativeBrokerInfo = {
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
        if (persistenceProvider === undefined) {
            throw new Error([
                "Persistent token caching was requested, but no persistence provider was configured.",
                "You must install the identity-cache-persistence plugin package (`npm install --save @azure/identity-cache-persistence`)",
                "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
                "`useIdentityPlugin(cachePersistencePlugin)` before using `tokenCachePersistenceOptions`.",
            ].join(" "));
        }
        const cacheBaseName = options.tokenCachePersistenceOptions.name || DEFAULT_TOKEN_CACHE_NAME;
        config.cache.cachePlugin = persistenceProvider(Object.assign({ name: `${cacheBaseName}.${CACHE_NON_CAE_SUFFIX}` }, options.tokenCachePersistenceOptions));
        config.cache.cachePluginCae = persistenceProvider(Object.assign({ name: `${cacheBaseName}.${CACHE_CAE_SUFFIX}` }, options.tokenCachePersistenceOptions));
    }
    if ((_g = options.brokerOptions) === null || _g === void 0 ? void 0 : _g.enabled) {
        if (nativeBrokerInfo === undefined) {
            throw new Error([
                "Broker for WAM was requested to be enabled, but no native broker was configured.",
                "You must install the identity-broker plugin package (`npm install --save @azure/identity-broker`)",
                "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
                "`useIdentityPlugin(createNativeBrokerPlugin())` before using `enableBroker`.",
            ].join(" "));
        }
        config.broker.nativeBrokerPlugin = nativeBrokerInfo.broker;
    }
    return config;
}
/**
 * Wraps generatePluginConfiguration as a writeable property for test stubbing purposes.
 */
export const msalPlugins = {
    generatePluginConfiguration,
};
//# sourceMappingURL=msalPlugins.js.map