// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext } from "../../api/blockContext.js";
import { activateResource } from "../../api/saaSOperationGroup/operations.js";
import type { SaaSOperationGroupActivateResourceOptionalParams } from "../../api/saaSOperationGroup/options.js";
import type { ActivateSaaSRequest, SaaSResourceDetailsResponse } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SaaSOperationGroup operations. */
export interface SaaSOperationGroupOperations {
  /** Activate the SaaS resource */
  activateResource: (
    body: ActivateSaaSRequest,
    options?: SaaSOperationGroupActivateResourceOptionalParams,
  ) => PollerLike<OperationState<SaaSResourceDetailsResponse>, SaaSResourceDetailsResponse>;
}
function _getSaaSOperationGroup(context: BlockContext) {
  return {
    activateResource: (
      body: ActivateSaaSRequest,
      options?: SaaSOperationGroupActivateResourceOptionalParams,
    ) => activateResource(context, body, options),
  };
}
export function _getSaaSOperationGroupOperations(
  context: BlockContext,
): SaaSOperationGroupOperations {
  return {
    ..._getSaaSOperationGroup(context),
  };
}
