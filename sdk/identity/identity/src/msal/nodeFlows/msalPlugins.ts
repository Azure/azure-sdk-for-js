// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalNode from "@azure/msal-node";

import { CACHE_CAE_SUFFIX, CACHE_NON_CAE_SUFFIX, DEFAULT_TOKEN_CACHE_NAME } from "../../constants";

import { MsalClientOptions } from "./msalClient";
import { NativeBrokerPluginControl } from "../../plugins/provider";
import { TokenCachePersistenceOptions } from "./tokenCachePersistenceOptions";

/**
 * Configuration for the plugins used by the MSAL node client.
 */
export interface PluginConfiguration {
  /**
   * Configuration for the cache plugin.
   */
  cache: {
    cachePlugin?: Promise<msalNode.ICachePlugin>;
    cachePluginCae?: Promise<msalNode.ICachePlugin>;
  };
  /**
   * Configuration for the broker plugin.
   */
  broker: {
    enableMsaPassthrough: boolean;
    parentWindowHandle?: Uint8Array;
    nativeBrokerPlugin?: msalNode.INativeBrokerPlugin;
  };
}

/**
 * The current persistence provider, undefined by default.
 * @internal
 */
export let persistenceProvider:
  | ((options?: TokenCachePersistenceOptions) => Promise<msalNode.ICachePlugin>)
  | undefined = undefined;

/**
 * An object that allows setting the persistence provider.
 * @internal
 */
export const msalNodeFlowCacheControl = {
  setPersistence(pluginProvider: Exclude<typeof persistenceProvider, undefined>): void {
    persistenceProvider = pluginProvider;
  },
};

/**
 * The current native broker provider, undefined by default.
 * @internal
 */
export let nativeBrokerInfo:
  | {
      broker: msalNode.INativeBrokerPlugin;
    }
  | undefined = undefined;

export function hasNativeBroker(): boolean {
  return nativeBrokerInfo !== undefined;
}

/**
 * An object that allows setting the native broker provider.
 * @internal
 */
export const msalNodeFlowNativeBrokerControl: NativeBrokerPluginControl = {
  setNativeBroker(broker): void {
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
function generatePluginConfiguration(options: MsalClientOptions): PluginConfiguration {
  const config: PluginConfiguration = {
    cache: {},
    broker: {
      enableMsaPassthrough: options.brokerOptions?.legacyEnableMsaPassthrough ?? false,
      parentWindowHandle: options.brokerOptions?.parentWindowHandle,
    },
  };

  if (options.tokenCachePersistenceOptions?.enabled) {
    if (persistenceProvider === undefined) {
      throw new Error(
        [
          "Persistent token caching was requested, but no persistence provider was configured.",
          "You must install the identity-cache-persistence plugin package (`npm install --save @azure/identity-cache-persistence`)",
          "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
          "`useIdentityPlugin(cachePersistencePlugin)` before using `tokenCachePersistenceOptions`.",
        ].join(" "),
      );
    }

    const cacheBaseName = options.tokenCachePersistenceOptions.name || DEFAULT_TOKEN_CACHE_NAME;
    config.cache.cachePlugin = persistenceProvider({
      name: `${cacheBaseName}.${CACHE_NON_CAE_SUFFIX}`,
      ...options.tokenCachePersistenceOptions,
    });
    config.cache.cachePluginCae = persistenceProvider({
      name: `${cacheBaseName}.${CACHE_CAE_SUFFIX}`,
      ...options.tokenCachePersistenceOptions,
    });
  }

  if (options.brokerOptions?.enabled) {
    if (nativeBrokerInfo === undefined) {
      throw new Error(
        [
          "Broker for WAM was requested to be enabled, but no native broker was configured.",
          "You must install the identity-broker plugin package (`npm install --save @azure/identity-broker`)",
          "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
          "`useIdentityPlugin(createNativeBrokerPlugin())` before using `enableBroker`.",
        ].join(" "),
      );
    }

    config.broker.nativeBrokerPlugin = nativeBrokerInfo!.broker;
  }

  return config;
}

/**
 * Wraps generatePluginConfiguration as a writeable property for test stubbing purposes.
 */
export const msalPlugins = {
  generatePluginConfiguration,
};
