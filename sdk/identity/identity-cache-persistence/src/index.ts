// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { IdentityExtension } from "@azure/identity";

import { AzureExtensionContext } from "../../identity/src/extensions/provider";
import { createPersistenceCachePlugin } from "./provider";

/**
 * An extension that provides persistent token caching for `@azure/identity`
 * credentials. The extension API is compatible with `@azure/identity` versions
 * 2.0.0 and later. Load this extension using the `useIdentityExtension`
 * function, imported from `@azure/identity`.
 *
 * In order to enable this functionality, you must also pass
 * `tokenCachePersistenceOptions` to your credential constructors with an
 * `enabled` property set to true.
 *
 * Example:
 *
 * ```typescript
 * import { useIdentityExtension, DeviceCodeCredential } from "@azure/identity";
 * import { cachePersistenceExtension } from "@azure/identity-cache-persistence";
 *
 * // Load the extension
 * useIdentityExtension(cachePersistenceExtension);
 *
 * const credential = new DeviceCodeCredential({
 *   tokenCachePersistenceOptions: {
 *     enabled: true
 *   }
 * });
 * ```
 */

export const cachePersistenceExtension: IdentityExtension = (context) => {
  const { cachePluginControl } = context as AzureExtensionContext;

  cachePluginControl.setPersistence(createPersistenceCachePlugin);
};
