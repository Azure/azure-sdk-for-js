// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzurePluginContext, IdentityPlugin } from "./provider";
import { msalNodeFlowCacheControl } from "../msal/nodeFlows/msalNodeCommon";
import { vsCodeCredentialControl } from "../credentials/visualStudioCodeCredential";

/**
 * The context passed to an Identity plugin. This contains objects that
 * plugins can use to set backend implementations.
 * @internal
 */
const pluginContext: AzurePluginContext = {
  cachePluginControl: msalNodeFlowCacheControl,
  vsCodeCredentialControl: vsCodeCredentialControl
};

/**
 * Extend Azure Identity with additional functionality. Pass a plugin from
 * a plugin package, such as:
 *
 * - `@azure/identity-cache-persistence`: provides persistent token caching
 * - `@azure/identity-vscode`: provides the dependencies of
 *   `VisualStudioCodeCredential` and enables it
 *
 * Example:
 *
 * ```javascript
 * import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
 *
 * import { useIdentityPlugin, DefaultAzureCredential } from "@azure/identity";
 * useIdentityPlugin(cachePersistencePlugin);
 *
 * // The plugin has the capability to extend `DefaultAzureCredential` and to
 * // add middleware to the underlying credentials, such as persistence.
 * const credential = new DefaultAzureCredential({
 *   tokenCachePersistenceOptions: {
 *     enabled: true
 *   }
 * });
 * ```
 *
 * @param plugin - the plugin to register
 */
export function useIdentityPlugin(plugin: IdentityPlugin): void {
  plugin(pluginContext);
}
