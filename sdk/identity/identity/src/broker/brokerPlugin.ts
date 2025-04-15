import { useIdentityPlugin } from "../plugins/consumer.js";
import { IdentityPlugin } from "../plugins/provider.js";

/**
 * A plugin that provides WAM Integration for `@azure/identity` credentials.
 * Load this plugin using the `useIdentityPlugin` function from `@azure/identity`.
 */

interface AzurePluginContext {
  nativeBrokerPluginControl: NativeBrokerPluginControl;
}

interface NativeBrokerPluginControl {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  setNativeBroker(nativeBroker: import("@azure/msal-node").INativeBrokerPlugin): void;
}

export const nativeBrokerPlugin: IdentityPlugin = async (context: unknown) => {
  const { nativeBrokerPluginControl } = context as AzurePluginContext;
  const { NativeBrokerPlugin } = await import("@azure/msal-node-extensions");
  const brokerPlugin = new NativeBrokerPlugin();
  nativeBrokerPluginControl.setNativeBroker(brokerPlugin);
};

export function isBrokerAvailable(): boolean {
  try {
    // @ts-expect-error Testing for the presence of the plugin
    const { NativeBrokerPlugin } = require("@azure/msal-node-extensions");
    return !!NativeBrokerPlugin;
  } catch (e) {
    return false;
  }
}

if (nativeBrokerPlugin) {
  useIdentityPlugin(nativeBrokerPlugin);
}
// option 1: Make line 20 synchronous, remove await
// option 2: Make line 20 async, but call generateMsalPluginConfiguration as part of getToken call
