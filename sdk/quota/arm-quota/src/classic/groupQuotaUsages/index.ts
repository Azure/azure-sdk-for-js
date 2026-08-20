// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { list } from "../../api/groupQuotaUsages/operations.js";
import { GroupQuotaUsagesListOptionalParams } from "../../api/groupQuotaUsages/options.js";
import { ResourceUsages } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GroupQuotaUsages operations. */
export interface GroupQuotaUsagesOperations {
  /** Gets the GroupQuotas usages and limits(quota). Location is required paramter. */
  list: (
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    location: string,
    options?: GroupQuotaUsagesListOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceUsages>;
}

function _getGroupQuotaUsages(context: AzureQuotaExtensionAPIContext) {
  return {
    list: (
      managementGroupId: string,
      groupQuotaName: string,
      resourceProviderName: string,
      location: string,
      options?: GroupQuotaUsagesListOptionalParams,
    ) => list(context, managementGroupId, groupQuotaName, resourceProviderName, location, options),
  };
}

export function _getGroupQuotaUsagesOperations(
  context: AzureQuotaExtensionAPIContext,
): GroupQuotaUsagesOperations {
  return {
    ..._getGroupQuotaUsages(context),
  };
}
