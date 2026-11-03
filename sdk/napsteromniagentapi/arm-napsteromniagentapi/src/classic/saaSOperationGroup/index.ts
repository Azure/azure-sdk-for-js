// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CompanionAPIContext } from "../../api/companionAPIContext.js";
import { activateResource } from "../../api/saaSOperationGroup/operations.js";
import type { SaaSOperationGroupActivateResourceOptionalParams } from "../../api/saaSOperationGroup/options.js";
import type {
  ActivateSaaSParameterRequest,
  SaaSResourceDetailsResponse,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SaaSOperationGroup operations. */
export interface SaaSOperationGroupOperations {
  /** Resolve the token to get the SaaS resource ID and activate the SaaS resource */
  activateResource: (
    body: ActivateSaaSParameterRequest,
    options?: SaaSOperationGroupActivateResourceOptionalParams,
  ) => PollerLike<OperationState<SaaSResourceDetailsResponse>, SaaSResourceDetailsResponse>;
}

function _getSaaSOperationGroup(context: CompanionAPIContext) {
  return {
    activateResource: (
      body: ActivateSaaSParameterRequest,
      options?: SaaSOperationGroupActivateResourceOptionalParams,
    ) => activateResource(context, body, options),
  };
}

export function _getSaaSOperationGroupOperations(
  context: CompanionAPIContext,
): SaaSOperationGroupOperations {
  return {
    ..._getSaaSOperationGroup(context),
  };
}
