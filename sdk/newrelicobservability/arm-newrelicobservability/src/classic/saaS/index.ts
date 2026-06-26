// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservabilityContext } from "../../api/newRelicObservabilityContext.js";
import { activateResource } from "../../api/saaS/operations.js";
import { SaaSActivateResourceOptionalParams } from "../../api/saaS/options.js";
import { ActivateSaaSParameterRequest, SaaSResourceDetailsResponse } from "../../models/models.js";

/** Interface representing a SaaS operations. */
export interface SaaSOperations {
  /** Resolve the token to get the SaaS resource ID and activate the SaaS resource */
  activateResource: (
    request: ActivateSaaSParameterRequest,
    options?: SaaSActivateResourceOptionalParams,
  ) => Promise<SaaSResourceDetailsResponse>;
}

function _getSaaS(context: NewRelicObservabilityContext) {
  return {
    activateResource: (
      request: ActivateSaaSParameterRequest,
      options?: SaaSActivateResourceOptionalParams,
    ) => activateResource(context, request, options),
  };
}

export function _getSaaSOperations(context: NewRelicObservabilityContext): SaaSOperations {
  return {
    ..._getSaaS(context),
  };
}
