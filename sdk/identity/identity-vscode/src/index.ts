// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import { DefaultAzureCredential, IdentityExtension } from "@azure/identity";
import { VisualStudioCodeCredential } from "./visualStudioCodeCredential";

export { VisualStudioCodeCredential };

export const extension: IdentityExtension = {
  use: () => {
    DefaultAzureCredential.credentials.push(VisualStudioCodeCredential);
  }
};

export default extension;
