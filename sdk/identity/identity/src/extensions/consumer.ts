// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureExtensionContext, IdentityExtension } from "./provider";
import { msalNodeFlowCacheControl } from "../msal/nodeFlows/nodeCommon";
import { vsCodeCredentialControl } from "../credentials/visualStudioCodeCredential";

/**
 * The context passed to an Identity Extension. This contains objects that
 * extensions can use to set backend implementations.
 * @internal
 */
const extensionContext: AzureExtensionContext = {
  cachePluginControl: msalNodeFlowCacheControl,
  vsCodeCredentialControl: vsCodeCredentialControl
};

/**
 * Extend Azure Identity with additional functionality. Pass an extension from
 * an extension package, such as:
 *
 * - `@azure/identity-cache-persistence`: provides persistent token caching
 * - `@azure/identity-vscode`: provides the dependencies of
 *   `VisualStudioCodeCredential` and enables it
 *
 * Example:
 *
 * ```javascript
 * import persistence from "@azure/identity-cache-persistence";
 *
 * import { useIdentityExtension, DefaultAzureCredential } from "@azure/identity";
 * useIdentityExtension(persistence);
 *
 * // The extension has the capability to extend `DefaultAzureCredential` and to
 * // add middleware to the underlying credentials, such as persistence.
 * const credential = new DefaultAzureCredential({
 *   tokenCachePersistenceOptions: {
 *     enabled: true
 *   }
 * });
 * ```
 *
 * An extension can also be passed in from a module `import` asynchronously, in which
 * case it will return a Promise.
 *
 * ```javascript
 * import { useIdentityExtension, DefaultAzureCredential } from "@azure/identity";
 *
 * async function main() {
 *   await useIdentityExtension(import("@azure/identity-cache-persistence"));
 *
 *   const credential = new DefaultAzureCredential({
 *     tokenCachePersistenceOptions: {
 *       enabled: true
 *     }
 *   });
 * }
 *
 * main().catch((error) => {
 *   console.error("An error occurred in the program:", error);
 *   process.exit(1);
 * });
 * ```
 *
 * @param extension - the extension to register
 */
export function useIdentityExtension(extension: IdentityExtension): void {
  extension(extensionContext);
}
