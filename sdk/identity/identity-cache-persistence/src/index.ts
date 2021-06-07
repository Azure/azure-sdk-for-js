// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

const persistence: unique symbol = Symbol("identity-cache-persistence");
declare module "@azure/identity" {
  export interface AzureIdentityExtensionTypeMap {
    [persistence]: "@azure/identity-cache-persistence";
  }
}

import { registerExtension } from "../../identity/src/extensions/provider";
import { createPersistenceCachePlugin } from "./persistence";

registerExtension(persistence, ({ cachePluginControl }) => {
  cachePluginControl.persistence = createPersistenceCachePlugin;
});

export default persistence;
