// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProfessionalServiceContext } from "../../api/professionalServiceContext.js";
import { getSubscriptionOperationStatus } from "../../api/professionalServiceOperationStatuses/operations.js";
import type { ProfessionalServiceOperationStatusesGetSubscriptionOperationStatusOptionalParams } from "../../api/professionalServiceOperationStatuses/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a ProfessionalServiceOperationStatuses operations. */
export interface ProfessionalServiceOperationStatusesOperations {
  /** Gets the status of a long-running Professional Service operation at the subscription scope. All async operations, including resource-group-scoped ones, poll through this endpoint. */
  getSubscriptionOperationStatus: (
    operationId: string,
    options?: ProfessionalServiceOperationStatusesGetSubscriptionOperationStatusOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getProfessionalServiceOperationStatuses(context: ProfessionalServiceContext) {
  return {
    getSubscriptionOperationStatus: (
      operationId: string,
      options?: ProfessionalServiceOperationStatusesGetSubscriptionOperationStatusOptionalParams,
    ) => getSubscriptionOperationStatus(context, operationId, options),
  };
}

export function _getProfessionalServiceOperationStatusesOperations(
  context: ProfessionalServiceContext,
): ProfessionalServiceOperationStatusesOperations {
  return {
    ..._getProfessionalServiceOperationStatuses(context),
  };
}
