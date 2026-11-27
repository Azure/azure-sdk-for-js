// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SaaSContext } from "../../api/saaSContext.js";
import {
  getSubscriptionOperationStatus,
  getTenantOperationStatus,
} from "../../api/saasOperationStatuses/operations.js";
import type {
  SaasOperationStatusesGetSubscriptionOperationStatusOptionalParams,
  SaasOperationStatusesGetTenantOperationStatusOptionalParams,
} from "../../api/saasOperationStatuses/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a SaasOperationStatuses operations. */
export interface SaasOperationStatusesOperations {
  /** Gets the status of a long-running SaaS operation at the subscription scope. */
  getSubscriptionOperationStatus: (
    operationId: string,
    options?: SaasOperationStatusesGetSubscriptionOperationStatusOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Gets the status of a long-running SaaS operation at the tenant scope. */
  getTenantOperationStatus: (
    operationId: string,
    options?: SaasOperationStatusesGetTenantOperationStatusOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getSaasOperationStatuses(context: SaaSContext) {
  return {
    getSubscriptionOperationStatus: (
      operationId: string,
      options?: SaasOperationStatusesGetSubscriptionOperationStatusOptionalParams,
    ) => getSubscriptionOperationStatus(context, operationId, options),
    getTenantOperationStatus: (
      operationId: string,
      options?: SaasOperationStatusesGetTenantOperationStatusOptionalParams,
    ) => getTenantOperationStatus(context, operationId, options),
  };
}

export function _getSaasOperationStatusesOperations(
  context: SaaSContext,
): SaasOperationStatusesOperations {
  return {
    ..._getSaasOperationStatuses(context),
  };
}
