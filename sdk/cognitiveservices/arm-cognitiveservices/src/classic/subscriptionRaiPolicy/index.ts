// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { $delete, createOrUpdate, get } from "../../api/subscriptionRaiPolicy/operations.js";
import type {
  SubscriptionRaiPolicyDeleteOptionalParams,
  SubscriptionRaiPolicyCreateOrUpdateOptionalParams,
  SubscriptionRaiPolicyGetOptionalParams,
} from "../../api/subscriptionRaiPolicy/options.js";
import type { RaiPolicy } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SubscriptionRaiPolicy operations. */
export interface SubscriptionRaiPolicyOperations {
  /** Deletes the specified Content Filters associated with the subscription. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    raiPolicyName: string,
    options?: SubscriptionRaiPolicyDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the state of specified Content Filters associated with the subscription. */
  createOrUpdate: (
    raiPolicyName: string,
    raiPolicy: RaiPolicy,
    options?: SubscriptionRaiPolicyCreateOrUpdateOptionalParams,
  ) => Promise<RaiPolicy>;
  /** Gets the specified Content Filters associated with the Subscription. */
  get: (
    raiPolicyName: string,
    options?: SubscriptionRaiPolicyGetOptionalParams,
  ) => Promise<RaiPolicy>;
}

function _getSubscriptionRaiPolicy(context: CognitiveServicesManagementContext) {
  return {
    delete: (raiPolicyName: string, options?: SubscriptionRaiPolicyDeleteOptionalParams) =>
      $delete(context, raiPolicyName, options),
    createOrUpdate: (
      raiPolicyName: string,
      raiPolicy: RaiPolicy,
      options?: SubscriptionRaiPolicyCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, raiPolicyName, raiPolicy, options),
    get: (raiPolicyName: string, options?: SubscriptionRaiPolicyGetOptionalParams) =>
      get(context, raiPolicyName, options),
  };
}

export function _getSubscriptionRaiPolicyOperations(
  context: CognitiveServicesManagementContext,
): SubscriptionRaiPolicyOperations {
  return {
    ..._getSubscriptionRaiPolicy(context),
  };
}
