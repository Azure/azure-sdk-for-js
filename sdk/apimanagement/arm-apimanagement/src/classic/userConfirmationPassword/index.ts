// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { send } from "../../api/userConfirmationPassword/operations.js";
import type { UserConfirmationPasswordSendOptionalParams } from "../../api/userConfirmationPassword/options.js";

/** Interface representing a UserConfirmationPassword operations. */
export interface UserConfirmationPasswordOperations {
  /** Sends confirmation */
  send: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    options?: UserConfirmationPasswordSendOptionalParams,
  ) => Promise<void>;
}

function _getUserConfirmationPassword(context: ApiManagementContext) {
  return {
    send: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      options?: UserConfirmationPasswordSendOptionalParams,
    ) => send(context, resourceGroupName, serviceName, userId, options),
  };
}

export function _getUserConfirmationPasswordOperations(
  context: ApiManagementContext,
): UserConfirmationPasswordOperations {
  return {
    ..._getUserConfirmationPassword(context),
  };
}
