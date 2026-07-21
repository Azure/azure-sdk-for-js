// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { update, get } from "../../api/quotaByPeriodKeys/operations.js";
import type {
  QuotaByPeriodKeysUpdateOptionalParams,
  QuotaByPeriodKeysGetOptionalParams,
} from "../../api/quotaByPeriodKeys/options.js";
import type { QuotaCounterContract, QuotaCounterValueUpdateContract } from "../../models/models.js";

/** Interface representing a QuotaByPeriodKeys operations. */
export interface QuotaByPeriodKeysOperations {
  /** Updates an existing quota counter value in the specified service instance. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    quotaCounterKey: string,
    quotaPeriodKey: string,
    parameters: QuotaCounterValueUpdateContract,
    options?: QuotaByPeriodKeysUpdateOptionalParams,
  ) => Promise<QuotaCounterContract>;
  /** Gets the value of the quota counter associated with the counter-key in the policy for the specific period in service instance. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    quotaCounterKey: string,
    quotaPeriodKey: string,
    options?: QuotaByPeriodKeysGetOptionalParams,
  ) => Promise<QuotaCounterContract>;
}

function _getQuotaByPeriodKeys(context: ApiManagementContext) {
  return {
    update: (
      resourceGroupName: string,
      serviceName: string,
      quotaCounterKey: string,
      quotaPeriodKey: string,
      parameters: QuotaCounterValueUpdateContract,
      options?: QuotaByPeriodKeysUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        quotaCounterKey,
        quotaPeriodKey,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      quotaCounterKey: string,
      quotaPeriodKey: string,
      options?: QuotaByPeriodKeysGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, quotaCounterKey, quotaPeriodKey, options),
  };
}

export function _getQuotaByPeriodKeysOperations(
  context: ApiManagementContext,
): QuotaByPeriodKeysOperations {
  return {
    ..._getQuotaByPeriodKeys(context),
  };
}
