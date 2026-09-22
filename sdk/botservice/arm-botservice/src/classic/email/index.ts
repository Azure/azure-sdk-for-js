// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureBotServiceContext } from "../../api/azureBotServiceContext.js";
import { createSignInUrl } from "../../api/email/operations.js";
import type { EmailCreateSignInUrlOptionalParams } from "../../api/email/options.js";
import type { CreateEmailSignInUrlResponse } from "../../models/models.js";

/** Interface representing a Email operations. */
export interface EmailOperations {
  /** Creates an email channel sign in url for a Bot Service */
  createSignInUrl: (
    resourceGroupName: string,
    resourceName: string,
    options?: EmailCreateSignInUrlOptionalParams,
  ) => Promise<CreateEmailSignInUrlResponse>;
}

function _getEmail(context: AzureBotServiceContext) {
  return {
    createSignInUrl: (
      resourceGroupName: string,
      resourceName: string,
      options?: EmailCreateSignInUrlOptionalParams,
    ) => createSignInUrl(context, resourceGroupName, resourceName, options),
  };
}

export function _getEmailOperations(context: AzureBotServiceContext): EmailOperations {
  return {
    ..._getEmail(context),
  };
}
