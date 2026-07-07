// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext as Client } from "../index.js";
import type { FailoverGroupResource, _FailoverGroupListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  failoverGroupResourceSerializer,
  failoverGroupResourceDeserializer,
  _failoverGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FailoverGroupsListOptionalParams,
  FailoverGroupsDeleteOptionalParams,
  FailoverGroupsCreateOptionalParams,
  FailoverGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  sqlManagedInstanceName: string,
  options: FailoverGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}/failoverGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlManagedInstanceName: sqlManagedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<_FailoverGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _failoverGroupListResultDeserializer(result.body);
}

/** List the failover groups associated with the given sql managed instance. */
export function list(
  context: Client,
  resourceGroupName: string,
  sqlManagedInstanceName: string,
  options: FailoverGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FailoverGroupResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, sqlManagedInstanceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sqlManagedInstanceName: string,
  failoverGroupName: string,
  options: FailoverGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}/failoverGroups/{failoverGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlManagedInstanceName: sqlManagedInstanceName,
      failoverGroupName: failoverGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a failover group resource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sqlManagedInstanceName: string,
  failoverGroupName: string,
  options: FailoverGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, sqlManagedInstanceName, failoverGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sqlManagedInstanceName: string,
  failoverGroupName: string,
  failoverGroupResource: FailoverGroupResource,
  options: FailoverGroupsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}/failoverGroups/{failoverGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlManagedInstanceName: sqlManagedInstanceName,
      failoverGroupName: failoverGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: failoverGroupResourceSerializer(failoverGroupResource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<FailoverGroupResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return failoverGroupResourceDeserializer(result.body);
}

/** Creates or replaces a failover group resource. */
export function create(
  context: Client,
  resourceGroupName: string,
  sqlManagedInstanceName: string,
  failoverGroupName: string,
  failoverGroupResource: FailoverGroupResource,
  options: FailoverGroupsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FailoverGroupResource>, FailoverGroupResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        sqlManagedInstanceName,
        failoverGroupName,
        failoverGroupResource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<FailoverGroupResource>, FailoverGroupResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sqlManagedInstanceName: string,
  failoverGroupName: string,
  options: FailoverGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}/failoverGroups/{failoverGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlManagedInstanceName: sqlManagedInstanceName,
      failoverGroupName: failoverGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<FailoverGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return failoverGroupResourceDeserializer(result.body);
}

/** Retrieves a failover group resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  sqlManagedInstanceName: string,
  failoverGroupName: string,
  options: FailoverGroupsGetOptionalParams = { requestOptions: {} },
): Promise<FailoverGroupResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    sqlManagedInstanceName,
    failoverGroupName,
    options,
  );
  return _getDeserialize(result);
}
