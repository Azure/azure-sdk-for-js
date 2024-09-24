// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePluginContext } from "../../identity/src/plugins/provider";
import { IdentityPlugin } from "@azure/identity";
import { NativeBrokerPlugin } from "@azure/msal-node-extensions";

/**
 * A plugin that provides WAM Integration for `@azure/identity`
 * credentials. The plugin API is compatible with `@azure/identity` versions
 * 4.0.0 and later. Load this plugin using the `useIdentityPlugin`
 * function, imported from `@azure/identity`.
 *
 * Example:
 *
 * ```ts snippet:using_plugins
 * import { useIdentityPlugin, InteractiveBrowserCredential } from "@azure/identity";
 * import { nativeBrokerPlugin } from "@azure/identity-broker";
 *
 * useIdentityPlugin(nativeBrokerPlugin);
 * const credential = new InteractiveBrowserCredential({
 *   brokerOptions: {
 *     enabled: true,
 *     parentWindowHandle: new Uint8Array(0), // This should be a handle to the parent window
 *   },
 * });
 * ```
 */

export const nativeBrokerPlugin: IdentityPlugin = (context: unknown) => {
  const { nativeBrokerPluginControl } = context as AzurePluginContext;
  const brokerPlugin = new NativeBrokerPlugin();
  nativeBrokerPluginControl.setNativeBroker(brokerPlugin);
};
