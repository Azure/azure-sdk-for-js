// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import { IdentityExtension } from "@azure/identity";
import { createPersistenceCachePlugin } from "./persistence";

const extension: IdentityExtension = {
  use: ({ nodeFlow }) => {
    nodeFlow.persistence = createPersistenceCachePlugin;
  }
};

export default extension;
