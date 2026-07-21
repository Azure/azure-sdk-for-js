// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext } from "../../api/contentStoreContext.js";
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

function _getSaaSOperationGroup(context: ContentStoreContext) {
  return {
    activateResource: (
      body: ActivateSaaSParameterRequest,
      options?: SaaSOperationGroupActivateResourceOptionalParams,
    ) => activateResource(context, body, options),
  };
}

export function _getSaaSOperationGroupOperations(
  context: ContentStoreContext,
): SaaSOperationGroupOperations {
  return {
    ..._getSaaSOperationGroup(context),
  };
}
