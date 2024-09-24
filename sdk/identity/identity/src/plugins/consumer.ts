// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePluginContext, IdentityPlugin } from "./provider";
import {
  msalNodeFlowCacheControl,
  msalNodeFlowNativeBrokerControl,
} from "../msal/nodeFlows/msalPlugins";

import { vsCodeCredentialControl } from "../credentials/visualStudioCodeCredential";

/**
 * The context passed to an Identity plugin. This contains objects that
 * plugins can use to set backend implementations.
 * @internal
 */
const pluginContext: AzurePluginContext = {
  cachePluginControl: msalNodeFlowCacheControl,
  nativeBrokerPluginControl: msalNodeFlowNativeBrokerControl,
  vsCodeCredentialControl: vsCodeCredentialControl,
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
 * ```ts snippet:consumer_example
 * import { useIdentityPlugin, DeviceCodeCredential } from "@azure/identity";
 *
 * useIdentityPlugin(cachePersistencePlugin);
 * // The plugin has the capability to extend `DeviceCodeCredential` and to
 * // add middleware to the underlying credentials, such as persistence.
 * const credential = new DeviceCodeCredential({
 *   tokenCachePersistenceOptions: {
 *     enabled: true,
 *   },
 * });
 * ```
 *
 * @param plugin - the plugin to register
 */
export function useIdentityPlugin(plugin: IdentityPlugin): void {
  plugin(pluginContext);
}
