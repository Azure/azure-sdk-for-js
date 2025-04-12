// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as msalNode from "@azure/msal-node";

import {
  CACHE_CAE_SUFFIX,
  CACHE_NON_CAE_SUFFIX,
  DEFAULT_TOKEN_CACHE_NAME,
} from "../../constants.js";

import type { MsalClientOptions } from "./msalClient.js";
import type { NativeBrokerPluginControl } from "../../plugins/provider.js";
import type { TokenCachePersistenceOptions } from "./tokenCachePersistenceOptions.js";
import { nativeBrokerPlugin } from "../../broker/brokerPlugin.js";

/**
 * Configuration for the plugins used by the MSAL node client.
 */
export interface PluginConfiguration {
  /**
   * Configuration for the cache plugin.
   */
  cache: {
    /**
     * The non-CAE cache plugin handler.
     */
    cachePlugin?: Promise<msalNode.ICachePlugin>;
    /**
     * The CAE cache plugin handler - persisted to a different file.
     */
    cachePluginCae?: Promise<msalNode.ICachePlugin>;
  };
  /**
   * Configuration for the broker plugin.
   */
  broker: {
    /**
     * True if the broker plugin is enabled and available. False otherwise.
     *
     * It is a bug if this is true and the broker plugin is not available.
     */
    isEnabled: boolean;
    /**
     * If true, MSA account will be passed through, required for WAM authentication.
     */
    enableMsaPassthrough: boolean;
    /**
     * The parent window handle for the broker.
     */
    parentWindowHandle?: Uint8Array;
    /**
     * The native broker plugin handler.
     */
    nativeBrokerPlugin?: msalNode.INativeBrokerPlugin;
    /**
     * If set to true, the credential will attempt to use the default broker account for authentication before falling back to interactive authentication. Default is set to false.
     */
    useDefaultBrokerAccount?: boolean;
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
export function generatePluginConfiguration(options: MsalClientOptions): PluginConfiguration {
  const pluginConfiguration: PluginConfiguration = {
    cache: {
      cachePlugin: options.tokenCachePersistenceOptions?.cachePlugin,
      cachePluginCae: options.tokenCachePersistenceOptions?.cachePluginCae,
    },
    broker: {
      isEnabled: options.brokerOptions?.enabled ?? false,
      enableMsaPassthrough: options.brokerOptions?.legacyEnableMsaPassthrough ?? false,
      parentWindowHandle: options.brokerOptions?.parentWindowHandle,
      useDefaultBrokerAccount: options.brokerOptions?.useDefaultBrokerAccount ?? false,
      nativeBrokerPlugin, // Include the nativeBrokerPlugin here
    },
  };

  return pluginConfiguration;
}

/**
 * Wraps generatePluginConfiguration as a writeable property for test stubbing purposes.
 */
export const msalPlugins = {
  generatePluginConfiguration,
};
