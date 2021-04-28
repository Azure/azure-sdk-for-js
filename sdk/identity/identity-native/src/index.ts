// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import { IdentityExtension } from "../../identity/types/identity";

const extension: Partial<IdentityExtension> = {
  augmentDefaultCredentialStack: (stack) => {
    stack.push(VisualStudioCodeCredential);
  }
};

export default extension;
