// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzurePluginContext } from "../../identity/src/plugins/provider";
import { IdentityPlugin } from "@azure/identity";
import { createPersistenceCachePlugin } from "./provider";

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
 * ```javascript
 * import { useIdentityPlugin, DeviceCodeCredential } from "@azure/identity";
 * import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
 *
 * // Load the plugin
 * useIdentityPlugin(cachePersistencePlugin);
 *
 * const credential = new DeviceCodeCredential({
 *   tokenCachePersistenceOptions: {
 *     enabled: true
 *   }
 * });
 * ```
 */

export const cachePersistencePlugin: IdentityPlugin = (context) => {
  const { cachePluginControl } = context as AzurePluginContext;

  cachePluginControl.setPersistence(createPersistenceCachePlugin);
};
