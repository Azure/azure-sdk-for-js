// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext } from "../../api/subscriptionContext.js";
import { get } from "../../api/subscriptionOperation/operations.js";
import type { SubscriptionOperationGetOptionalParams } from "../../api/subscriptionOperation/options.js";
import type { SubscriptionCreationResult } from "../../models/models.js";

/** Interface representing a SubscriptionOperation operations. */
export interface SubscriptionOperationOperations {
  /** Get the status of the pending Microsoft.Subscription API operations. */
  get: (
    operationId: string,
    options?: SubscriptionOperationGetOptionalParams,
  ) => Promise<SubscriptionCreationResult>;
}

function _getSubscriptionOperation(context: SubscriptionContext) {
  return {
    get: (operationId: string, options?: SubscriptionOperationGetOptionalParams) =>
      get(context, operationId, options),
  };
}

export function _getSubscriptionOperationOperations(
  context: SubscriptionContext,
): SubscriptionOperationOperations {
  return {
    ..._getSubscriptionOperation(context),
  };
}
