// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { checkNameAvailability } from "../../api/aiGatewayNameAvailabilityOperations/operations.js";
import type { AiGatewayNameAvailabilityOperationsCheckNameAvailabilityOptionalParams } from "../../api/aiGatewayNameAvailabilityOperations/options.js";
import type {
  AiGatewayCheckNameAvailabilityRequest,
  AiGatewayCheckNameAvailabilityResponse,
} from "../../models/models.js";

/** Interface representing a AiGatewayNameAvailabilityOperations operations. */
export interface AiGatewayNameAvailabilityOperationsOperations {
  /** Checks whether an AI Gateway name is valid and available in a location. */
  checkNameAvailability: (
    location: string,
    body: AiGatewayCheckNameAvailabilityRequest,
    options?: AiGatewayNameAvailabilityOperationsCheckNameAvailabilityOptionalParams,
  ) => Promise<AiGatewayCheckNameAvailabilityResponse>;
}

function _getAiGatewayNameAvailabilityOperations(context: ApiManagementContext) {
  return {
    checkNameAvailability: (
      location: string,
      body: AiGatewayCheckNameAvailabilityRequest,
      options?: AiGatewayNameAvailabilityOperationsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, location, body, options),
  };
}

export function _getAiGatewayNameAvailabilityOperationsOperations(
  context: ApiManagementContext,
): AiGatewayNameAvailabilityOperationsOperations {
  return {
    ..._getAiGatewayNameAvailabilityOperations(context),
  };
}
