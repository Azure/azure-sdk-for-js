// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import { msalNodeFlowPluginControl } from "./msal/nodeFlows/nodeCommon";

export interface AzureExtensionContext {
  nodeFlow: typeof msalNodeFlowPluginControl;
}

export interface IdentityExtension {
  use: (context: AzureExtensionContext) => void;
}

/**
 * Extend Azure Identity with additional functionality.
 *
 * The type of this function's parameter is `never` until a module that can
 * provide an extension is imported.
 *
 * Example:
 *
 * ```javascript
 * import persistence from "@azure/identity-persistence";
 *
 * import { useIdentityExtension, DefaultAzureCredential } from "@azure/identity";
 * useIdentityExtension(persistence);
 *
 * // The extension has the capability to extend `DefaultAzureCredential` and to
 * // add middleware to the underlying credentials, such as persistence.
 * const credential = new DefaultAzureCredential();
 * ```
 *
 * An extension can also be passed in from a module `import` asynchronously, in which
 * case it will return a Promise.
 *
 * ```javascript
 * import { useIdentityExtension, DefaultAzureCredential } from "@azure/identity";
 *
 * async function main() {
 *   await useIdentityExtension(import("@azure/identity-persistence"));
 *
 *   const credential = new DefaultAzureCredential();
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
export function useIdentityExtension<
  Extension extends IdentityExtension | PromiseLike<{ default: IdentityExtension }>
>(extension: Extension): Extension extends PromiseLike<unknown> ? Promise<void> : void {
  const ctx = {
    nodeFlow: msalNodeFlowPluginControl
  };

  if (
    extension &&
    Object.prototype.hasOwnProperty.call(extension, "then") &&
    typeof (extension as PromiseLike<unknown>).then === "function"
  ) {
    return (extension as PromiseLike<{ default: IdentityExtension }>).then(
      ({ default: extension }) => {
        extension.use(ctx);
      }
    ) as any;
  } else {
    return (extension as IdentityExtension).use(ctx) as any;
  }
}
