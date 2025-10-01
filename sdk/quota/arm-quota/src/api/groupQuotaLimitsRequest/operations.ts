// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import type {
  _SubmittedResourceRequestStatusList,
  SubmittedResourceRequestStatus,
  GroupQuotaLimitList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _submittedResourceRequestStatusListDeserializer,
  submittedResourceRequestStatusDeserializer,
  groupQuotaLimitListSerializer,
  groupQuotaLimitListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GroupQuotaLimitsRequestGetOptionalParams,
  GroupQuotaLimitsRequestUpdateOptionalParams,
  GroupQuotaLimitsRequestListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  requestId: string,
  options: GroupQuotaLimitsRequestGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/groupQuotaRequests/{requestId}{?api%2Dversion}",
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
): Promise<SubmittedResourceRequestStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return submittedResourceRequestStatusDeserializer(result.body);
}

/** Get API to check the status of a GroupQuota request by requestId. */
export async function get(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  requestId: string,
  options: GroupQuotaLimitsRequestGetOptionalParams = { requestOptions: {} },
): Promise<SubmittedResourceRequestStatus> {
  const result = await _getSend(context, managementGroupId, groupQuotaName, requestId, options);
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaLimitsRequestUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/groupQuotaLimits/{location}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
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
    body: !options["groupQuotaRequest"]
      ? options["groupQuotaRequest"]
      : groupQuotaLimitListSerializer(options["groupQuotaRequest"]),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<GroupQuotaLimitList> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return groupQuotaLimitListDeserializer(result.body);
}

/**
 * Create the GroupQuota requests for a specific ResourceProvider/Location/Resource. The resourceName properties are specified in the request body. Only 1 resource quota can be requested. Please note that patch request creates a new groupQuota request.
 * Use the polling API - OperationsStatus URI specified in Azure-AsyncOperation header field, with retry-after duration in seconds to check the intermediate status. This API provides the finals status with the request details and status.
 */
export function update(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaLimitsRequestUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GroupQuotaLimitList>, GroupQuotaLimitList> {
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
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<GroupQuotaLimitList>, GroupQuotaLimitList>;
}

export function _listSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  filter: string,
  options: GroupQuotaLimitsRequestListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/groupQuotaRequests{?api%2Dversion,%24filter}",
    {
      managementGroupId: managementGroupId,
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
): Promise<_SubmittedResourceRequestStatusList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _submittedResourceRequestStatusListDeserializer(result.body);
}

/** Get API to check the status of a GroupQuota request by requestId. */
export function list(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  filter: string,
  options: GroupQuotaLimitsRequestListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SubmittedResourceRequestStatus> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(context, managementGroupId, groupQuotaName, resourceProviderName, filter, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
