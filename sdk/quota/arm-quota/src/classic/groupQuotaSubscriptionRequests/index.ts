// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { list, get } from "../../api/groupQuotaSubscriptionRequests/operations.js";
import type {
  GroupQuotaSubscriptionRequestsListOptionalParams,
  GroupQuotaSubscriptionRequestsGetOptionalParams,
} from "../../api/groupQuotaSubscriptionRequests/options.js";
import type { GroupQuotaSubscriptionRequestStatus } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GroupQuotaSubscriptionRequests operations. */
export interface GroupQuotaSubscriptionRequestsOperations {
  /** List API to check the status of a subscriptionId requests by requestId. Request history is maintained for 1 year. */
  list: (
    managementGroupId: string,
    groupQuotaName: string,
    options?: GroupQuotaSubscriptionRequestsListOptionalParams,
  ) => PagedAsyncIterableIterator<GroupQuotaSubscriptionRequestStatus>;
  /** Get API to check the status of a subscriptionIds request by requestId.  Use the polling API - OperationsStatus URI specified in Azure-AsyncOperation header field, with retry-after duration in seconds to check the intermediate status. This API provides the finals status with the request details and status. */
  get: (
    managementGroupId: string,
    groupQuotaName: string,
    requestId: string,
    options?: GroupQuotaSubscriptionRequestsGetOptionalParams,
  ) => Promise<GroupQuotaSubscriptionRequestStatus>;
}

function _getGroupQuotaSubscriptionRequests(context: AzureQuotaExtensionAPIContext) {
  return {
    list: (
      managementGroupId: string,
      groupQuotaName: string,
      options?: GroupQuotaSubscriptionRequestsListOptionalParams,
    ) => list(context, managementGroupId, groupQuotaName, options),
    get: (
      managementGroupId: string,
      groupQuotaName: string,
      requestId: string,
      options?: GroupQuotaSubscriptionRequestsGetOptionalParams,
    ) => get(context, managementGroupId, groupQuotaName, requestId, options),
  };
}

export function _getGroupQuotaSubscriptionRequestsOperations(
  context: AzureQuotaExtensionAPIContext,
): GroupQuotaSubscriptionRequestsOperations {
  return {
    ..._getGroupQuotaSubscriptionRequests(context),
  };
}
