// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/advancedPlatformMetrics/operations.js";
import {
  AdvancedPlatformMetricsListOptionalParams,
  AdvancedPlatformMetricsDeleteOptionalParams,
  AdvancedPlatformMetricsCreateOrUpdateOptionalParams,
  AdvancedPlatformMetricsGetOptionalParams,
} from "../../api/advancedPlatformMetrics/options.js";
import {
  AdvancedPlatformMetricsRule,
  AdvancedPlatformMetricsRuleType,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AdvancedPlatformMetrics operations. */
export interface AdvancedPlatformMetricsOperations {
  /** List the advanced platform metrics rules associated with the storage account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: AdvancedPlatformMetricsListOptionalParams,
  ) => PagedAsyncIterableIterator<AdvancedPlatformMetricsRule>;
  /** Delete the advanced platform metrics rule for the storage account by rule type. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
    options?: AdvancedPlatformMetricsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update the advanced platform metrics rule for the storage account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
    resource: AdvancedPlatformMetricsRule,
    options?: AdvancedPlatformMetricsCreateOrUpdateOptionalParams,
  ) => Promise<AdvancedPlatformMetricsRule>;
  /** Get the advanced platform metrics rule for the storage account by rule type. */
  get: (
    resourceGroupName: string,
    accountName: string,
    advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
    options?: AdvancedPlatformMetricsGetOptionalParams,
  ) => Promise<AdvancedPlatformMetricsRule>;
}

function _getAdvancedPlatformMetrics(context: StorageManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: AdvancedPlatformMetricsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
      options?: AdvancedPlatformMetricsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, advancedPlatformMetricsRuleType, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
      resource: AdvancedPlatformMetricsRule,
      options?: AdvancedPlatformMetricsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        advancedPlatformMetricsRuleType,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
      options?: AdvancedPlatformMetricsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, advancedPlatformMetricsRuleType, options),
  };
}

export function _getAdvancedPlatformMetricsOperations(
  context: StorageManagementContext,
): AdvancedPlatformMetricsOperations {
  return {
    ..._getAdvancedPlatformMetrics(context),
  };
}
