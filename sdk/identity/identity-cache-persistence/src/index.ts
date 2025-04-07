// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IdentityPlugin, TokenCachePersistenceOptions } from "@azure/identity";
import { createPersistenceCachePlugin } from "./provider.js";

/**
 * Plugin context entries for controlling cache plugins.
 */
interface CachePluginControl {
  setPersistence(
    persistenceFactory: (
      options?: TokenCachePersistenceOptions,
      // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    ) => Promise<import("@azure/msal-node").ICachePlugin>,
  ): void;
}
/**
 * Context options passed to a plugin during initialization.
 *
 * Represents a subset of the context defined in `@azure/identity`
 *
 */
interface AzurePluginContext {
  cachePluginControl: CachePluginControl;
}

/**
 * A plugin that provides persistent token caching for `@azure/identity`
 * credentials. The plugin API is compatible with `@azure/identity` versions
 * 2.0.0 and later. Load this plugin using the `useIdentityPlugin`
 * function, imported from `@azure/identity`.
 *
 * In order to enable this functionality, you must also pass
 * `tokenCachePersistenceOptions` to your credential constructors with an
 * `enabled` property set to true.
 *
 * Example:
 *
 * ```ts snippet:ReadmeSampleDeviceCodeCredential
 * import { DeviceCodeCredential } from "@azure/identity";
 *
 * const credential = new DeviceCodeCredential({
 *   tokenCachePersistenceOptions: {
 *     enabled: true,
 *   },
 * });
 *
 * // We'll use the Microsoft Graph scope as an example
 * const scope = "https://graph.microsoft.com/.default";
 *
 * // Print out part of the access token
 * console.log((await credential.getToken(scope)).token.substring(0, 10), "...");
 * ```
 */

export const cachePersistencePlugin: IdentityPlugin = (context) => {
  const { cachePluginControl } = context as AzurePluginContext;

  cachePluginControl.setPersistence(createPersistenceCachePlugin);
};
