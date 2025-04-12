import { INativeBrokerPlugin } from "@azure/msal-node";
import { NativeBrokerPlugin } from "@azure/msal-node-extensions";
import { IdentityPlugin } from "../plugins/provider.js";

/**
 * A plugin that provides WAM Integration for `@azure/identity` credentials.
 * Load this plugin using the `useIdentityPlugin` function from `@azure/identity`.
 */
export const nativeBrokerPlugin: IdentityPlugin = (context: { nativeBrokerPluginControl: { setNativeBroker: (broker: INativeBrokerPlugin) => void } }) => {
  const brokerPlugin = new NativeBrokerPlugin();
  context.nativeBrokerPluginControl.setNativeBroker(brokerPlugin);
};