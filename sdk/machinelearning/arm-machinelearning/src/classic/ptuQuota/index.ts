// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, getAvailable, listAvailable } from "../../api/ptuQuota/operations.js";
import type {
  PTUQuotaListOptionalParams,
  PTUQuotaGetAvailableOptionalParams,
  PTUQuotaListAvailableOptionalParams,
} from "../../api/ptuQuota/options.js";
import type { AvailableQuota, UsageAndQuotaDetails } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PTUQuota operations. */
export interface PTUQuotaOperations {
  /** List MaaS PTU usage and quota. */
  list: (
    location: string,
    options?: PTUQuotaListOptionalParams,
  ) => PagedAsyncIterableIterator<UsageAndQuotaDetails>;
  /** Get available MaaS PTU quota. */
  getAvailable: (
    location: string,
    options?: PTUQuotaGetAvailableOptionalParams,
  ) => Promise<AvailableQuota>;
  /** List available MaaS PTU quota. */
  listAvailable: (
    location: string,
    options?: PTUQuotaListAvailableOptionalParams,
  ) => PagedAsyncIterableIterator<AvailableQuota>;
}

function _getPTUQuota(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (location: string, options?: PTUQuotaListOptionalParams) =>
      list(context, location, options),
    getAvailable: (location: string, options?: PTUQuotaGetAvailableOptionalParams) =>
      getAvailable(context, location, options),
    listAvailable: (location: string, options?: PTUQuotaListAvailableOptionalParams) =>
      listAvailable(context, location, options),
  };
}

export function _getPTUQuotaOperations(
  context: AzureMachineLearningServicesManagementContext,
): PTUQuotaOperations {
  return {
    ..._getPTUQuota(context),
  };
}
