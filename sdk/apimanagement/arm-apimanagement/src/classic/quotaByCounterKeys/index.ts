// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { update, listByService } from "../../api/quotaByCounterKeys/operations.js";
import type {
  QuotaByCounterKeysUpdateOptionalParams,
  QuotaByCounterKeysListByServiceOptionalParams,
} from "../../api/quotaByCounterKeys/options.js";
import type {
  QuotaCounterCollection,
  QuotaCounterValueUpdateContract,
} from "../../models/models.js";

/** Interface representing a QuotaByCounterKeys operations. */
export interface QuotaByCounterKeysOperations {
  /** Updates all the quota counter values specified with the existing quota counter key to a value in the specified service instance. This should be used for reset of the quota counter values. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    quotaCounterKey: string,
    parameters: QuotaCounterValueUpdateContract,
    options?: QuotaByCounterKeysUpdateOptionalParams,
  ) => Promise<QuotaCounterCollection>;
  /** Lists a collection of current quota counter periods associated with the counter-key configured in the policy on the specified service instance. The api does not support paging yet. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    quotaCounterKey: string,
    options?: QuotaByCounterKeysListByServiceOptionalParams,
  ) => Promise<QuotaCounterCollection>;
}

function _getQuotaByCounterKeys(context: ApiManagementContext) {
  return {
    update: (
      resourceGroupName: string,
      serviceName: string,
      quotaCounterKey: string,
      parameters: QuotaCounterValueUpdateContract,
      options?: QuotaByCounterKeysUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, quotaCounterKey, parameters, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      quotaCounterKey: string,
      options?: QuotaByCounterKeysListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, quotaCounterKey, options),
  };
}

export function _getQuotaByCounterKeysOperations(
  context: ApiManagementContext,
): QuotaByCounterKeysOperations {
  return {
    ..._getQuotaByCounterKeys(context),
  };
}
