// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

declare module "@azure/identity" {
  interface AzureIdentityExtensionTypeMap {
    [vscodeExtension]: "@azure/identity-vscode";
  }
}

import { DefaultAzureCredential } from "@azure/identity";
import { registerExtension } from "../../identity/src/extensionProvider";
import { VisualStudioCodeCredential } from "./visualStudioCodeCredential";

export { VisualStudioCodeCredential };

const vscodeExtension: unique symbol = Symbol("identity-vscode");

function insertBefore<T>(value: T, array: T[], predicate: (v: T) => boolean) {
  array.splice(array.findIndex(predicate), 0, value);
}

registerExtension(vscodeExtension, () => {
  // We want to add VisualStudioCodeCredential before AzurePowerShellCredential
  // because it is relatively quick to check, but AzurePowerShellCredential is
  // slow.
  insertBefore(
    VisualStudioCodeCredential,
    DefaultAzureCredential.credentials,
    (ctor) => ctor.name === "AzurePowerShellCredential"
  );
});

export default vscodeExtension;
