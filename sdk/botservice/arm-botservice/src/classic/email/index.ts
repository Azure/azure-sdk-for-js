// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext } from "../../api/botServiceContext.js";
import { CreateEmailSignInUrlResponse } from "../../models/models.js";
import { EmailCreateSignInUrlOptionalParams } from "../../api/email/options.js";
import { createSignInUrl } from "../../api/email/operations.js";

/** Interface representing a Email operations. */
export interface EmailOperations {
  /** Creates an email channel sign in url for a Bot Service */
  createSignInUrl: (
    resourceGroupName: string,
    resourceName: string,
    options?: EmailCreateSignInUrlOptionalParams,
  ) => Promise<CreateEmailSignInUrlResponse>;
}

function _getEmail(context: BotServiceContext) {
  return {
    createSignInUrl: (
      resourceGroupName: string,
      resourceName: string,
      options?: EmailCreateSignInUrlOptionalParams,
    ) => createSignInUrl(context, resourceGroupName, resourceName, options),
  };
}

export function _getEmailOperations(context: BotServiceContext): EmailOperations {
  return {
    ..._getEmail(context),
  };
}
