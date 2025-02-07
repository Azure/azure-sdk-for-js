// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IdentityPlugin } from "@azure/identity";
import keytar from "keytar";

const VSCodeServiceName = "VS Code Azure";

/**
 * A function that searches for credentials in the Visual Studio Code credential store.
 *
 * @returns an array of credentials (username and password)
 */
type VSCodeCredentialFinder = () => Promise<Array<{ account: string; password: string }>>;

/**
 * Plugin context entries for controlling VisualStudioCodeCredential.
 */
interface VisualStudioCodeCredentialControl {
  setVsCodeCredentialFinder(finder: VSCodeCredentialFinder): void;
}

/**
 * Context options passed to a plugin during initialization.
 *
 * Plugin authors are responsible for casting their plugin context values
 * to this type.
 *
 * @internal
 */
interface AzurePluginContext {
  vsCodeCredentialControl: VisualStudioCodeCredentialControl;
}

/**
 * A plugin that provides the dependencies of `VisualStudioCodeCredential`
 * and enables it within `@azure/identity`. The plugin API is compatible with
 * `@azure/identity` versions 2.0.0 and later. Load this plugin using the
 * `useIdentityPlugin` function, imported from `@azure/identity`.
 *
 * `VisualStudioCodeCredential` uses the authentication session from the "Azure
 * Account" extension in VS Code.
 *
 * To use this functionality, import `VisualStudioCodeCredential` or
 * `DefaultAzureCredential` from `@azure/identity`. If this plugin is not
 * enabled, then `VisualStudioCodeCredential` will throw a
 * `CredentialUnavailableError`, and `DefaultAzureCredential` will not be able
 * to use authentication through Visual Studio Code.
 *
 * Example:
 *
 * ```javascript
 * import { useIdentityPlugin, VisualStudioCodeCredential } from "@azure/identity";
 * import { vsCodePlugin } from "@azure/identity-vscode";
 *
 * // Load the plugin
 * useIdentityPlugin(vsCodePlugin);
 *
 * // Now that the plugin is loaded, this credential may be used
 * const credential = new VisualStudioCodeCredential();
 * ```
 */
export const vsCodePlugin: IdentityPlugin = (context) => {
  const { vsCodeCredentialControl } = context as AzurePluginContext;

  vsCodeCredentialControl.setVsCodeCredentialFinder(() =>
    keytar.findCredentials(VSCodeServiceName),
  );
};
