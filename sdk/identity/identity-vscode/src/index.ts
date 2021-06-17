// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { IdentityExtension } from "@azure/identity";

import { AzureExtensionContext } from "../../identity/src/extensions/provider";

import keytar from "keytar";

const VSCodeServiceName = "VS Code Azure";

/**
 * An extension that provides the dependencies of `VisualStudioCodeCredential`
 * and enables it within `@azure/identity`. The extension API is compatible with
 * `@azure/identity` versions 2.0.0 and later. Load this extension using the
 * `useIdentityExtension` function, imported from `@azure/identity`.
 *
 * `VisualStudioCodeCredential` uses the authentication session from the "Azure
 * Account" extension in VS Code.
 *
 * To use this functionality, import `VisualStudioCodeCredential` or
 * `DefaultAzureCredential` from `@azure/identity`. If this extension is not
 * enabled, then `VisualStudioCodeCredential` will throw a
 * `CredentialUnavailableError`, and `DefaultAzureCredential` will not be able
 * to use authentication through Visual Studio Code.
 *
 * Example:
 *
 * ```typescript
 * import { useIdentityExtension, VisualStudioCodeCredential } from "@azure/identity";
 * import { vsCodeExtension } from "@azure/identity-vscode";
 *
 * // Load the extension
 * useIdentityExtension(vsCodeExtension);
 *
 * // Now that the extension is loaded, this credential may be used
 * const credential = new VisualStudioCodeCredential();
 * ```
 */
export const vsCodeExtension: IdentityExtension = (context) => {
  const { vsCodeCredentialControl } = context as AzureExtensionContext;

  vsCodeCredentialControl.setVsCodeCredentialFinder(() =>
    keytar.findCredentials(VSCodeServiceName)
  );
};
