// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IdentityPlugin } from "@azure/identity";
import { NativeBrokerPlugin } from "@azure/msal-node-extensions";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Plugin context entries for controlling VisualStudioCodeCredential.
 */
interface VSCodeCredentialControl {
  setVSCodeAuthRecordPath(path: string): void;
  setVSCodeBroker(nativeBroker: import("@azure/msal-node").INativeBrokerPlugin): void;
}

/**
 * Context options passed to a plugin during initialization.
 *
 * Plugin authors are responsible for casting their plugin context values
 * to this type.
 */
interface AzurePluginContext {
  vsCodeCredentialControl: VSCodeCredentialControl;
}

/**
 * Finds the path to the VS Code authentication record file.
 * @returns The path to the authentication record file, or undefined if not found.
 */
function findAuthRecordPath(): string | undefined {
  const homedir = os.homedir();
  const azureDirs = [".azure", ".Azure"];

  for (const azureDir of azureDirs) {
    const authPath = path.join(
      homedir,
      azureDir,
      "ms-azuretools.vscode-azureresourcegroups",
      "authRecord.json",
    );
    if (existsSync(authPath)) {
      return authPath;
    }
  }
  return undefined;
}

/**
 * A plugin that provides the dependencies of `VisualStudioCodeCredential`
 * and enables it within `@azure/identity`. The plugin API is compatible with
 * `@azure/identity` versions 4.11.0 and later. Load this plugin using the
 * `useIdentityPlugin` function, imported from `@azure/identity`.
 *
 * To use this functionality, import `VisualStudioCodeCredential` or
 * `DefaultAzureCredential` from `@azure/identity`. If this plugin is not
 * enabled, then `VisualStudioCodeCredential` will throw a
 * `CredentialUnavailableError`, and `DefaultAzureCredential` will not be able
 * to use authentication through Visual Studio Code.
 *
 * Example:
 *
 * ```ts snippet:ReadmeSampleVisualStudioCodeCredential
 * import { useIdentityPlugin, VisualStudioCodeCredential } from "@azure/identity";
 * import { vsCodePlugin } from "@azure/identity-vscode";
 *
 * useIdentityPlugin(vsCodePlugin);
 *
 * const credential = new VisualStudioCodeCredential();
 *
 * // The graph.microsoft.com scope is used as an example
 * const scope = "https://graph.microsoft.com/.default";
 *
 * // Print out part of the access token
 * console.log((await credential.getToken(scope)).token.substr(0, 10), "...");
 * ```
 */
export const vsCodePlugin: IdentityPlugin = (context) => {
  const { vsCodeCredentialControl } = context as AzurePluginContext;

  const authRecordPath = findAuthRecordPath();
  if (authRecordPath) {
    vsCodeCredentialControl.setVSCodeAuthRecordPath(authRecordPath);
  }

  const brokerPlugin = new NativeBrokerPlugin();
  vsCodeCredentialControl.setVSCodeBroker(brokerPlugin);
};
