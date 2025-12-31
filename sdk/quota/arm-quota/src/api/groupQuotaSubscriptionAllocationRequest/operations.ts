// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import type {
  SubscriptionQuotaAllocationsList,
  QuotaAllocationRequestStatus,
  _QuotaAllocationRequestStatusList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  subscriptionQuotaAllocationsListSerializer,
  subscriptionQuotaAllocationsListDeserializer,
  quotaAllocationRequestStatusDeserializer,
  _quotaAllocationRequestStatusListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GroupQuotaSubscriptionAllocationRequestListOptionalParams,
  GroupQuotaSubscriptionAllocationRequestGetOptionalParams,
  GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  filter: string,
  options: GroupQuotaSubscriptionAllocationRequestListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocationRequests{?api%2Dversion,%24filter}",
    {
      managementGroupId: managementGroupId,
      subscriptionId: context.subscriptionId,
      groupQuotaName: groupQuotaName,
      resourceProviderName: resourceProviderName,
      "api%2Dversion": context.apiVersion,
      "%24filter": filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_QuotaAllocationRequestStatusList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _quotaAllocationRequestStatusListDeserializer(result.body);
}

/** Get all the quotaAllocationRequests for a resourceProvider/location. The filter paramter for location is required. */
export function list(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  filter: string,
  options: GroupQuotaSubscriptionAllocationRequestListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<QuotaAllocationRequestStatus> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(context, managementGroupId, groupQuotaName, resourceProviderName, filter, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  allocationId: string,
  options: GroupQuotaSubscriptionAllocationRequestGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocationRequests/{allocationId}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      subscriptionId: context.subscriptionId,
      groupQuotaName: groupQuotaName,
      resourceProviderName: resourceProviderName,
      allocationId: allocationId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<QuotaAllocationRequestStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return quotaAllocationRequestStatusDeserializer(result.body);
}

/** Get the quota allocation request status for the subscriptionId by allocationId. */
export async function get(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  allocationId: string,
  options: GroupQuotaSubscriptionAllocationRequestGetOptionalParams = {
    requestOptions: {},
  },
): Promise<QuotaAllocationRequestStatus> {
  const result = await _getSend(
    context,
    managementGroupId,
    groupQuotaName,
    resourceProviderName,
    allocationId,
    options,
  );
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  allocateQuotaRequest: SubscriptionQuotaAllocationsList,
  options: GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocations/{location}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      subscriptionId: context.subscriptionId,
      groupQuotaName: groupQuotaName,
      resourceProviderName: resourceProviderName,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: subscriptionQuotaAllocationsListSerializer(allocateQuotaRequest),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionQuotaAllocationsList> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return subscriptionQuotaAllocationsListDeserializer(result.body);
}

/** Request to assign quota from group quota to a specific Subscription. The assign GroupQuota to subscriptions or reduce the quota allocated to subscription to give back the unused quota ( quota >= usages) to the groupQuota. So, this API can be used to assign Quota to subscriptions and assign back unused quota to group quota, which can be assigned to another subscriptions in the GroupQuota. User can collect unused quotas from multiple subscriptions within the groupQuota and assign the groupQuota to the subscription, where it's needed. */
export function update(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  allocateQuotaRequest: SubscriptionQuotaAllocationsList,
  options: GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SubscriptionQuotaAllocationsList>, SubscriptionQuotaAllocationsList> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        managementGroupId,
        groupQuotaName,
        resourceProviderName,
        location,
        allocateQuotaRequest,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<SubscriptionQuotaAllocationsList>,
    SubscriptionQuotaAllocationsList
  >;
}
