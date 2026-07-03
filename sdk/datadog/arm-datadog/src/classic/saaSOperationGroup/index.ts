// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftDatadogContext } from "../../api/microsoftDatadogContext.js";
import { activateResource } from "../../api/saaSOperationGroup/operations.js";
import type { SaaSOperationGroupActivateResourceOptionalParams } from "../../api/saaSOperationGroup/options.js";
import type {
  ActivateSaaSParameterRequest,
  SaaSResourceDetailsResponse,
} from "../../models/models.js";

/** Interface representing a SaaSOperationGroup operations. */
export interface SaaSOperationGroupOperations {
  /** Resolve the token to get the SaaS resource ID and activate the SaaS resource */
  activateResource: (
    body: ActivateSaaSParameterRequest,
    options?: SaaSOperationGroupActivateResourceOptionalParams,
  ) => Promise<SaaSResourceDetailsResponse>;
}

function _getSaaSOperationGroup(context: MicrosoftDatadogContext) {
  return {
    activateResource: (
      body: ActivateSaaSParameterRequest,
      options?: SaaSOperationGroupActivateResourceOptionalParams,
    ) => activateResource(context, body, options),
  };
}

export function _getSaaSOperationGroupOperations(
  context: MicrosoftDatadogContext,
): SaaSOperationGroupOperations {
  return {
    ..._getSaaSOperationGroup(context),
  };
}
