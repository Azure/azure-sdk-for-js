// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ICachePlugin, INativeBrokerPlugin } from "@azure/msal-node";
import type { TokenCachePersistenceOptions } from "../msal/nodeFlows/tokenCachePersistenceOptions.js";
/**
 * The type of an Azure Identity plugin, a function accepting a plugin
 * context.
 */
export type IdentityPlugin = (context: unknown) => void;

/**
 * Plugin context entries for controlling cache plugins.
 */
export interface CachePluginControl {
  setPersistence(
    persistenceFactory: (
      options?: TokenCachePersistenceOptions,
      // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    ) => Promise<ICachePlugin>,
  ): void;
}

export interface NativeBrokerPluginControl {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  setNativeBroker(nativeBroker: INativeBrokerPlugin): void;
}


/**
 * Context options passed to a plugin during initialization.
 *
 * Plugin authors are responsible for casting their plugin context values
 * to this type.
 *
 * @internal
 */
export interface AzurePluginContext {
  cachePluginControl: CachePluginControl;
  nativeBrokerPluginControl: NativeBrokerPluginControl;
}
