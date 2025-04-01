// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { INativeBrokerPlugin } from "@azure/msal-node";
import { NativeBrokerPlugin } from "@azure/msal-node-extensions";
import { IdentityPlugin } from "../plugins/provider.js";

/**
 * A subset of the AzurePluginContext provided by \@azure/identity
 *
 * @internal
 */
interface AzurePluginContext {
  nativeBrokerPluginControl: NativeBrokerPluginControl;
}

interface NativeBrokerPluginControl {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  setNativeBroker(nativeBroker: INativeBrokerPlugin): void;
}

/**
 * A plugin that provides WAM Integration for `@azure/identity`
 * credentials. The plugin API is compatible with `@azure/identity` versions
 * 4.0.0 and later. Load this plugin using the `useIdentityPlugin`
 * function, imported from `@azure/identity`.
 *
 * Example:
 *
 * ```ts snippet:using_plugins
 * import { useIdentityPlugin, nativeBrokerPlugin, InteractiveBrowserCredential } from "@azure/identity";
 *
 * useIdentityPlugin(nativeBrokerPlugin);
 *
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
