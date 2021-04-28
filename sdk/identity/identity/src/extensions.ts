// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import {
  defaultCredentialStack,
  TokenCredentialConstructor
} from "./credentials/defaultCredentialStack";

export interface IdentityExtension {
  augmentDefaultCredentialStack: (stack: TokenCredentialConstructor[]) => void;
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
 * import extension from "@azure/identity-native";
 *
 * import { addIdentityExtension, DefaultAzureCredential } from "@azure/identity";
 * addIdentityExtension(extension);
 *
 * // The extension has the capability to extend `DefaultAzureCredential` and to
 * // add middleware to the underlying credentials, such as persistence.
 * const credential = new DefaultAzureCredential();
 * ```
 *
 * @param extension - the extension to register
 */
export function addIdentityExtension(extension: Partial<IdentityExtension>): void {
  extension.augmentDefaultCredentialStack?.(defaultCredentialStack);
}
