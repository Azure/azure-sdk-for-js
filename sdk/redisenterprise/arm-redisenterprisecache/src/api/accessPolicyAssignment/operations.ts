// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext as Client } from "../index.js";
import type { AccessPolicyAssignment, _AccessPolicyAssignmentList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  accessPolicyAssignmentSerializer,
  accessPolicyAssignmentDeserializer,
  _accessPolicyAssignmentListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccessPolicyAssignmentListOptionalParams,
  AccessPolicyAssignmentDeleteOptionalParams,
  AccessPolicyAssignmentCreateUpdateOptionalParams,
  AccessPolicyAssignmentGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: AccessPolicyAssignmentListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/accessPolicyAssignments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AccessPolicyAssignmentList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _accessPolicyAssignmentListDeserializer(result.body);
}

/** Gets all access policy assignments.. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: AccessPolicyAssignmentListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccessPolicyAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, databaseName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-08-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  accessPolicyAssignmentName: string,
  options: AccessPolicyAssignmentDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/accessPolicyAssignments/{accessPolicyAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      accessPolicyAssignmentName: accessPolicyAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a single access policy assignment. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  accessPolicyAssignmentName: string,
  options: AccessPolicyAssignmentDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        accessPolicyAssignmentName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  accessPolicyAssignmentName: string,
  parameters: AccessPolicyAssignment,
  options: AccessPolicyAssignmentCreateUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/accessPolicyAssignments/{accessPolicyAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      accessPolicyAssignmentName: accessPolicyAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: accessPolicyAssignmentSerializer(parameters),
  });
}

export async function _createUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessPolicyAssignment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return accessPolicyAssignmentDeserializer(result.body);
}

/** Creates/Updates a particular access policy assignment for a database */
export function createUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  accessPolicyAssignmentName: string,
  parameters: AccessPolicyAssignment,
  options: AccessPolicyAssignmentCreateUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AccessPolicyAssignment>, AccessPolicyAssignment> {
  return getLongRunningPoller(context, _createUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        accessPolicyAssignmentName,
        parameters,
        options,
      ),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<AccessPolicyAssignment>, AccessPolicyAssignment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  accessPolicyAssignmentName: string,
  options: AccessPolicyAssignmentGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/accessPolicyAssignments/{accessPolicyAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      accessPolicyAssignmentName: accessPolicyAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessPolicyAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return accessPolicyAssignmentDeserializer(result.body);
}

/** Gets information about access policy assignment for database. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  accessPolicyAssignmentName: string,
  options: AccessPolicyAssignmentGetOptionalParams = { requestOptions: {} },
): Promise<AccessPolicyAssignment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    databaseName,
    accessPolicyAssignmentName,
    options,
  );
  return _getDeserialize(result);
}
