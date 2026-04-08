// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  InstancePoolOperation,
  _InstancePoolOperationListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  instancePoolOperationDeserializer,
  _instancePoolOperationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InstancePoolOperationsListByInstancePoolOptionalParams,
  InstancePoolOperationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByInstancePoolSend(
  context: Client,
  resourceGroupName: string,
  instancePoolName: string,
  options: InstancePoolOperationsListByInstancePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}/operations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instancePoolName: instancePoolName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByInstancePoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_InstancePoolOperationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _instancePoolOperationListResultDeserializer(result.body);
}

/** Gets a list of operations performed on the instance pool. */
export function listByInstancePool(
  context: Client,
  resourceGroupName: string,
  instancePoolName: string,
  options: InstancePoolOperationsListByInstancePoolOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InstancePoolOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByInstancePoolSend(context, resourceGroupName, instancePoolName, options),
    _listByInstancePoolDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  instancePoolName: string,
  operationId: string,
  options: InstancePoolOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}/operations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instancePoolName: instancePoolName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<InstancePoolOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return instancePoolOperationDeserializer(result.body);
}

/** Gets a management operation on a instance pool. */
export async function get(
  context: Client,
  resourceGroupName: string,
  instancePoolName: string,
  operationId: string,
  options: InstancePoolOperationsGetOptionalParams = { requestOptions: {} },
): Promise<InstancePoolOperation> {
  const result = await _getSend(context, resourceGroupName, instancePoolName, operationId, options);
  return _getDeserialize(result);
}
