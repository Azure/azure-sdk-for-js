"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.nativeBrokerPlugin = void 0;
const msal_node_extensions_1 = require("@azure/msal-node-extensions");
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
 *
 * const credential = new InteractiveBrowserCredential({
 *   brokerOptions: {
 *     enabled: true,
 *     parentWindowHandle: new Uint8Array(0), // This should be a handle to the parent window
 *   },
 * });
 * ```
 */
const nativeBrokerPlugin = (context) => {
    const { nativeBrokerPluginControl } = context;
    const brokerPlugin = new msal_node_extensions_1.NativeBrokerPlugin();
    nativeBrokerPluginControl.setNativeBroker(brokerPlugin);
};
exports.nativeBrokerPlugin = nativeBrokerPlugin;
//# sourceMappingURL=index.js.map