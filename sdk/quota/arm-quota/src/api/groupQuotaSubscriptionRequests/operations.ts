// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import type {
  GroupQuotaSubscriptionRequestStatus,
  _GroupQuotaSubscriptionRequestStatusList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  groupQuotaSubscriptionRequestStatusDeserializer,
  _groupQuotaSubscriptionRequestStatusListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GroupQuotaSubscriptionRequestsListOptionalParams,
  GroupQuotaSubscriptionRequestsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  options: GroupQuotaSubscriptionRequestsListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptionRequests{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      groupQuotaName: groupQuotaName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_GroupQuotaSubscriptionRequestStatusList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _groupQuotaSubscriptionRequestStatusListDeserializer(result.body);
}

/** List API to check the status of a subscriptionId requests by requestId. Request history is maintained for 1 year. */
export function list(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  options: GroupQuotaSubscriptionRequestsListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<GroupQuotaSubscriptionRequestStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, managementGroupId, groupQuotaName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  requestId: string,
  options: GroupQuotaSubscriptionRequestsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptionRequests/{requestId}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      groupQuotaName: groupQuotaName,
      requestId: requestId,
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
): Promise<GroupQuotaSubscriptionRequestStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return groupQuotaSubscriptionRequestStatusDeserializer(result.body);
}

/** Get API to check the status of a subscriptionIds request by requestId.  Use the polling API - OperationsStatus URI specified in Azure-AsyncOperation header field, with retry-after duration in seconds to check the intermediate status. This API provides the finals status with the request details and status. */
export async function get(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  requestId: string,
  options: GroupQuotaSubscriptionRequestsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<GroupQuotaSubscriptionRequestStatus> {
  const result = await _getSend(context, managementGroupId, groupQuotaName, requestId, options);
  return _getDeserialize(result);
}
