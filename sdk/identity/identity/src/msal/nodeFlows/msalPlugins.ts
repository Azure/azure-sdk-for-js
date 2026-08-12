// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as msalNode from "@azure/msal-node";

import {
  CACHE_CAE_SUFFIX,
  CACHE_NON_CAE_SUFFIX,
  DEFAULT_TOKEN_CACHE_NAME,
} from "../../constants.js";

import type { MsalClientOptions } from "./msalClient.js";
import type {
  NativeBrokerPluginControl,
  VisualStudioCodeCredentialControl,
} from "../../plugins/provider.js";
import type { TokenCachePersistenceOptions } from "./tokenCachePersistenceOptions.js";

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

/**
 * The current VSCode auth record path, undefined by default.
 * @internal
 */
export let vsCodeAuthRecordPath: string | undefined = undefined;

/**
 * The current VSCode broker, undefined by default.
 * @internal
 */
export let vsCodeBrokerInfo:
  | {
      broker: msalNode.INativeBrokerPlugin;
    }
  | undefined = undefined;

export function hasNativeBroker(): boolean {
  return nativeBrokerInfo !== undefined;
}

export function hasVSCodePlugin(): boolean {
  return vsCodeAuthRecordPath !== undefined && vsCodeBrokerInfo !== undefined;
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
 * An object that allows setting the VSCode credential auth record path and broker.
 * @internal
 */
export const msalNodeFlowVSCodeCredentialControl: VisualStudioCodeCredentialControl = {
  setVSCodeAuthRecordPath(path: string): void {
    vsCodeAuthRecordPath = path;
  },
  setVSCodeBroker(broker: msalNode.INativeBrokerPlugin): void {
    vsCodeBrokerInfo = {
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
      ...options.brokerOptions,
      isEnabled: options.brokerOptions?.enabled ?? false,
      enableMsaPassthrough: options.brokerOptions?.legacyEnableMsaPassthrough ?? false,
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
    config.broker.nativeBrokerPlugin = getBrokerPlugin(options.isVSCodeCredential || false);
  }
  return config;
}

// Broker error message templates with variables for credential and package names
const brokerErrorTemplates = {
  missing: (credentialName: string, packageName: string, pluginVar: string) =>
    [
      `${credentialName} was requested, but no plugin was configured or no authentication record was found.`,
      `You must install the ${packageName} plugin package (npm install --save ${packageName})`,
      "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
      `useIdentityPlugin(${pluginVar}) before using enableBroker.`,
    ].join(" "),
  unavailable: (credentialName: string, packageName: string) =>
    [
      `${credentialName} was requested, and the plugin is configured, but the broker is unavailable.`,
      `Ensure the ${credentialName} plugin is properly installed and configured.`,
      "Check for missing native dependencies and ensure the package is properly installed.",
      `See the README for prerequisites on installing and using ${packageName}.`,
    ].join(" "),
};

// Values for VSCode and native broker configurations for error message
const brokerConfig = {
  vsCode: {
    credentialName: "Visual Studio Code Credential",
    packageName: "@azure/identity-vscode",
    pluginVar: "vsCodePlugin",
    get brokerInfo() {
      return vsCodeBrokerInfo;
    },
  },
  native: {
    credentialName: "Broker for WAM",
    packageName: "@azure/identity-broker",
    pluginVar: "nativeBrokerPlugin",
    get brokerInfo() {
      return nativeBrokerInfo;
    },
  },
} as const;

/**
 * Set appropriate broker plugin based on whether VSCode or native broker is requested.
 * @param isVSCodePlugin - true for VSCode broker, false for native broker
 * @returns the broker plugin if available
 */
function getBrokerPlugin(isVSCodePlugin: boolean): msalNode.INativeBrokerPlugin {
  const { credentialName, packageName, pluginVar, brokerInfo } =
    brokerConfig[isVSCodePlugin ? "vsCode" : "native"];
  if (brokerInfo === undefined) {
    throw new Error(brokerErrorTemplates.missing(credentialName, packageName, pluginVar));
  }
  if (brokerInfo.broker.isBrokerAvailable === false) {
    throw new Error(brokerErrorTemplates.unavailable(credentialName, packageName));
  }
  return brokerInfo.broker;
}

/**
 * Wraps generatePluginConfiguration as a writeable property for test stubbing purposes.
 */
export const msalPlugins = {
  generatePluginConfiguration,
};
