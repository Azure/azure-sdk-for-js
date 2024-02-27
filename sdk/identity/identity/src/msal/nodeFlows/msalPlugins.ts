// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalNode from "@azure/msal-node";

import { nativeBrokerInfo, persistenceProvider } from "./msalNodeCommon";

import { MsalClientOptions } from "./msalClient";

// TODO: invert this relationship, instead of importing from msalNodeCommon and calling into it, we should _export_ the right things from here and import them in msalNodeCommon
// Then, there's a single source for plugins across both msalClient and msalNodeCommon

/**
 * Configuration for the plugins used by the MSAL node client.
 */
export interface PluginConfiguration {
  /**
   * Configuration for the cache plugin.
   */
  cache: {
    cachePlugin?: Promise<msalNode.ICachePlugin>;
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
 * Configures plugins, validating that required plugins are available and enabled.
 *
 * Does not create the plugins themselves, but rather returns the configuration that will be used to create them.
 *
 * @param options - options for creating the MSAL client
 * @returns plugin configuration
 */
export function generatePluginConfiguration(options: MsalClientOptions): PluginConfiguration {
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

    config.cache.cachePlugin = persistenceProvider(options.tokenCachePersistenceOptions);
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
