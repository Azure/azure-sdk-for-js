// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { list, update, createOrUpdate, get } from "../../api/quota/operations.js";
import type {
  QuotaListOptionalParams,
  QuotaUpdateOptionalParams,
  QuotaCreateOrUpdateOptionalParams,
  QuotaGetOptionalParams,
} from "../../api/quota/options.js";
import type { CurrentQuotaLimitBase } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Quota operations. */
export interface QuotaOperations {
  /** Get a list of current quota limits of all resources for the specified scope. The response from this GET operation can be leveraged to submit requests to update a quota. */
  list: (
    scope: string,
    options?: QuotaListOptionalParams,
  ) => PagedAsyncIterableIterator<CurrentQuotaLimitBase>;
  /**
   * Update the quota limit for a specific resource to the specified value:
   * 1. Use the Usages-GET and Quota-GET operations to determine the remaining quota for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
   * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
   */
  update: (
    resourceName: string,
    scope: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaUpdateOptionalParams,
  ) => PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase>;
  /**
   * Create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps:
   * 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
   * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
   */
  createOrUpdate: (
    resourceName: string,
    scope: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase>;
  /** Get the quota limit of a resource. The response can be used to determine the remaining quota to calculate a new quota limit that can be submitted with a PUT request. */
  get: (
    resourceName: string,
    scope: string,
    options?: QuotaGetOptionalParams,
  ) => Promise<CurrentQuotaLimitBase>;
}

function _getQuota(context: AzureQuotaExtensionAPIContext) {
  return {
    list: (scope: string, options?: QuotaListOptionalParams) => list(context, scope, options),
    update: (
      resourceName: string,
      scope: string,
      createQuotaRequest: CurrentQuotaLimitBase,
      options?: QuotaUpdateOptionalParams,
    ) => update(context, resourceName, scope, createQuotaRequest, options),
    createOrUpdate: (
      resourceName: string,
      scope: string,
      createQuotaRequest: CurrentQuotaLimitBase,
      options?: QuotaCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceName, scope, createQuotaRequest, options),
    get: (resourceName: string, scope: string, options?: QuotaGetOptionalParams) =>
      get(context, resourceName, scope, options),
  };
}

export function _getQuotaOperations(context: AzureQuotaExtensionAPIContext): QuotaOperations {
  return {
    ..._getQuota(context),
  };
}
