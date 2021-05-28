// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

const persistence: unique symbol = Symbol("identity-persistence");
declare module "@azure/identity" {
  export interface AzureIdentityExtensionTypeMap {
    [persistence]: "@azure/identity-persistence";
  }
}

import { registerExtension } from "../../identity/src/extensionProvider";
import { createPersistenceCachePlugin } from "./persistence";

registerExtension(persistence, ({ pluginControl }) => {
  pluginControl.persistence = createPersistenceCachePlugin;
});

export default persistence;
