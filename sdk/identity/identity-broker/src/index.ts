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
 * ```typescript
 * import { useIdentityPlugin, DeviceCodeCredential } from "@azure/identity";
 * import { nativeBrokerPlugin } from "@azure/identity-broker";
 *
 * // Load the plugin
 * useIdentityPlugin(nativeBrokerPlugin);
 * ```
 */

export const nativeBrokerPlugin: IdentityPlugin = (context: unknown) => {
  const { nativeBrokerPluginControl } = context as AzurePluginContext;
  const brokerPlugin = new NativeBrokerPlugin();
  nativeBrokerPluginControl.setNativeBroker(brokerPlugin);
};
