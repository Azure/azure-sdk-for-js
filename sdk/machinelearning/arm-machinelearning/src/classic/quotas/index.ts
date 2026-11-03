// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, update } from "../../api/quotas/operations.js";
import type {
  QuotasListOptionalParams,
  QuotasUpdateOptionalParams,
} from "../../api/quotas/options.js";
import type {
  QuotaUpdateParameters,
  UpdateWorkspaceQuotasResult,
  ResourceQuota,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Quotas operations. */
export interface QuotasOperations {
  /** Gets the currently assigned Workspace Quotas based on VMFamily. */
  list: (
    location: string,
    options?: QuotasListOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceQuota>;
  /** Update quota for each VM family in workspace. */
  update: (
    location: string,
    parameters: QuotaUpdateParameters,
    options?: QuotasUpdateOptionalParams,
  ) => Promise<UpdateWorkspaceQuotasResult>;
}

function _getQuotas(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (location: string, options?: QuotasListOptionalParams) =>
      list(context, location, options),
    update: (
      location: string,
      parameters: QuotaUpdateParameters,
      options?: QuotasUpdateOptionalParams,
    ) => update(context, location, parameters, options),
  };
}

export function _getQuotasOperations(
  context: AzureMachineLearningServicesManagementContext,
): QuotasOperations {
  return {
    ..._getQuotas(context),
  };
}
